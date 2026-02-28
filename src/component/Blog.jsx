import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router'; // ১. useNavigate ইমপোর্ট করুন
import { FaCalendarAlt, FaUser, FaArrowRight } from 'react-icons/fa';

const blogs = [
    // ... (আপনার আগের সব ব্লগ ডাটা এখানে থাকবে)
    {
        id: 1,
        title: "The Secret to Perfecting Your Home-Cooked Meals",
        excerpt: "Discover the professional tips and tricks that world-class chefs use to elevate simple home ingredients into gourmet experiences.",
        author: "Chef Rahat",
        date: "Oct 12, 2025",
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
        category: "Tips & Tricks"
    },
    {
        id: 2,
        title: "5 Healthy Ingredients You Should Add to Your Diet",
        excerpt: "Eating healthy doesn't have to be boring. Learn about these 5 superfoods that are both delicious and packed with nutrition.",
        author: "Nutritionist Sarah",
        date: "Oct 15, 2025",
        image: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=800",
        category: "Healthy Living"
    },
    {
        id: 3,
        title: "Why Freshly Sourced Local Produce Matters",
        excerpt: "Understand the journey of your food from the local farm to your table and why sourcing fresh makes all the difference in taste.",
        author: "Farmer Karim",
        date: "Oct 18, 2025",
        image: "https://images.pexels.com/photos/1435737/pexels-photo-1435737.jpeg?auto=compress&cs=tinysrgb&w=800",
        category: "Sustainability"
    }
];

const Blog = () => {
    const navigate = useNavigate(); // ২. নেভিগেট ফাংশনটি ডিফাইন করুন

    return (
        <div className="bg-base-100 min-h-screen pb-24">
            {/* --- Header Section --- */}
            <section className="pt-24 pb-16 px-6 lg:px-10">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h4 className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs mb-4">
                            Culinary Insights
                        </h4>
                        <h1 className="text-5xl md:text-7xl font-black text-base-content leading-tight">
                            Our Latest <span className="text-primary decoration-1 underline-offset-8">Stories</span>
                        </h1>
                        <p className="mt-8 text-lg text-base-content/60 max-w-2xl mx-auto leading-relaxed">
                            Explore recipes, health tips, and behind-the-scenes stories from our expert chefs and nutritionists.
                        </p>
                    </motion.div>
                    
                    <div className="flex justify-center mt-12">
                        <span className="w-16 h-1.5 bg-primary rounded-full"></span>
                        <span className="w-4 h-1.5 bg-primary/30 rounded-full mx-1.5"></span>
                        <span className="w-2 h-1.5 bg-primary/20 rounded-full"></span>
                    </div>
                </div>
            </section>

            {/* --- Blog Grid --- */}
            <section className="max-w-7xl mx-auto px-6 lg:px-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {blogs.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -10 }}
                            className="group bg-base-200/40 rounded-[2.5rem] overflow-hidden border border-base-content/5 hover:bg-base-200 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-primary/5"
                        >
                            <div className="relative h-72 overflow-hidden">
                                <img 
                                    src={post.image} 
                                    alt={post.title} 
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute top-6 left-6">
                                    <span className="bg-primary text-white text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-[0.2em] shadow-xl">
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-10">
                                <div className="flex items-center gap-5 text-[10px] text-base-content/50 mb-5 font-bold uppercase tracking-widest">
                                    <span className="flex items-center gap-1.5">
                                        <FaCalendarAlt className="text-primary text-xs" /> {post.date}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <FaUser className="text-primary text-xs" /> {post.author}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-black text-base-content mb-5 leading-tight group-hover:text-primary transition-colors duration-300">
                                    {post.title}
                                </h3>
                                <p className="text-base-content/60 text-sm leading-relaxed mb-10 line-clamp-3">
                                    {post.excerpt}
                                </p>
                                <button className="flex items-center gap-3 text-primary font-black uppercase text-[11px] tracking-[0.2em] hover:gap-5 transition-all duration-300">
                                    Read Full Story <FaArrowRight />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* --- Pagination / CTA --- */}
            <div className="mt-24 text-center">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/about')}  
                    className="btn btn-primary btn-lg px-12 text-white font-black shadow-2xl shadow-primary/20 hover:shadow-primary/40 group"
                >
                    Learn More About Us 
                    <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.button>
            </div>
        </div>
    );
};

export default Blog;