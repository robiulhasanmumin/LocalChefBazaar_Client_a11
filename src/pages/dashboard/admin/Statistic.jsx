import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useTitle from '../../../hooks/useTitle';
import { motion } from 'framer-motion';
import { FaUsers, FaWallet, FaHourglassHalf, FaTruckLoading, FaChartLine } from 'react-icons/fa';

const Statistic = () => {
    useTitle("Statistics");
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['Stats'],
        enabled: !!user?.email,
        queryFn: async () => {
            const token = await user.getIdToken();
            const res = await axiosSecure.get('/admin/stats', {
                headers: { Authorization: `Bearer ${token}` }
            });
            return res.data;
        }
    });

    const paymentData = [
        { name: 'Revenue', value: stats.totalPayments || 0 }
    ];

    const ordersData = [
        { name: 'Pending', value: stats.ordersPending || 0 },
        { name: 'Delivered', value: stats.ordersDelivered || 0 }
    ];

    const COLORS = ['#FA812F', '#00C49F']; // Theme matching colors

    if (isLoading) return <div className="h-screen flex justify-center items-center"><span className="loading loading-bars loading-lg text-primary"></span></div>;

    return (
        <div className='max-w-7xl mx-auto p-4 md:p-10'>
            {/* Header */}
            <header className="mb-12 flex items-center gap-4">
                <div className="bg-primary/20 p-4 rounded-3xl">
                    <FaChartLine className="text-primary text-3xl" />
                </div>
                <div>
                    <h1 className="text-4xl font-black uppercase tracking-tight text-base-content">
                        Business <span className="text-primary">Overview</span>
                    </h1>
                    <p className="text-xs font-bold opacity-40 uppercase tracking-[0.4em]">Real-time analytics engine</p>
                </div>
            </header>

            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {[
                    { label: 'Total Users', value: stats.totalUsers, icon: <FaUsers />, color: 'text-blue-500' },
                    { label: 'Total Revenue', value: `৳${stats.totalPayments}`, icon: <FaWallet />, color: 'text-success' },
                    { label: 'Pending Orders', value: stats.ordersPending, icon: <FaHourglassHalf />, color: 'text-warning' },
                    { label: 'Delivered', value: stats.ordersDelivered, icon: <FaTruckLoading />, color: 'text-primary' },
                ].map((item, idx) => (
                    <motion.div 
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-base-200 p-6 rounded-[2rem] border border-base-300 shadow-xl flex items-center gap-5 hover:border-primary/50 transition-all group"
                    >
                        <div className={`text-3xl ${item.color} bg-base-100 p-4 rounded-2xl shadow-inner group-hover:scale-110 transition-transform`}>
                            {item.icon}
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase opacity-40 tracking-widest">{item.label}</p>
                            <p className="text-2xl font-black text-base-content">{item.value || 0}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Charts Section */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                {/* Revenue Bar Chart */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-base-200 p-8 rounded-[2.5rem] border border-base-300 shadow-xl"
                >
                    <h3 className="text-xl font-black mb-8 uppercase tracking-tighter opacity-70">Revenue Streams</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={paymentData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{backgroundColor: '#1d232a', borderRadius: '15px', border: 'none', color: '#fff'}} />
                                <Bar dataKey="value" fill="#FA812F" radius={[10, 10, 0, 0]} barSize={60} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Order Status Pie Chart */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-base-200 p-8 rounded-[2.5rem] border border-base-300 shadow-xl"
                >
                    <h3 className="text-xl font-black mb-8 uppercase tracking-tighter opacity-70">Order Fulfillment</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={ordersData}
                                    innerRadius={80}
                                    outerRadius={110}
                                    paddingAngle={8}
                                    dataKey="value"
                                >
                                    {ordersData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{backgroundColor: '#1d232a', borderRadius: '15px', border: 'none'}} />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Statistic;