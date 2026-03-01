import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import useTitle from '../../../hooks/useTitle';
import { FaEdit, FaTrashAlt, FaStar, FaCommentDots, FaUtensils, FaCalendarAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const MyReviews = () => {
    useTitle("My Reviews");
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [editingReview, setEditingReview] = useState(null);

    const { register, handleSubmit, reset } = useForm();

    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['myReviews', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const token = await user.getIdToken();
            const res = await axiosSecure.get(`/reviews/${user.email}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return res.data;
        }
    });

    const handleDelete = async (reviewId) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444",
            cancelButtonColor: "#6B7280",
            confirmButtonText: "Yes, delete it!"
        });

        if (confirm.isConfirmed) {
            try {
                const token = await user.getIdToken();
                await axiosSecure.delete(`/reviews/${reviewId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                Swal.fire("Deleted!", "Review removed successfully.", "success");
                refetch();
            } catch (err) {
                Swal.fire("Error", "Failed to delete review", "error");
            }
        }
    };

    const openEditModal = (review) => {
        setEditingReview(review);
        reset({
            rating: review.rating,
            comment: review.comment,
        });
    };

    const onSubmit = async (data) => {
        try {
            const token = await user.getIdToken();
            await axiosSecure.put(`/reviews/${editingReview._id}`, data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            Swal.fire("Success!", "Review updated smoothly.", "success");
            setEditingReview(null);
            refetch();
        } catch (err) {
            Swal.fire("Error", "Update failed", "error");
        }
    };

     const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <FaStar key={i} className={i < rating ? "text-yellow-400" : "text-gray-600"} />
        ));
    };

    return (
        <div className="max-w-7xl mx-auto p-6 md:p-10">
            {/* Header Section */}
            <div className="mb-10">
                <h1 className="text-4xl font-black uppercase tracking-tight text-primary">
                    My <span className="text-base-content">Reviews</span>
                </h1>
                <div className="flex mt-2">
                    <span className="badge badge-primary font-bold px-4 py-3">{reviews.length} Total Feedback</span>
                </div>
            </div>

            {reviews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={review._id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-base-200 rounded-3xl p-6 shadow-xl border border-base-300 hover:border-primary/50 transition-all flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="bg-primary/10 p-3 rounded-2xl">
                                        <FaUtensils className="text-primary text-xl" />
                                    </div>
                                    <div className="flex gap-1 text-lg">
                                        {renderStars(review.rating)}
                                    </div>
                                </div>

                                <h3 className="text-xl font-black mb-2 truncate">{review.foodName}</h3>
                                
                                <div className="bg-base-300/50 p-4 rounded-2xl italic text-base-content/80 relative mb-4">
                                    <FaCommentDots className="absolute -top-2 -left-2 text-primary opacity-30 text-2xl" />
                                    <p className="line-clamp-3">"{review.comment}"</p>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-base-content/5 flex justify-between items-center">
                                <div className="flex items-center gap-2 text-xs font-bold opacity-50 uppercase">
                                    <FaCalendarAlt />
                                    {new Date(review.date).toLocaleDateString()}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => openEditModal(review)}
                                        className="btn btn-square btn-ghost btn-sm text-primary hover:bg-primary/10"
                                    >
                                        <FaEdit size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(review._id)}
                                        className="btn btn-square btn-ghost btn-sm text-error hover:bg-error/10"
                                    >
                                        <FaTrashAlt size={16} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 opacity-30 flex flex-col items-center">
                    <FaCommentDots size={80} className="mb-4" />
                    <h2 className="text-3xl font-black uppercase">No Reviews Yet</h2>
                </div>
            )}

            {/* --- Professional Modal Interface --- */}
            <AnimatePresence>
                {editingReview && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-[100] p-4"
                    >
                        <motion.div
                            initial={{ y: 50, scale: 0.95 }}
                            animate={{ y: 0, scale: 1 }}
                            className="bg-base-200 p-8 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-base-300"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-primary p-3 rounded-2xl text-black">
                                    <FaEdit size={24} />
                                </div>
                                <h2 className="text-2xl font-black uppercase tracking-tighter">Edit Review</h2>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div className="form-control">
                                    <label className="label uppercase text-[10px] font-bold tracking-widest opacity-50">Rating Score (1-5)</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="5"
                                        {...register("rating", { required: true })}
                                        className="input input-bordered w-full rounded-2xl bg-base-300 font-bold focus:ring-primary border-none shadow-inner"
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label uppercase text-[10px] font-bold tracking-widest opacity-50">Your Thoughts</label>
                                    <textarea
                                        {...register("comment", { required: true })}
                                        className="textarea textarea-bordered h-32 w-full rounded-2xl bg-base-300 font-medium focus:ring-primary border-none shadow-inner"
                                        placeholder="Tell us what you liked..."
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        className="btn flex-1 rounded-2xl font-black border-none bg-base-300"
                                        onClick={() => setEditingReview(null)}
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary flex-1 rounded-2xl font-black shadow-lg shadow-primary/20">
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MyReviews;