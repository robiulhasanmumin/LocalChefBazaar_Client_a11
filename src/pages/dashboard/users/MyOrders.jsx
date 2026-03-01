import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import useTitle from '../../../hooks/useTitle';
import { motion } from 'framer-motion';
import { FaUtensils, FaUserTie, FaClock, FaWallet, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';

const MyOrders = () => {
    useTitle("My Orders");
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: orders = [], refetch } = useQuery({
        queryKey: ['myOrders', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/user/${user.email}`, {
                headers: {
                    Authorization: `Bearer ${await user.getIdToken()}`
                }
            });
            return res.data;
        }
    });

    const handlePayment = async (order) => {
        const confirm = await Swal.fire({
            title: `Pay ৳${order.price * order.quantity}?`,
            text: "You will be redirected to our secure payment gateway.",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Proceed to Pay",
            confirmButtonColor: "#FA812F",
            cancelButtonColor: "#d33"
        });

        if (confirm.isConfirmed) {
            try {
                const res = await axiosSecure.post("/create-checkout-session", {
                    orderId: order._id,
                    amount: order.price * order.quantity,
                });
                window.location.href = res.data.url;
            } catch (error) {
                Swal.fire("Error", "Could not initiate payment. Try again.", "error");
            }
        }
    };

     const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'pending': return 'badge-warning';
            case 'accepted': return 'badge-info';
            case 'delivered': return 'badge-success';
            case 'cancelled': return 'badge-error';
            default: return 'badge-ghost';
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 min-h-screen">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <div>
                    <h1 className="text-4xl font-black text-base-content uppercase tracking-tight">
                        My <span className="text-primary">Orders</span>
                    </h1>
                    <p className="text-base-content/60 font-medium">Manage and track your culinary requests</p>
                </div>
                <div className="stats shadow bg-base-200">
                    <div className="stat">
                        <div className="stat-title font-bold uppercase text-[10px] tracking-widest">Total Orders</div>
                        <div className="stat-value text-primary">{orders.length}</div>
                    </div>
                </div>
            </div>

            {/* Notification Tip */}
            <div className="alert bg-primary/10 border-primary/20 mb-8 rounded-2xl">
                <FaInfoCircle className="text-primary shrink-0" />
                <span className="text-sm font-semibold">
                    Tip: You can only make <span className="underline decoration-primary">payment</span> once the chef accepts your order.
                </span>
            </div>

            {orders.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {orders.map((order, index) => (
                        <motion.div
                            key={order._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="card bg-base-200 shadow-xl border border-base-content/5 hover:border-primary/30 transition-all group"
                        >
                            <div className="card-body p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="bg-primary/20 p-3 rounded-2xl">
                                        <FaUtensils className="text-primary text-xl" />
                                    </div>
                                    <div className={`badge ${getStatusClass(order.orderStatus)} font-bold p-3 uppercase text-[10px]`}>
                                        {order.orderStatus}
                                    </div>
                                </div>

                                <h2 className="card-title text-xl font-black mb-1 truncate">{order.mealName}</h2>
                                
                                <div className="space-y-3 mt-4">
                                    <div className="flex items-center gap-3 text-sm font-semibold text-base-content/70">
                                        <FaUserTie className="text-primary/60" />
                                        <span>Chef: {order.chefName} <small className="opacity-50">({order.chefId})</small></span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm font-semibold text-base-content/70">
                                        <FaClock className="text-primary/60" />
                                        <span>{new Date(order.orderTime).toLocaleString()}</span>
                                    </div>
                                    
                                    <div className="flex justify-between items-center bg-base-300 p-3 rounded-xl mt-4">
                                        <div>
                                            <p className="text-[10px] uppercase font-bold opacity-50">Total Price</p>
                                            <p className="text-lg font-black text-primary">৳{order.price * order.quantity}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] uppercase font-bold opacity-50">Qty</p>
                                            <p className="text-lg font-black">{order.quantity}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-actions justify-between items-center mt-6">
                                    <div className="flex items-center gap-2">
                                        <span className={`text-xs font-bold uppercase tracking-widest ${order.paymentStatus === 'paid' ? 'text-success' : 'text-error'}`}>
                                            {order.paymentStatus === 'paid' ? '● Verified' : '● Unpaid'}
                                        </span>
                                    </div>

                                    {order.orderStatus === "accepted" && order.paymentStatus === "Pending" ? (
                                        <button
                                            className="btn btn-primary btn-sm rounded-lg font-bold shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform"
                                            onClick={() => handlePayment(order)}
                                        >
                                            <FaWallet className="mr-2" /> Pay Now
                                        </button>
                                    ) : order.paymentStatus === "paid" ? (
                                        <div className="flex items-center text-success gap-1 font-bold text-sm">
                                            <FaCheckCircle /> Paid
                                        </div>
                                    ) : (
                                        <span className="text-[10px] font-bold opacity-40 uppercase tracking-tighter italic">Waiting for Acceptance</span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-base-200 rounded-[3rem] border-2 border-dashed border-base-content/10">
                    <div className="opacity-20 mb-6">
                        <FaUtensils size={80} />
                    </div>
                    <h3 className="text-2xl font-black text-base-content/40">No Orders Found</h3>
                    <button onClick={() => navigate('/meals')} className="btn btn-primary btn-outline mt-6 rounded-2xl px-8">
                        Explore Our Menu
                    </button>
                </div>
            )}
        </div>
    );
};

export default MyOrders;