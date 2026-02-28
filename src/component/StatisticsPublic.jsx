import React from 'react';
import { useQuery } from '@tanstack/react-query';
import CountUp from 'react-countup';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { motion } from 'framer-motion';

const Statistics = () => {
    const axiosPublic = useAxiosPublic();

    const { data: stats, isLoading } = useQuery({
        queryKey: ['public-stats'],
        queryFn: async () => {
            const res = await axiosPublic.get('/public-stats');
            return res.data;
        },
         placeholderData: { totalUsers: 0, totalMeals: 0, ordersDelivered: 0, happyClients: 0 },
        refetchOnWindowFocus: true,  
        staleTime: 0  
    });

    const statItems = [
        { label: "Total Users", count: stats?.totalUsers || 0 },
        { label: "Total Meals", count: stats?.totalMeals || 0 },
        { label: "Delivered", count: stats?.ordersDelivered || 0 },
        { label: "Happy Clients", count: stats?.happyClients || 0 },
    ];

    return (
        <section className="py-24 bg-base-100 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                
                <div className="text-center mb-16">
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4"
                    >
                        Our Track Record
                    </motion.p>
                    <motion.h2 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl lg:text-5xl font-black text-base-content"
                    >
                        Milestones We've <span className="text-primary   decoration-1 underline-offset-8">Achieved</span>
                    </motion.h2>
                    <div className="flex justify-center mt-6">
                        <span className="w-16 h-1.5 bg-primary rounded-full"></span>
                        <span className="w-4 h-1.5 bg-primary/30 rounded-full mx-1.5"></span>
                        <span className="w-2 h-1.5 bg-primary/20 rounded-full"></span>
                    </div>
                </div>

                {/* --- Statistics Grid --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {statItems.map((item, idx) => (
                        <motion.div 
                            key={idx} 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group relative p-10 bg-base-200/50 rounded-[2.5rem] overflow-hidden border border-base-content/5 transition-all duration-500 hover:bg-base-200"
                        >
                            <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-primary group-hover:w-full transition-all duration-500 rounded-full"></div>

                            <h3 className="text-5xl font-black text-base-content mb-3 transition-colors group-hover:text-primary">
                                {/* isLoading চেক করা হয়েছে যাতে জিরো থেকে অ্যানিমেশন শুরু হয় */}
                                {!isLoading ? (
                                    <CountUp 
                                        start={0} 
                                        end={item.count} 
                                        duration={2.5} 
                                        // Scroll ছাড়া সরাসরি এনিমেশন স্টার্ট করার জন্য নিচের প্রপসগুলো ব্যবহার করুন
                                        useEasing={true}
                                    />
                                ) : (
                                    "0"
                                )}
                                <span className="text-primary font-light"> +</span>
                            </h3>
                            
                            <p className="text-xs font-black opacity-40 uppercase tracking-[0.2em] group-hover:opacity-100 transition-all">
                                {item.label}
                            </p>

                            <div className="absolute -right-4 -bottom-4 text-primary/5 text-8xl font-black opacity-0 group-hover:opacity-100 transition-opacity duration-500 select-none">
                                #
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Statistics;