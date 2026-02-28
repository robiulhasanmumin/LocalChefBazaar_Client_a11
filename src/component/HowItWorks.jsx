import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaUtensils, FaTruck } from 'react-icons/fa';

const steps = [
    {
        id: 1,
        title: "Find Your Meal",
        description: "Browse our diverse menu of fresh, chef-prepared meals tailored to your taste.",
        icon: <FaSearch className="text-3xl" />,
        color: "bg-orange-500/10 text-orange-500"
    },
    {
        id: 2,
        title: "Place Your Order",
        description: "Select your favorite dishes and complete your purchase with our secure checkout.",
        icon: <FaUtensils className="text-3xl" />,
        color: "bg-primary/10 text-primary"
    },
    {
        id: 3,
        title: "Fast Delivery",
        description: "Relax while we deliver your hot and delicious meals right to your doorstep.",
        icon: <FaTruck className="text-3xl" />,
        color: "bg-green-500/10 text-green-500"
    }
];

const HowItWorks = () => {
    return (
        <section className="py-24 bg-base-100 transition-colors duration-300 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                
                {/* --- Header: Exactly matching DailyMeals & Statistics --- */}
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h4 className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4">Simple Process</h4>
                        <h2 className="text-4xl md:text-6xl font-black text-base-content leading-tight">
                            How It <span className="text-primary decoration-1 underline-offset-8">Works</span>
                        </h2>
                        <p className="text-base-content/60 mt-6 text-lg">
                            Getting your favorite meal is as easy as 1-2-3. Follow these simple steps to satisfy your cravings.
                        </p>
                    </motion.div>
                    
                    <div className="flex justify-center mt-8">
                        <span className="w-16 h-1.5 bg-primary rounded-full inline-block"></span>
                        <span className="w-4 h-1.5 bg-primary/30 rounded-full inline-block mx-1"></span>
                        <span className="w-2 h-1.5 bg-primary/20 rounded-full inline-block"></span>
                    </div>
                </div>

                {/* --- Steps Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
                    {/* Connecting Line (Desktop Only) */}
                    <div className="hidden md:block absolute top-1/3 left-0 w-full h-0.5 border-t-2 border-dashed border-base-content/10 -z-0"></div>

                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            whileHover={{ y: -10 }}
                            className="relative z-10 flex flex-col items-center text-center group"
                        >
                            {/* Icon Container */}
                            <div className={`w-24 h-24 ${step.color} rounded-[2rem] flex items-center justify-center mb-8 shadow-xl transition-transform duration-500 group-hover:rotate-[10deg] border border-white/10 backdrop-blur-sm`}>
                                {step.icon}
                                
                                {/* Step Number Badge */}
                                <div className="absolute -top-3 -right-3 w-10 h-10 bg-base-content text-base-100 rounded-full flex items-center justify-center font-black text-sm border-4 border-base-100 shadow-lg">
                                    0{step.id}
                                </div>
                            </div>

                            {/* Content Card */}
                            <div className="bg-base-200/50 p-8 rounded-[2.5rem] border border-base-content/5 transition-all duration-500 group-hover:bg-base-200 group-hover:shadow-2xl group-hover:shadow-primary/5">
                                <h3 className="text-2xl font-black text-base-content mb-4 group-hover:text-primary transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-base-content/60 text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;