import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useTitle from '../../../hooks/useTitle';
import { motion } from 'framer-motion';
import { FaBoxOpen, FaCheckCircle, FaTimesCircle, FaTruck, FaMapMarkerAlt, FaEnvelope, FaClock, FaExclamationCircle } from 'react-icons/fa';

const OrderRequest = () => {
    useTitle("Order Requests");
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: currentUser = {} } = useQuery({
        queryKey: ["currentUser", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        },
    });

    const { data: orders = [], refetch, isLoading } = useQuery({
        queryKey: ["chefOrders", currentUser?.chefId],
        enabled: !!currentUser?.chefId,
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/chef/${currentUser.chefId}`);
            return res.data;
        },
    });

    const handleAction = async (id, action, title, icon) => {
        const result = await Swal.fire({
            title: `Confirm ${title}?`,
            text: `Are you sure you want to ${title.toLowerCase()} this order?`,
            icon: icon,
            showCancelButton: true,
            confirmButtonColor: '#FA812F',
            cancelButtonColor: '#d33',
        });

        if (result.isConfirmed) {
            try {
                await axiosSecure.patch(`/orders/${action}/${id}`);
                Swal.fire({
                    title: `${title}!`,
                    text: `Order has been ${title.toLowerCase()} successfully.`,
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                });
                refetch();
            } catch (err) {
                Swal.fire("Error", "Something went wrong", "error");
            }
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <div className="text-center md:text-left">
                    <h1 className="text-4xl font-black text-base-content uppercase tracking-tight">
                        Order <span className="text-primary">Requests</span>
                    </h1>
                    <p className="text-sm font-bold opacity-50 uppercase tracking-widest mt-1">Manage incoming food orders</p>
                </div>
                <div className="stats shadow bg-base-200">
                    <div className="stat">
                        <div className="stat-title font-bold text-[10px] uppercase">Active Requests</div>
                        <div className="stat-value text-primary">{orders.length}</div>
                    </div>
                </div>
            </header>

            {/* Warning Message */}
            <div className="alert bg-primary/10 border-primary/20 mb-8 rounded-2xl flex items-start gap-4 p-4">
                <FaExclamationCircle className="text-primary text-xl mt-1 shrink-0" />
                <span className="text-sm font-medium">
                    <strong className="text-primary uppercase">Note:</strong> Delivery option will only be enabled after the user completes the <span className="underline underline-offset-4 decoration-primary">Payment</span> and the order is <span className="underline underline-offset-4 decoration-primary">Accepted</span>.
                </span>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-20"><span className="loading loading-spinner loading-lg text-primary"></span></div>
            ) : orders.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {orders.map((order, index) => {
                        const isPending = order.orderStatus === "pending";
                        const isAccepted = order.orderStatus === "accepted";
                        const isPaid = order.paymentStatus === "paid";

                        return (
                            <motion.div
                                key={order._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-base-200 border border-base-300 rounded-[2rem] p-6 shadow-xl hover:shadow-2xl transition-all group"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="bg-primary/20 p-3 rounded-2xl">
                                        <FaBoxOpen className="text-primary text-xl" />
                                    </div>
                                    <div className={`badge ${isPaid ? 'badge-success' : 'badge-ghost'} font-black text-[10px] p-3 uppercase`}>
                                        {isPaid ? '● Paid' : '○ Unpaid'}
                                    </div>
                                </div>

                                <h3 className="text-2xl font-black mb-1 truncate group-hover:text-primary transition-colors">{order.mealName}</h3>
                                <div className="text-primary font-black text-lg mb-4">৳{order.price} <span className="text-xs text-base-content/40 ml-1">× {order.quantity} qty</span></div>

                                <div className="space-y-3 text-sm font-semibold opacity-70">
                                    <div className="flex items-center gap-2"><FaEnvelope className="text-primary/60 text-xs" /> {order.userEmail}</div>
                                    <div className="flex items-start gap-2"><FaMapMarkerAlt className="text-primary/60 text-xs mt-1" /> {order.userAddress}</div>
                                    <div className="flex items-center gap-2"><FaClock className="text-primary/60 text-xs" /> {new Date(order.orderTime).toLocaleString()}</div>
                                </div>

                                <div className="divider opacity-10"></div>

                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-[10px] font-black uppercase opacity-40">Order Status</span>
                                    <span className="badge badge-outline border-primary text-primary font-bold uppercase text-[10px]">{order.orderStatus}</span>
                                </div>

                                {/* Actions */}
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => handleAction(order._id, 'cancel', 'Cancel', 'warning')}
                                        disabled={!isPending}
                                        className="btn btn-outline btn-error rounded-xl font-bold flex-1"
                                    >
                                        <FaTimesCircle /> Cancel
                                    </button>

                                    {isPending ? (
                                        <button
                                            onClick={() => handleAction(order._id, 'accept', 'Accept', 'question')}
                                            className="btn btn-primary text-black rounded-xl font-bold flex-1"
                                        >
                                            <FaCheckCircle /> Accept
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleAction(order._id, 'deliver', 'Deliver', 'info')}
                                            disabled={!isAccepted || !isPaid || order.orderStatus === "delivered"}
                                            className="btn btn-success text-white rounded-xl font-bold col-span-1"
                                        >
                                            <FaTruck /> Deliver
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-24 bg-base-200 rounded-[3rem] border-2 border-dashed border-base-content/10">
                    <FaBoxOpen size={60} className="mx-auto mb-4 opacity-10" />
                    <h2 className="text-2xl font-black opacity-30 uppercase italic">No Orders Found</h2>
                    <p className="text-sm opacity-40 font-bold mt-2">Wait for customers to place new requests.</p>
                </div>
            )}
        </div>
    );
};

export default OrderRequest;