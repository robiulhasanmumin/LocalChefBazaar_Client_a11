import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import useTitle from '../../../hooks/useTitle';
import { motion } from 'framer-motion';
import { FaUtensils, FaClock, FaMoneyBillWave, FaMapMarkerAlt, FaToolbox, FaIdBadge, FaEnvelope, FaImage, FaLeaf } from 'react-icons/fa';

const CreateMeal = () => {
    useTitle("Create Meal");
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(null);

    const { data: currentUser = {} } = useQuery({
        queryKey: ["currentUser", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        },
    });

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

    // ইমেজ প্রিভিউ লজিক
    const foodImageWatch = watch("foodImage");
    React.useEffect(() => {
        if (foodImageWatch && foodImageWatch.length > 0) {
            const file = foodImageWatch[0];
            setPreview(URL.createObjectURL(file));
        }
    }, [foodImageWatch]);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const imageFile = data.foodImage[0];
            const formData = new FormData();
            formData.append("image", imageFile);

            const imgRes = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img_host_key}`,
                formData
            );

            const imageUrl = imgRes.data.data.url;

            const mealInfo = {
                foodName: data.foodName,
                chefName: user?.displayName,
                foodImage: imageUrl,
                price: parseFloat(data.price),
                rating: 0, // ডিফল্ট রেটিং ০ থেকে শুরু হবে
                ingredients: data.ingredients.split(",").map(i => i.trim()),
                estimatedDeliveryTime: data.estimatedDeliveryTime,
                deliveryArea: data.deliveryArea,
                chefExperience: data.chefExperience,
                chefId: currentUser?.chefId,
                userEmail: user.email,
                createdAt: new Date()
            };

            await axiosSecure.post("/meals", mealInfo);

            Swal.fire({
                icon: "success",
                title: "Meal Published!",
                text: "Your delicious meal is now live for customers.",
                showConfirmButton: false,
                timer: 2000
            });
            reset();
            setPreview(null);
        } catch (error) {
            Swal.fire("Error", "Failed to add meal. Please try again.", "error");
        } finally {
            setLoading(false);
        }
    };

    if (currentUser.role !== "chef" || currentUser.status === "fraud") {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] p-10">
                <div className="bg-error/10 p-10 rounded-[3rem] text-center border-2 border-dashed border-error/20">
                    <h2 className="text-error text-5xl font-black mb-4 uppercase italic">Access Denied</h2>
                    <p className="text-xl font-bold opacity-60">You do not have permission to create meals.</p>
                </div>
            </div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className='max-w-6xl mx-auto p-4 md:p-8'
        >
            <div className="bg-base-200 rounded-[2.5rem] p-6 md:p-12 shadow-2xl border border-base-300">
                <header className="text-center mb-12">
                    <h1 className="text-5xl font-black text-primary uppercase tracking-tighter mb-2">Create <span className="text-base-content">New Meal</span></h1>
                    <p className="text-sm font-bold opacity-40 uppercase tracking-[0.3em]">Fill in the details to showcase your dish</p>
                </header>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* Food Name */}
                        <div className='form-control'>
                            <label className='label font-bold uppercase text-xs tracking-widest opacity-60'><FaUtensils className="mr-2"/> Food Name</label>
                            <input {...register("foodName", { required: true })}
                                placeholder="E.g. Spicy Grilled Chicken" className="input input-bordered w-full bg-base-300 rounded-2xl focus:ring-2 ring-primary border-none shadow-inner h-14" />
                        </div>

                        {/* Chef Name (Read Only) */}
                        <div className='form-control'>
                            <label className='label font-bold uppercase text-xs tracking-widest opacity-60'><FaIdBadge className="mr-2"/> Chef Name</label>
                            <input value={user?.displayName} readOnly
                                className="input input-bordered w-full bg-base-100 rounded-2xl opacity-50 cursor-not-allowed h-14" />
                        </div>

                        {/* Ingredients */}
                        <div className='form-control md:col-span-2'>
                            <label className='label font-bold uppercase text-xs tracking-widest opacity-60'><FaLeaf className="mr-2"/> Ingredients (Comma Separated)</label>
                            <textarea {...register("ingredients", { required: true })}
                                placeholder="Chicken, Garlic, Olive Oil, Pepper..." className="textarea textarea-bordered w-full bg-base-300 rounded-2xl focus:ring-2 ring-primary border-none shadow-inner h-24 pt-4" />
                        </div>

                        {/* Price & Delivery Time */}
                        <div className='form-control'>
                            <label className='label font-bold uppercase text-xs tracking-widest opacity-60'><FaMoneyBillWave className="mr-2"/> Price (৳)</label>
                            <input type="number" {...register("price", { required: true })}
                                placeholder="0.00" className="input input-bordered w-full bg-base-300 rounded-2xl h-14 border-none shadow-inner" />
                        </div>

                        <div className='form-control'>
                            <label className='label font-bold uppercase text-xs tracking-widest opacity-60'><FaClock className="mr-2"/> Delivery Time</label>
                            <input {...register("estimatedDeliveryTime", { required: true })}
                                placeholder="Ex: 30-40 mins" className="input input-bordered w-full bg-base-300 rounded-2xl h-14 border-none shadow-inner" />
                        </div>

                        {/* Area & Experience */}
                        <div className='form-control'>
                            <label className='label font-bold uppercase text-xs tracking-widest opacity-60'><FaMapMarkerAlt className="mr-2"/> Delivery Area</label>
                            <input {...register("deliveryArea", { required: true })}
                                placeholder="E.g. Mirpur, Dhaka" className="input input-bordered w-full bg-base-300 rounded-2xl h-14 border-none shadow-inner" />
                        </div>

                        <div className='form-control'>
                            <label className='label font-bold uppercase text-xs tracking-widest opacity-60'><FaToolbox className="mr-2"/> Your Experience</label>
                            <input {...register("chefExperience", { required: true })}
                                placeholder="Ex: 5 Years" className="input input-bordered w-full bg-base-300 rounded-2xl h-14 border-none shadow-inner" />
                        </div>

                        {/* Image Upload & Preview */}
                        <div className='form-control md:col-span-2'>
                            <label className='label font-bold uppercase text-xs tracking-widest opacity-60'><FaImage className="mr-2"/> Food Image</label>
                            <div className="flex flex-col md:flex-row gap-6 items-center bg-base-300 p-6 rounded-[2rem] border-2 border-dashed border-primary/20">
                                <input type="file" {...register("foodImage", { required: true })}
                                    className="file-input file-input-primary w-full max-w-xs rounded-xl" />
                                {preview && (
                                    <div className="relative">
                                        <img src={preview} alt="Preview" className="w-32 h-24 object-cover rounded-xl shadow-lg border-2 border-primary" />
                                        <span className="absolute -top-2 -right-2 badge badge-primary badge-sm">Preview</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* ID & Email (Hidden or Readonly) */}
                        <div className='form-control opacity-40'>
                            <label className='label font-bold uppercase text-[10px]'>Internal ID</label>
                            <input value={currentUser?.chefId} readOnly className="input input-xs bg-transparent border-none" />
                        </div>
                        <div className='form-control opacity-40'>
                            <label className='label font-bold uppercase text-[10px]'>Contact Email</label>
                            <input value={user?.email} readOnly className="input input-xs bg-transparent border-none" />
                        </div>
                    </div>

                    <div className="pt-6">
                        <button 
                            disabled={loading} 
                            className="btn btn-primary btn-block h-16 rounded-2xl text-xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-95 disabled:bg-base-300"
                        >
                            {loading ? (
                                <><span className="loading loading-spinner"></span> Publishing...</>
                            ) : (
                                "List This Meal"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default CreateMeal;