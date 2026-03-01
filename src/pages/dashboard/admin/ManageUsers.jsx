import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useTitle from '../../../hooks/useTitle';
import { motion } from 'framer-motion';
import { FaUserShield, FaUserTag, FaUserSlash, FaEnvelope, FaFingerprint } from 'react-icons/fa';

const ManageUsers = () => {
    useTitle("Manage Users");
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['allUsers', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const token = await user.getIdToken();
            const res = await axiosSecure.get('/users', {
                headers: { Authorization: `Bearer ${token}` }
            });
            return res.data;
        }
    });

    const handleFraud = async (id, name) => {
        const confirm = await Swal.fire({
            title: `Mark ${name} as Fraud?`,
            text: "This user will lose critical access rights immediately!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444",
            cancelButtonColor: "#6B7280",
            confirmButtonText: "Yes, Mark as Fraud",
            background: '#1d232a',
            color: '#fff'
        });

        if (confirm.isConfirmed) {
            try {
                const token = await user.getIdToken();
                await axiosSecure.patch(`/users/fraud/${id}`, {}, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                Swal.fire({
                    title: "Status Updated",
                    text: "User has been marked as fraud.",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                });
                refetch();
            } catch (error) {
                Swal.fire("Error", "Action could not be completed", "error");
            }
        }
    };

    return (
        <div className='max-w-7xl mx-auto p-4 md:p-8 min-h-screen'>
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <div className="flex items-center gap-4 text-center md:text-left">
                    <div className="bg-primary/20 p-4 rounded-3xl">
                        <FaUserShield className="text-primary text-3xl" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tight text-base-content">
                            User <span className="text-primary">Directory</span>
                        </h1>
                        <p className="text-xs font-bold opacity-40 uppercase tracking-[0.4em]">Global Access Control</p>
                    </div>
                </div>
                <div className="stats shadow bg-base-200 border border-base-300 rounded-2xl">
                    <div className="stat px-8">
                        <div className="stat-title font-bold text-[10px] uppercase">Registered Users</div>
                        <div className="stat-value text-primary text-3xl">{users.length}</div>
                    </div>
                </div>
            </div>

            {/* User Table */}
            <div className="bg-base-200 rounded-[2.5rem] overflow-hidden border border-base-300 shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-base-300">
                            <tr className="text-primary uppercase text-[11px] font-black tracking-widest border-none">
                                <th className="py-6 pl-8">No.</th>
                                <th>Identity</th>
                                <th>Access Role</th>
                                <th>Status</th>
                                <th className="text-right pr-12">Security Action</th>
                            </tr>
                        </thead>
                        <tbody className="font-medium text-base-content/80">
                            {isLoading ? (
                                <tr><td colSpan="5" className="text-center py-10"><span className="loading loading-dots loading-lg text-primary"></span></td></tr>
                            ) : users.map((u, i) => (
                                <motion.tr
                                    key={u._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.03 }}
                                    className="border-base-300 hover:bg-base-100 transition-colors group"
                                >
                                    <th className="opacity-30 pl-8 font-black">{i + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-4">
                                            <div className="bg-base-300 p-3 rounded-xl group-hover:bg-primary/10 transition-colors">
                                                <FaFingerprint className="text-primary opacity-40 group-hover:opacity-100" />
                                            </div>
                                            <div>
                                                <div className="font-black text-base">{u.displayName}</div>
                                                <div className="flex items-center gap-1 text-[11px] opacity-50 lowercase font-bold">
                                                    <FaEnvelope className="text-[9px]" /> {u.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`badge badge-outline border-primary/20 text-[10px] font-black uppercase px-3 py-3 gap-2
                                            ${u.role === 'admin' ? 'bg-primary/10 text-primary border-primary' : 'text-base-content/60'}
                                        `}>
                                            <FaUserTag size={10} /> {u.role}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest
                                            ${u.status === "fraud" ? "text-error" : "text-success"}
                                        `}>
                                            <span className={`h-2 w-2 rounded-full animate-pulse ${u.status === "fraud" ? "bg-error" : "bg-success"}`}></span>
                                            {u.status || "active"}
                                        </div>
                                    </td>
                                    <td className="text-right pr-8">
                                        {u.role !== 'admin' && u.status !== 'fraud' ? (
                                            <button
                                                onClick={() => handleFraud(u._id, u.displayName)}
                                                className="btn btn-ghost btn-sm text-error hover:bg-error/10 rounded-xl font-bold border border-error/20"
                                            >
                                                <FaUserSlash className="mr-1" /> Mark Fraud
                                            </button>
                                        ) : (
                                            <span className="text-[10px] font-black uppercase opacity-20 tracking-tighter">No Action Required</span>
                                        )}
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;