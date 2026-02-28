import React from 'react';
import { useQuery } from '@tanstack/react-query';
import CountUp from 'react-countup';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { motion } from 'framer-motion';

const Statistics = () => {
    const axiosPublic = useAxiosPublic();

    const { data: stats } = useQuery({
        queryKey: ['public-stats'],
        queryFn: async () => {
            try {
                const res = await axiosPublic.get('/public-stats');
                return res.data;
            } catch (err) {
                return { totalUsers: 0, totalMeals: 0, ordersDelivered: 0, happyClients: 0 };
            }
        },
        initialData: { totalUsers: 0, totalMeals: 0, ordersDelivered: 0, happyClients: 0 },
        retry: false
    });

    const statItems = [
        { label: "Total Users", count: stats?.totalUsers },
        { label: "Total Meals", count: stats?.totalMeals },
        { label: "Delivered", count: stats?.ordersDelivered },
        { label: "Happy Clients", count: stats?.happyClients },
    ];

    return (
        <section className="py-24 bg-base-100 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                
 <div className="text-center mb-16">
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4"                    >
                        Our Track Record
                    </motion.p>
                    <motion.h2 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl lg:text-5xl font-black text-base-content"
                    >
                        Milestones We've <span className="text-primary">Achieved</span>
                    </motion.h2>
                    <div className="flex justify-center mt-4">
                        <span className="w-16 h-1 bg-primary rounded-full inline-block"></span>
                        <span className="w-4 h-1 bg-primary/30 rounded-full inline-block mx-1"></span>
                        <span className="w-2 h-1 bg-primary/20 rounded-full inline-block"></span>
                    </div>
                </div>


                {/* --- Statistics Grid --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {statItems.map((item, idx) => (
                        <motion.div 
                            key={idx} 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group relative p-10 bg-base-200 rounded-[2.5rem] overflow-hidden shadow-xl border border-base-content/5 transition-all duration-500 hover:shadow-primary/5"
                        >
                            {/* Hover Decorative Line */}
                            <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-primary group-hover:w-full transition-all duration-500 rounded-full"></div>

                            <h3 className="text-5xl font-black text-base-content mb-3 transition-colors group-hover:text-primary">
                                <CountUp 
                                    start={0} 
                                    end={item.count || 0} 
                                    duration={3} 
                                    enableScrollSpy={true} 
                                    scrollSpyOnce={true}
                                />
                                <span className="text-primary font-light"> +</span>
                            </h3>
                            
                            <p className="text-sm font-bold opacity-40 uppercase tracking-[0.2em] group-hover:opacity-80 transition-opacity">
                                {item.label}
                            </p>

                             <div className="absolute -right-4 -bottom-4 text-primary/5 text-8xl font-black opacity-0 group-hover:opacity-100 transition-opacity duration-500">
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