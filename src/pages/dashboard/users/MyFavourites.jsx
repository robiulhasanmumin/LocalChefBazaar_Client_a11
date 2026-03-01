import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useTitle from '../../../hooks/useTitle';
import { FaTrashAlt, FaHeart, FaUtensils, FaUserTie, FaCalendarAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MyFavourites = () => {
    useTitle("My Favourites");
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: favourites = [], refetch } = useQuery({
        queryKey: ['myFavourites', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const token = await user.getIdToken();
            const res = await axiosSecure.get(`/favourites/${user.email}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return res.data;
        }
    });

    const handleDelete = async (favId) => {
        const confirm = await Swal.fire({
            title: "Remove from Favourites?",
            text: "This meal will be removed from your saved list.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444",
            cancelButtonColor: "#6B7280",
            confirmButtonText: "Yes, remove it!",
            background: '#1d232a', // Dark theme support
            color: '#fff'
        });

        if (confirm.isConfirmed) {
            try {
                const token = await user.getIdToken();
                await axiosSecure.delete(`/favourites/${favId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                Swal.fire({
                    title: "Removed!",
                    text: "Item has been deleted.",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                });
                refetch();
            } catch (err) {
                Swal.fire("Error", "Could not remove item", "error");
            }
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-10 min-h-screen">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <div className="flex items-center gap-4">
                    <div className="bg-primary/20 p-4 rounded-2xl">
                        <FaHeart className="text-primary text-3xl animate-pulse" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tight text-base-content">
                            My <span className="text-primary">Favourites</span>
                        </h1>
                        <p className="text-sm font-bold opacity-50 uppercase tracking-widest">Your curated taste collection</p>
                    </div>
                </div>
                <div className="badge badge-primary badge-lg font-black px-6 py-4 shadow-lg shadow-primary/20">
                    {favourites.length} ITEMS SAVED
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-base-200 rounded-[2rem] overflow-hidden border border-base-300 shadow-2xl">
                {favourites.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="table w-full table-zebra">
                            {/* head */}
                            <thead className="bg-base-300">
                                <tr className="text-primary uppercase text-[11px] font-black tracking-[0.2em] border-none">
                                    <th className="py-5 pl-8 text-center">#</th>
                                    <th>Meal Info</th>
                                    <th>Chef Details</th>
                                    <th>Price</th>
                                    <th>Saved Date</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-base-content/80 font-medium">
                                {favourites.map((favourite, i) => (
                                    <motion.tr
                                        key={favourite._id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="border-base-300 hover:bg-primary/5 transition-colors group"
                                    >
                                        <th className="text-center font-black opacity-30 pl-8">{i + 1}</th>
                                        <td>
                                            <div className="flex items-center gap-4">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-14 h-14 bg-base-300">
                                                        {favourite.mealImage ? (
                                                            <img src={favourite.mealImage} alt={favourite.mealName} />
                                                        ) : (
                                                            <div className="flex items-center justify-center h-full"><FaUtensils className="opacity-20" /></div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-black text-lg text-base-content group-hover:text-primary transition-colors">
                                                        {favourite.mealName}
                                                    </div>
                                                    <div className="text-[10px] uppercase opacity-40 font-bold tracking-tighter">ID: {favourite.mealId || 'N/A'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <FaUserTie className="text-primary/50" />
                                                <span>{favourite.chefName}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="font-black text-primary">৳{favourite.price}</span>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-2 text-xs opacity-60">
                                                <FaCalendarAlt />
                                                {new Date(favourite.addedTime).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <button
                                                onClick={() => handleDelete(favourite._id)}
                                                className="btn btn-ghost btn-circle text-error hover:bg-error/10"
                                                title="Remove from list"
                                            >
                                                <FaTrashAlt size={18} />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
                        <div className="bg-base-300 p-10 rounded-full mb-6 opacity-20">
                            <FaHeart size={100} />
                        </div>
                        <h2 className="text-3xl font-black text-base-content/30 uppercase italic">
                            Your Heart is Empty...
                        </h2>
                        <p className="text-base-content/40 mt-2 font-bold uppercase tracking-widest text-xs">
                            Start adding your favourite meals today!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyFavourites;