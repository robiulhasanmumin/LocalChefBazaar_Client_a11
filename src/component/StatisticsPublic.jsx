import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios'; 
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
import useAxiosPublic from '../hooks/useAxiosPublic';

// old
const Statistics = () => {
const axiosPublic = useAxiosPublic();  

    const { data: stats } = useQuery({
        queryKey: ['public-stats'],
        queryFn: async () => {
             const res = await axiosPublic.get('/public-stats');
            return res.data;
        },
        initialData: { totalUsers: 0, totalMeals: 0, ordersDelivered: 0, happyClients: 0 },
        retry: false
    });
     return (
        <section className="py-20 bg-base-100 text-center">
                          {/* --- Professional Heading --- */}
                <div className="text-center mb-16">
                    <p className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-3">Our Track Record</p>
                    <h2 className="text-4xl lg:text-5xl font-black text-base-content">
                        Milestones We've <span className="text-primary">Achieved</span>
                    </h2>
                    <div className="flex justify-center mt-4">
                        <span className="w-16 h-1 bg-primary rounded-full inline-block"></span>
                        <span className="w-4 h-1 bg-primary/30 rounded-full inline-block mx-1"></span>
                        <span className="w-2 h-1 bg-primary/20 rounded-full inline-block"></span>
                    </div>
                </div>

            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    <StatCard label="Total Users" count={stats?.totalUsers} />
                    <StatCard label="Total Meals" count={stats?.totalMeals} />
                    <StatCard label="Delivered" count={stats?.ordersDelivered} />
                    <StatCard label="Happy Clients" count={stats?.happyClients} />
                </div>
            </div>
        </section>
    );
};

 const StatCard = ({ label, count }) => (
    <div className="p-6 bg-base-200 rounded-2xl">
        <h3 className="text-3xl font-bold">
            <CountUp end={count || 0} />+
        </h3>
        <p className="text-sm opacity-70">{label}</p>
    </div>
);

export default Statistics;