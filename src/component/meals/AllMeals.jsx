import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Meal from "./Meal";
import { FaArrowLeft, FaArrowRight, FaSortAmountDown, FaSearch, FaStar } from "react-icons/fa";
import useTitle from "../../hooks/useTitle";
import { motion, AnimatePresence } from "framer-motion";

const AllMeals = () => {
    useTitle("All Meals");
    const [sort, setSort] = useState('');
    const [ratingFilter, setRatingFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const axiosSecure = useAxiosSecure();

    // ১. ব্যাকএন্ড ফিল্টারিং কুয়েরি
    // এখানে কুয়েরি কি (queryKey) তে স্টেটগুলো দেওয়া হয়েছে যাতে স্টেট চেঞ্জ হলে অটোমেটিক ডাটা ফেচ হয়
    const { data: mealData = { meals: [], totalPage: 1 }, isLoading } = useQuery({
        queryKey: ['meals', searchTerm, sort, ratingFilter, currentPage], 
        queryFn: async () => {
            // সার্ভারে কুয়েরি প্যারামস পাঠানো হচ্ছে
            const res = await axiosSecure.get(
                `/meals?search=${searchTerm}&sort=${sort}&rating=${ratingFilter}&page=${currentPage}&limit=8`
            );
            return res.data;
        }
    });

    // ২. সার্ভার থেকে আসা ডাটা সরাসরি ভ্যারিয়েবলে রাখা
    const currentMeals = mealData.meals || [];
    const totalPage = mealData.totalPage || 1;

    // ৩. সার্চ, সর্ট বা রেটিং ফিল্টার চেঞ্জ হলে ইউজারকে ১ম পেজে পাঠানো
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, sort, ratingFilter]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    return (
        <div className="min-h-screen bg-base-100 pb-24 transition-colors duration-300">
            {/* Header & Search Section (Design Same) */}
            <section className="bg-base-200/50 py-16 md:py-20 px-6 lg:px-10 border-b border-base-content/5">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                        <h4 className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs mb-3">Delicious Variety</h4>
                        <h1 className="text-4xl md:text-6xl font-black text-base-content leading-tight mb-6">
                            Explore All <span className="text-primary decoration-1 underline-offset-8">Meals</span>
                        </h1>
                    </motion.div>

                    {/* Controls */}
                    <div className="mt-12 flex flex-col md:flex-row gap-5 justify-center items-center w-full max-w-6xl mx-auto">
                        
                        {/* Search Input */}
                        <div className="relative w-full md:flex-1 group">
                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/50 z-10">
                                <FaSearch className="text-lg" />
                            </div>
                            <input 
                                type="text" 
                                placeholder="Search your favorite meal..." 
                                className="input w-full pl-14 h-16 rounded-2xl bg-base-100 border-base-content/10 text-base-content placeholder:text-base-content/30 focus:outline-none focus:border-primary/50 shadow-sm transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Rating Filter (Requirement 2) */}
                        <div className="relative w-full md:w-64 group">
                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/50 z-10 pointer-events-none">
                                <FaStar className="text-lg" />
                            </div>
<select
    value={ratingFilter}
    onChange={(e) => setRatingFilter(e.target.value)}
    className="select w-full pl-14 h-16 rounded-2xl bg-base-100 border-base-content/10 text-base-content font-black text-sm cursor-pointer"
>
    <option value="">FILTER BY RATING</option>
    <option value="4.8">4.8+ STAR</option>
    <option value="4.7">4.7+ STAR</option>
    <option value="4.6">4.6+ STAR</option>
    <option value="4.5">4.5+ STAR</option>
</select>
                        </div>

                        {/* Price Sort (Requirement 3) */}
                        <div className="relative w-full md:w-64 group">
                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/50 z-10 pointer-events-none">
                                <FaSortAmountDown className="text-lg" />
                            </div>
<select
    value={sort}
    onChange={(e) => setSort(e.target.value)}
    className="select w-full pl-14 h-16 rounded-2xl bg-base-100 border-base-content/10 text-base-content font-black text-sm cursor-pointer"
>
    <option value="">SORT BY PRICE</option>
    <option value="asc">LOW TO HIGH (Price)</option>
    <option value="desc">HIGH TO LOW (Price)</option>
</select>                        </div>
                    </div>
                </div>
            </section>

            {/* Meals Grid Section (Design Same) */}
            <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-12 md:mt-16">
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="flex flex-col gap-5 w-full">
                                <div className="skeleton h-64 w-full rounded-[2.5rem] bg-base-300/50"></div>
                                <div className="skeleton h-8 w-3/4 bg-base-300/50"></div>
                            </div>
                        ))}
                    </div>
                ) : currentMeals.length > 0 ? (
                    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <AnimatePresence mode='popLayout'>
                            {currentMeals.map(meal => (
                                <motion.div key={meal._id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <Meal meal={meal} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <div className="text-center py-24 bg-base-200/20 rounded-[3rem] border-2 border-dashed border-base-content/5">
                        <h3 className="text-3xl font-black text-base-content/20 uppercase tracking-widest">No meals found</h3>
                    </div>
                )}

                {/* Pagination (Design Same) */}
                {totalPage > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-20">
                        <button 
                            disabled={currentPage === 1} 
                            onClick={() => setCurrentPage(prev => prev - 1)} 
                            className="btn btn-circle btn-lg bg-base-200 border-none hover:bg-primary hover:text-white transition-all disabled:opacity-30"
                        >
                            <FaArrowLeft />
                        </button>

                        <div className="flex gap-2 bg-base-200/50 p-2 rounded-2xl border border-base-content/5 overflow-x-auto max-w-[250px] md:max-w-none">
                            {[...Array(totalPage).keys()].map(number => (
                                <button 
                                    key={number}
                                    onClick={() => setCurrentPage(number + 1)}
                                    className={`w-12 h-12 min-w-[3rem] rounded-xl font-black transition-all ${
                                        currentPage === number + 1 
                                        ? "bg-primary text-white shadow-xl scale-110" 
                                        : "hover:bg-base-300 text-base-content/60"
                                    }`}
                                >
                                    {number + 1}
                                </button>
                            ))}
                        </div>

                        <button 
                            disabled={currentPage === totalPage} 
                            onClick={() => setCurrentPage(prev => prev + 1)} 
                            className="btn btn-circle btn-lg bg-base-200 border-none hover:bg-primary hover:text-white transition-all disabled:opacity-30"
                        >
                            <FaArrowRight />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllMeals;