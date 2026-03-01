import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useTitle from '../../../hooks/useTitle';
import { motion } from 'framer-motion';
import { FaUserShield, FaCheck, FaTimes, FaUserCircle, FaIdCard, FaSpinner } from 'react-icons/fa';

const ManageRequest = () => {
    useTitle("Manage Requests");
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: requests = [], refetch, isLoading } = useQuery({
        queryKey: ["roleRequests"],
        queryFn: async () => {
            const token = await user.getIdToken();
            const res = await axiosSecure.get("/role-requests", {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res.data;
        },
    });

    const handleAction = async (id, type) => {
        const isAccept = type === 'accept';
        const result = await Swal.fire({
            title: isAccept ? 'Approve Request?' : 'Reject Request?',
            text: isAccept ? "The user will be promoted to the requested role." : "This request will be marked as rejected.",
            icon: isAccept ? 'question' : 'warning',
            showCancelButton: true,
            confirmButtonColor: isAccept ? '#FA812F' : '#EF4444',
            cancelButtonColor: '#6B7280',
            confirmButtonText: isAccept ? 'Yes, Approve' : 'Yes, Reject',
            background: '#1d232a',
            color: '#fff'
        });

        if (result.isConfirmed) {
            try {
                const token = await user.getIdToken();
                await axiosSecure.patch(
                    `/role-requests/${type}/${id}`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                Swal.fire({
                    title: isAccept ? 'Approved!' : 'Rejected!',
                    text: `Request has been ${type}ed successfully.`,
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
                refetch();
            } catch (error) {
                Swal.fire("Error", "Action failed", "error");
            }
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 min-h-screen">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <div className="flex items-center gap-4">
                    <div className="bg-primary/20 p-4 rounded-2xl shadow-lg">
                        <FaUserShield className="text-primary text-3xl" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tight text-base-content">
                            Role <span className="text-primary">Requests</span>
                        </h1>
                        <p className="text-sm font-bold opacity-50 uppercase tracking-[0.2em]">Authority Management System</p>
                    </div>
                </div>
                <div className="badge badge-primary badge-lg font-black px-6 py-5 shadow-xl shadow-primary/20">
                    {requests.length} PENDING APPLICATIONS
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-base-200 rounded-[2.5rem] overflow-hidden border border-base-300 shadow-2xl">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <FaSpinner className="animate-spin text-primary text-4xl" />
                        <p className="font-bold opacity-40 uppercase tracking-widest">Fetching Requests...</p>
                    </div>
                ) : requests.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            {/* head */}
                            <thead className="bg-base-300">
                                <tr className="text-primary uppercase text-[11px] font-black tracking-widest border-none">
                                    <th className="py-6 pl-8">#</th>
                                    <th>Applicant Info</th>
                                    <th>Role Detail</th>
                                    <th>Current Status</th>
                                    <th className="text-center pr-8">Decision</th>
                                </tr>
                            </thead>
                            <tbody className="font-medium">
                                {requests.map((req, i) => (
                                    <motion.tr
                                        key={req._id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="border-base-300 hover:bg-base-100/50 transition-colors group"
                                    >
                                        <th className="opacity-30 pl-8">{i + 1}</th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar placeholder">
                                                    <div className="bg-base-300 text-base-content rounded-xl w-10">
                                                        <FaUserCircle size={20} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-black text-base group-hover:text-primary transition-colors">{req.userName}</div>
                                                    <div className="text-[10px] opacity-50 font-bold uppercase tracking-tighter">{req.userEmail}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <FaIdCard className="text-primary opacity-40" />
                                                <span className="badge badge-outline border-primary/30 text-[10px] font-black uppercase text-primary">
                                                    {req.requestType}
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`
                                                px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest
                                                ${req.requestStatus === "approved" ? "bg-success/10 text-success border border-success/20" : 
                                                  req.requestStatus === "rejected" ? "bg-error/10 text-error border border-error/20" : 
                                                  "bg-info/10 text-info border border-info/20 animate-pulse"}
                                            `}>
                                                {req.requestStatus}
                                            </span>
                                        </td>
                                        <td className="text-center pr-8">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() => handleAction(req._id, 'accept')}
                                                    disabled={req.requestStatus !== "pending"}
                                                    className="btn btn-square btn-sm btn-primary text-black disabled:bg-base-300 disabled:opacity-20 shadow-lg shadow-primary/20"
                                                    title="Approve"
                                                >
                                                    <FaCheck />
                                                </button>
                                                <button
                                                    onClick={() => handleAction(req._id, 'reject')}
                                                    disabled={req.requestStatus !== "pending"}
                                                    className="btn btn-square btn-sm btn-error disabled:bg-base-300 disabled:opacity-20 shadow-lg shadow-error/20"
                                                    title="Reject"
                                                >
                                                    <FaTimes />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-24 opacity-20 flex flex-col items-center">
                        <FaUserShield size={80} className="mb-4" />
                        <h2 className="text-3xl font-black uppercase italic">No Active Requests</h2>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageRequest;