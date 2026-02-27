import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';  

const categories = [
    {
        name: 'Breakfast',
         image: 'https://images.pexels.com/photos/103124/pexels-photo-103124.jpeg?auto=compress&cs=tinysrgb&w=600',
        description: 'Start your day with healthy and fresh energy.',
        count: '12+ Items'
    },
    {
        name: 'Lunch',
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
        description: 'Delicious midday treats for your hunger.',
        count: '25+ Items'
    },
    {
        name: 'Dinner',
        image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=600',
        description: 'End your day with a beautiful meal.',
        count: '18+ Items'
    },
    {
        name: 'Snacks',
         image: 'https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=600',
        description: 'Quick and tasty bites for your cravings.',
        count: '10+ Items'
    }
];

const MealCategory = () => {
    return (
        <section className="py-20 bg-base-100 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                
                {/* সেকশন হেডার */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div className="max-w-xl">
                        <motion.h2 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-4xl md:text-5xl font-black text-base-content"
                        >
                            Explore by <span className="text-primary">Category</span>
                        </motion.h2>
                        <p className="text-base-content/60 mt-4 text-lg">
                            Find the perfect meal for any time of the day. From healthy breakfast to heavy dinner, we have it all.
                        </p>
                    </div>
                </div>

                {/* ক্যাটাগরি গ্রিড */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat, index) => (
                        <Link to="/all-meals" key={cat.name}>  
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="group relative h-[400px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl border border-base-content/5"
                            >
                                {/* ব্যাকগ্রাউন্ড ইমেজ */}
                                <img 
                                    src={cat.image} 
                                    alt={cat.name} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                    loading="lazy"
                                />
                                
                                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                                {/* কন্টেন্ট */}
                                <div className="absolute bottom-0 left-0 p-8 w-full transition-all duration-500 group-hover:bottom-4">
                                    <span className="text-primary font-bold text-sm tracking-widest uppercase">{cat.count}</span>
                                    <h3 className="text-3xl font-bold text-white mt-1">{cat.name}</h3>
                                    <p className="text-white/80 mt-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2">
                                        {cat.description}
                                    </p>
                                    
                                    {/* ইন্ডিকেটর লাইন */}
                                    <div className="mt-4 h-1 w-0 bg-primary group-hover:w-full transition-all duration-500 rounded-full"></div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MealCategory;