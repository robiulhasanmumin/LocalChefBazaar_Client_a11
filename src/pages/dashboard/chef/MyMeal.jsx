import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useTitle from "../../../hooks/useTitle";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTrashAlt, FaUtensils, FaClock, FaMoneyBillWave, FaLeaf, FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router";

const MyMeal = () => {
    useTitle("My Meals Management");
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [selectedMeal, setSelectedMeal] = useState(null);

    const { register, handleSubmit, reset } = useForm();

    const { data: meals = [], refetch, isLoading } = useQuery({
        queryKey: ["myMeals", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/meals/chef/${user.email}`);
            return res.data;
        },
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This meal will be removed from your menu!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444",
            cancelButtonColor: "#6B7280",
            confirmButtonText: "Yes, Delete",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.delete(`/meals/${id}`);
                refetch();
                Swal.fire("Deleted!", "Meal has been removed.", "success");
            }
        });
    };

    const handleUpdate = async (data) => {
        try {
            await axiosSecure.patch(`/meals/${selectedMeal._id}`, {
                foodName: data.foodName,
                price: parseFloat(data.price),
                estimatedDeliveryTime: data.estimatedDeliveryTime,
                ingredients: typeof data.ingredients === 'string' ? data.ingredients.split(",") : data.ingredients,
            });

            Swal.fire("Updated!", "Meal details saved.", "success");
            document.getElementById("update_modal").close();
            refetch();
        } catch (err) {
            Swal.fire("Error", "Update failed", "error");
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 min-h-screen">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                <div>
                    <h1 className="text-4xl font-black text-base-content uppercase tracking-tight">
                        Menu <span className="text-primary">Management</span>
                    </h1>
                    <p className="text-base-content/60 font-medium">Manage and monitor your culinary creations</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="stats shadow bg-base-200 hidden md:flex">
                        <div className="stat">
                            <div className="stat-title text-[10px] font-bold uppercase">Total Dishes</div>
                            <div className="stat-value text-primary text-2xl">{meals.length}</div>
                        </div>
                    </div>
                    <button 
                        onClick={() => navigate('/dashboard/chef/create-meal')} 
                        className="btn btn-primary rounded-2xl font-bold shadow-lg shadow-primary/20"
                    >
                        <FaPlusCircle /> Add New Dish
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map(n => <div key={n} className="h-64 bg-base-200 animate-pulse rounded-3xl"></div>)}
                </div>
            ) : meals.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {meals.map((meal, index) => (
                        <motion.div
                            key={meal._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-base-200 rounded-[2.5rem] overflow-hidden border border-base-300 shadow-xl group hover:border-primary/40 transition-all"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={meal.foodImage}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    alt={meal.foodName}
                                />
                                <div className="absolute top-4 right-4 badge badge-primary font-bold p-3">
                                    ৳{meal.price}
                                </div>
                            </div>

                            <div className="p-6">
                                <h2 className="text-2xl font-black mb-3 truncate">{meal.foodName}</h2>
                                
                                <div className="space-y-2 mb-6 opacity-70 text-sm font-medium">
                                    <div className="flex items-center gap-2">
                                        <FaLeaf className="text-primary text-xs" />
                                        <span className="truncate">{meal.ingredients.slice(0, 3).join(", ")}...</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaClock className="text-primary text-xs" />
                                        <span>{meal.estimatedDeliveryTime}</span>
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-auto">
                                    <button
                                        onClick={() => {
                                            setSelectedMeal(meal);
                                            reset({
                                                ...meal,
                                                ingredients: meal.ingredients.join(","),
                                            });
                                            document.getElementById("update_modal").showModal();
                                        }}
                                        className="btn btn-primary btn-sm flex-1 rounded-xl text-black font-bold"
                                    >
                                        <FaEdit /> Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(meal._id)}
                                        className="btn btn-error btn-sm flex-1 rounded-xl font-bold"
                                    >
                                        <FaTrashAlt /> Delete
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-24 bg-base-200 rounded-[3rem] border-2 border-dashed border-base-content/10">
                    <FaUtensils size={60} className="mx-auto mb-4 opacity-20" />
                    <h3 className="text-2xl font-black opacity-30 uppercase tracking-tighter">Kitchen is Empty</h3>
                    <p className="text-sm opacity-40 font-bold mb-6">You haven't added any meals yet.</p>
                </div>
            )}

            {/* Professional Modal */}
            <dialog id="update_modal" className="modal backdrop-blur-sm">
                <div className="modal-box bg-base-200 rounded-[2.5rem] border border-base-300 p-8 max-w-2xl">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-primary/20 p-3 rounded-2xl text-primary">
                            <FaEdit size={24} />
                        </div>
                        <h3 className="font-black text-3xl uppercase tracking-tighter">Edit Dish</h3>
                    </div>

                    <form onSubmit={handleSubmit(handleUpdate)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control col-span-2">
                            <label className="label uppercase text-[10px] font-bold tracking-widest opacity-50">Dish Name</label>
                            <input {...register("foodName")} className="input input-bordered bg-base-300 rounded-2xl h-14 border-none shadow-inner font-bold" />
                        </div>

                        <div className="form-control">
                            <label className="label uppercase text-[10px] font-bold tracking-widest opacity-50"><FaMoneyBillWave className="mr-1"/> Price (৳)</label>
                            <input type="number" {...register("price")} className="input input-bordered bg-base-300 rounded-2xl h-14 border-none shadow-inner" />
                        </div>

                        <div className="form-control">
                            <label className="label uppercase text-[10px] font-bold tracking-widest opacity-50"><FaClock className="mr-1"/> Delivery Time</label>
                            <input {...register("estimatedDeliveryTime")} className="input input-bordered bg-base-300 rounded-2xl h-14 border-none shadow-inner" />
                        </div>

                        <div className="form-control col-span-2">
                            <label className="label uppercase text-[10px] font-bold tracking-widest opacity-50"><FaLeaf className="mr-1"/> Ingredients</label>
                            <textarea {...register("ingredients")} className="textarea textarea-bordered bg-base-300 rounded-2xl h-24 border-none shadow-inner pt-4" />
                        </div>

                        <div className="modal-action col-span-2 flex gap-3">
                            <button type="submit" className="btn btn-primary flex-1 rounded-2xl font-black shadow-lg shadow-primary/20">Save Changes</button>
                            <button 
                                type="button" 
                                onClick={() => document.getElementById("update_modal").close()} 
                                className="btn btn-ghost flex-1 rounded-2xl font-black bg-base-300"
                            >Cancel</button>
                        </div>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default MyMeal;