import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useTitle from '../../hooks/useTitle';
import { motion } from 'framer-motion';
import { FaBox, FaMapMarkerAlt, FaCalculator, FaEnvelope, FaUserTie } from 'react-icons/fa';
import { FaBowlFood } from 'react-icons/fa6';

const OrderMeal = () => {
    useTitle("Order Meal");
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { register, handleSubmit, watch } = useForm();
    const quantity = watch("quantity", 1);

    const { data: meal = {}, isLoading } = useQuery({
        queryKey: ["meal", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/meals/${id}`);
            return res.data;
        },
    });

    const totalPrice = (meal.price || 0) * (quantity || 1);

    const onSubmit = async (data) => {
        const orderInfo = {
            foodId: id,
            mealName: meal.foodName,
            price: meal.price,
            quantity: parseInt(data.quantity),
            chefName: meal.chefName,
            chefId: meal.chefId,
            userEmail: user.email,
            userAddress: data.address,
            paymentStatus: "Pending",
            orderStatus: "pending",
            orderTime: new Date(),
        };

        const result = await Swal.fire({
            title: `Confirm Order?`,
            html: `You are ordering <b>${quantity}x ${meal.foodName}</b> <br> Total Amount: <span style="color: #fbbf24; font-weight: bold;">৳${totalPrice}</span>`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#fbbf24",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm Now",
        });

        if (result.isConfirmed) {
            try {
                await axiosSecure.post("/orders", orderInfo);
                Swal.fire({
                    icon: "success",
                    title: "Order Placed!",
                    text: "Redirecting to your orders...",
                    timer: 2000,
                    showConfirmButton: false,
                });
                navigate("/dashboard/my-orders");
            } catch (error) {
                const status = error.response?.status;
                if (status === 409) {
                    Swal.fire("Wait!", "You already placed this exact order.", "warning");
                } else if (status === 403) {
                    Swal.fire("Restricted", "Your account is flagged for fraud.", "error");
                } else {
                    Swal.fire("Error", "Something went wrong. Try again.", "error");
                }
            }
        }
    };

    if (isLoading) return <div className="min-h-screen flex justify-center items-center"><span className="loading loading-dots loading-lg text-primary"></span></div>;

    return (
        <div className="min-h-screen bg-base-100 py-12 px-4 md:px-10">
            <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                className="max-w-5xl mx-auto"
            >
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black mb-4 text-base-content">Complete Your <span className="text-primary">Order</span></h1>
                    <p className="text-base-content/60 font-medium">Please review the details below before confirming your meal.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    
                    {/* Left Side: Order Form */}
                    <div className="lg:col-span-2 bg-base-200/50 p-8 rounded-[2.5rem] border border-base-content/5 shadow-xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                
                                {/* Meal Name */}
                                <div className="form-control">
                                    <label className="label font-bold text-xs uppercase tracking-widest opacity-50">Meal Name</label>
                                    <div className="relative">
                                        <FaBowlFood className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                                        <input value={meal.foodName} readOnly className="input w-full pl-12 bg-base-100 border-none font-bold text-base-content" />
                                    </div>
                                </div>

                                {/* Quantity */}
                                <div className="form-control">
                                    <label className="label font-bold text-xs uppercase tracking-widest opacity-50">Quantity</label>
                                    <div className="relative">
                                        <FaBox className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                                        <input 
                                            type="number" min={1} defaultValue={1} 
                                            {...register("quantity", { required: true })} 
                                            className="input w-full pl-12 bg-base-100 border-base-content/10 focus:border-primary font-bold transition-all text-base-content" 
                                        />
                                    </div>
                                </div>

                                {/* Chef Info */}
                                <div className="form-control">
                                    <label className="label font-bold text-xs uppercase tracking-widest opacity-50">Chef ID</label>
                                    <div className="relative">
                                        <FaUserTie className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                                        <input value={meal.chefId} readOnly className="input w-full pl-12 bg-base-100 border-none font-bold text-base-content" />
                                    </div>
                                </div>

                                {/* User Email */}
                                <div className="form-control">
                                    <label className="label font-bold text-xs uppercase tracking-widest opacity-50">Your Email</label>
                                    <div className="relative">
                                        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                                        <input value={user?.email} readOnly className="input w-full pl-12 bg-base-100 border-none font-bold text-base-content" />
                                    </div>
                                </div>
                            </div>

                            {/* Address Field */}
                            <div className="form-control">
                                <label className="label font-bold text-xs uppercase tracking-widest opacity-50">Delivery Address</label>
                                <div className="relative">
                                    <FaMapMarkerAlt className="absolute left-4 top-4 text-primary" />
                                    <textarea 
                                        required {...register("address", { required: true })} 
                                        className="textarea w-full pl-12 bg-base-100 border-base-content/10 focus:border-primary h-28 font-medium placeholder:text-base-content/20 text-base-content" 
                                        placeholder="Flat No, House Name, Street Address..."
                                    />
                                </div>
                            </div>

                            <button className="btn btn-primary btn-block rounded-2xl h-16 text-black font-black text-lg shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                                Confirm & Pay ৳{totalPrice}
                            </button>
                        </form>
                    </div>

                    {/* Right Side: Order Summary Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-primary text-black p-8 rounded-[2.5rem] shadow-2xl sticky top-10">
                            <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                                <FaCalculator /> Summary
                            </h3>
                            <div className="space-y-4 border-b border-black/10 pb-6 mb-6 font-bold">
                                <div className="flex justify-between">
                                    <span>Price</span>
                                    <span>৳{meal.price}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Qty</span>
                                    <span>x {quantity}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Delivery</span>
                                    <span className="badge badge-outline border-black/30 font-black">FREE</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mb-8">
                                <span className="text-lg font-black uppercase tracking-tighter">Total</span>
                                <span className="text-4xl font-black italic">৳{totalPrice}</span>
                            </div>
                            
                            <div className="p-4 bg-black/5 rounded-2xl text-[10px] font-black leading-relaxed opacity-60 uppercase">
                                * Your order will be processed by {meal.chefName}.
                            </div>
                        </div>
                    </div>

                </div>
            </motion.div>
        </div>
    );
};

export default OrderMeal;