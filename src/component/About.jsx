import React from 'react';
import { motion } from 'framer-motion';
import { FaUtensils, FaUsers, FaLeaf, FaTruck } from 'react-icons/fa';
import { Link } from 'react-router';

const About = () => {
    const features = [
        {
            icon: <FaUtensils className="text-3xl" />,
            title: "Expert Chefs",
            desc: "Meals crafted by culinary professionals with years of experience."
        },
        {
            icon: <FaLeaf className="text-3xl" />,
            title: "Fresh Ingredients",
            desc: "We source organic and fresh produce directly from local farmers."
        },
        {
            icon: <FaTruck className="text-3xl" />,
            title: "Fast Delivery",
            desc: "Hot and fresh meals delivered to your doorstep in record time."
        }
    ];

    return (
        <div className="bg-base-100 pb-20">
            {/* --- Hero Section --- */}
            <section className="relative pt-20 pb-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="lg:w-1/2"
                        >
                            <h4 className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4">Our Story</h4>
                            <h1 className="text-5xl md:text-7xl font-black text-base-content leading-tight">
                                Crafting <span className="text-primary   decoration-1 underline-offset-8">Memorable</span> Flavors
                            </h1>
                            <p className="mt-8 text-lg text-base-content/70 leading-relaxed">
                                Since 2020, we've been on a mission to redefine home-style dining. We believe food is more than just fuel—it's an experience that brings people together. Our team works tirelessly to bring you healthy, delicious, and chef-curated meals.
                            </p>
                            
                            <div className="mt-10 flex flex-wrap gap-4">
                                <div className="flex items-center gap-2 px-6 py-3 bg-base-200 rounded-full font-bold shadow-sm">
                                    <FaUsers className="text-primary" /> 10k+ Happy Clients
                                </div>
                                <div className="flex items-center gap-2 px-6 py-3 bg-base-200 rounded-full font-bold shadow-sm">
                                    <FaUtensils className="text-primary" /> 50+ Daily Specials
                                </div>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="lg:w-1/2 relative"
                        >
                            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-base-200">
                                <img 
src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop"
                                    alt="Our Kitchen" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Decorative Elements */}
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl -z-0"></div>
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-0"></div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- Mission Section --- */}
            <section className="py-20 bg-base-200/50">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-5xl font-black mb-6">Our <span className="text-primary italic">Mission</span></h2>
                        <p className="text-xl text-base-content/60 italic leading-relaxed">
                            "To make professional-grade, healthy dining accessible to every household, ensuring that every meal we serve is a masterpiece of taste and nutrition."
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* --- Features Grid --- */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                className="p-10 bg-base-100 border border-base-content/5 rounded-[2.5rem] shadow-xl shadow-base-content/5 hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-500"
                            >
                                <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl font-black mb-4">{item.title}</h3>
                                <p className="text-base-content/60 leading-relaxed">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CTA Section --- */}
            <section className="max-w-7xl mx-auto px-6 lg:px-10 mt-10">
                <div className="bg-primary p-12 md:p-20 rounded-[3rem] text-center text-white relative overflow-hidden shadow-2xl shadow-primary/30">
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Ready to Taste the <br /> <span className="text-base-content">Difference?</span></h2>
                        <Link to="/all-meals" className="btn bg-white text-primary border-none hover:bg-base-200 btn-lg rounded-full px-12 font-black transition-transform active:scale-95 shadow-xl">
                            Explore Our Menu
                        </Link>
                    </div>
                    {/* Abstract Shapes */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-20 -mb-20 blur-3xl"></div>
                </div>
            </section>
        </div>
    );
};

export default About;