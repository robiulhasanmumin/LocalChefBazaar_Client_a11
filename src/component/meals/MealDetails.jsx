import React, { useState } from 'react';
import { useParams, Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import useTitle from '../../hooks/useTitle';
import Swal from 'sweetalert2';
import { 
    FaRegHeart, FaStar, FaMapMarkerAlt, FaClock, 
    FaCheckCircle, FaQuoteLeft, FaChevronRight, FaUtensils, FaUserTie 
} from 'react-icons/fa';
import { FaBowlFood } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';

// Swiper Components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const MealDetails = () => {
    useTitle("Meal Details");
    const { id } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    
    const [activeTab, setActiveTab] = useState('description');
    const [comment, setComment] = useState('');
    const [ratings, setRatings] = useState(5);

     const { data: mealData = {}, isLoading } = useQuery({
        queryKey: ['meal', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/meals/${id}`);
            return res.data;
        }
    });

     const { data: currentUser = {} } = useQuery({
        queryKey: ['currentUser', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });

     const { data: reviews = [], refetch: reloadReviews } = useQuery({
        queryKey: ['reviews', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews?foodId=${id}`);
            return res.data;
        }
    });

     const { data: allMeals = [] } = useQuery({
        queryKey: ['all-meals'],
        queryFn: async () => {
            const res = await axiosSecure.get("/meals");
            return res.data;
        }
    });

     const mealsArray = Array.isArray(allMeals) ? allMeals : (allMeals?.meals || []); //

    const isFraud = currentUser?.status === "fraud";
    const { 
        foodName, chefName, foodImage, price, rating, ingredients, 
        deliveryArea, estimatedDeliveryTime, chefExperience, chefId, extraImages = [] 
    } = mealData;

    // line 74 ফিক্সড: mealsArray.filter ব্যবহার করা হয়েছে যাতে ক্র্যাশ না করে
    const relatedMeals = mealsArray
        .filter(m => m.deliveryArea === deliveryArea && m._id !== id)
        .slice(0, 4);

    const galleryImages = [foodImage, ...extraImages].filter(Boolean);

    // রিভিউ হ্যান্ডলার
    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!user) return Swal.fire("Error", "Please login to review", "error");

        const reviewInfo = {
            foodId: id,
            reviewerName: user?.displayName,
            reviewerImage: user?.photoURL,
            email: user?.email,
            foodName: foodName,
            rating: ratings,
            comment: comment,
            date: new Date().toISOString(),
        };

        try {
            const res = await axiosSecure.post("/reviews", reviewInfo);
            if (res.data.insertedId) {
                Swal.fire("Success", "Your review is live!", "success");
                setComment(""); 
                setRatings(5);
                reloadReviews();
            }
        } catch (error) {
            Swal.fire("Error", "Failed to submit review", "error");
        }
    };

    const handleAddFavorite = async () => {
        if (!user) return Swal.fire("Login Required", "Please login first!", "warning");
        const res = await axiosSecure.post("/favourites", {
            userEmail: user.email, mealId: id, mealName: foodName, chefName, price
        });
        res.data.message === "already exists" ? Swal.fire("Note", "Already in favorites!", "info") : Swal.fire("Success", "Added to favorites!", "success");
    };

    if (isLoading) return <div className="min-h-screen flex justify-center items-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>;

    return (
        <div className="min-h-screen bg-base-100 pb-20 transition-colors duration-300">
            {/* Header / Media Section */}
            <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="rounded-[2.5rem] overflow-hidden shadow-2xl bg-base-200 border border-base-content/5 relative group">
                    <Swiper modules={[Navigation, Pagination, Autoplay]} navigation pagination={{ clickable: true }} autoplay={{ delay: 3500 }} className="h-[400px] md:h-[550px] w-full">
                        {galleryImages.map((img, index) => (
                            <SwiperSlide key={index}>
                                <img src={img} alt={foodName} className="w-full h-full object-cover" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col justify-center space-y-6">
                    <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.3em] text-[10px]">
                        <FaUtensils /> Signature Dish
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-base-content leading-tight">{foodName}</h1>
                    
                    <div className="flex items-center gap-6">
                        <p className="text-5xl font-black text-primary italic">{price}৳</p>
                        <div className="flex items-center gap-2 bg-amber-500/10 text-amber-500 px-4 py-2 rounded-2xl font-black border border-amber-500/20 shadow-sm">
                            <FaStar /> {rating} <span className="text-base-content/30 text-xs font-bold">({reviews.length})</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-8 border-y border-base-content/10">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-base-200 rounded-2xl text-primary shadow-inner"><FaMapMarkerAlt className="text-xl"/></div>
                            <div><p className="text-[10px] opacity-40 font-black uppercase tracking-widest">Location</p><p className="font-bold text-sm">{deliveryArea}</p></div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-base-200 rounded-2xl text-primary shadow-inner"><FaClock className="text-xl"/></div>
                            <div><p className="text-[10px] opacity-40 font-black uppercase tracking-widest">Wait Time</p><p className="font-bold text-sm">{estimatedDeliveryTime}</p></div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <Link to={isFraud ? "#" : `/order-meal/${id}`} className={`btn btn-primary btn-lg rounded-[1.5rem] md:px-12 font-black flex-1 shadow-lg shadow-primary/20 transition-all ${isFraud ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:scale-105 active:scale-95'}`}>
                            <FaBowlFood className="text-xl" /> {isFraud ? "Order Locked" : "Order Now"}
                        </Link>
                        <button onClick={handleAddFavorite} className="btn btn-outline btn-lg rounded-[1.5rem] border-2 font-black hover:bg-base-content hover:text-primary transition-all">
                            <FaRegHeart className="text-xl" />
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Tabs Section */}
            <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-20">
                <div className="flex gap-10 border-b border-base-content/10 mb-10 overflow-x-auto custom-scrollbar">
                    {['description', 'ingredients', 'chef info'].map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-5 text-[11px] font-black uppercase tracking-[0.25em] transition-all whitespace-nowrap ${activeTab === tab ? 'border-b-4 border-primary text-primary' : 'opacity-30 hover:opacity-100'}`}>
                            {tab}
                        </button>
                    ))}
                </div>

                <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="min-h-[160px] bg-base-200/40 p-10 rounded-[2.5rem] border border-base-content/5 shadow-inner">
                    {activeTab === 'description' && (
                        <div className="max-w-4xl">
                            <FaQuoteLeft className="mb-4 opacity-10 text-4xl text-primary" />
                            <p className="text-lg text-base-content/70 leading-relaxed font-medium italic">
                                "{foodName} the perfect blend of tradition and taste. Our chef uses locally sourced fresh ingredients to craft this masterpiece, ensuring every bite tells a story of passion and quality."
                            </p>
                        </div>
                    )}
                    {activeTab === 'ingredients' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {ingredients?.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 font-bold p-4 bg-base-100 rounded-2xl border border-base-content/5 shadow-sm">
                                    <FaCheckCircle className="text-primary" /> <span className="text-base-content/80">{item}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    {activeTab === 'chef info' && (
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="w-24 h-24 bg-primary text-black rounded-3xl flex items-center justify-center text-4xl font-black shadow-lg shadow-primary/20">
                                {chefName?.[0]}
                            </div>
                            <div className="text-center md:text-left">
                                <h4 className="text-3xl font-black mb-1">{chefName}</h4>
                                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2">
                                    <span className="badge badge-outline border-primary/30 text-primary font-bold p-3 uppercase text-[10px] tracking-widest"><FaUserTie className="mr-2"/> {chefExperience} EXP</span>
                                    <span className="badge badge-ghost font-bold p-3 text-base-content/40 uppercase text-[10px] tracking-widest">ID: #{chefId}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Review Section */}
            <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-32">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-1">
                        <div className="sticky top-10 bg-base-200/60 p-8 rounded-[2.5rem] border border-base-content/5 shadow-xl">
                            <h3 className="text-3xl font-black mb-2">Leave a <span className="text-primary">Review</span></h3>
                            <p className="text-xs font-bold opacity-40 mb-8 uppercase tracking-widest">We value your feedback</p>
                            
                            <form onSubmit={handleReviewSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase opacity-40 ml-2">Rate the meal</label>
                                    <select value={ratings} onChange={(e) => setRatings(Number(e.target.value))} className="select w-full rounded-2xl bg-base-100 border-base-content/10 text-base-content font-bold focus:ring-4 focus:ring-primary/5 transition-all">
                                        <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
                                        <option value={4}>⭐⭐⭐⭐ Very Good</option>
                                        <option value={3}>⭐⭐⭐ Average</option>
                                        <option value={2}>⭐⭐ Poor</option>
                                        <option value={1}>⭐ Terrible</option>
                                    </select>
                                </div>
                                
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase opacity-40 ml-2">Comment</label>
                                    <textarea 
                                        value={comment} 
                                        onChange={(e) => setComment(e.target.value)} 
                                        className="textarea w-full rounded-2xl bg-base-100 border-base-content/10 text-base-content placeholder:text-base-content/20 h-36 focus:ring-4 focus:ring-primary/5 transition-all" 
                                        placeholder="Tell others how it tasted..." 
                                        required 
                                    />
                                </div>
                                
                                <button className="btn btn-primary w-full rounded-2xl font-black shadow-lg shadow-primary/20 h-16 text-lg hover:scale-105 active:scale-95 transition-all">
                                    Submit Feedback
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <h3 className="text-3xl font-black mb-10 flex items-center gap-6">
                            Foodies Feedback <div className="h-[2px] flex-1 bg-base-content/5"></div>
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[700px] overflow-y-auto pr-4 custom-scrollbar">
                            <AnimatePresence>
                                {reviews.length > 0 ? reviews.map((rev, idx) => (
                                    <motion.div key={rev._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="p-8 bg-base-100 border border-base-content/5 rounded-[2rem] shadow-sm flex flex-col hover:border-primary/20 transition-all group">
                                        <div className="flex gap-4 items-center mb-5">
                                            <img src={rev.reviewerImage} className="w-12 h-12 rounded-2xl object-cover ring-4 ring-base-200 group-hover:ring-primary/20 transition-all" alt="" />
                                            <div>
                                                <h5 className="font-black text-base-content">{rev.reviewerName}</h5>
                                                <span className="text-[9px] font-black opacity-30 uppercase tracking-tighter">{new Date(rev.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                            </div>
                                        </div>
                                        <div className="text-amber-500 mb-3 flex gap-1">
                                            {[...Array(rev.rating)].map((_, i) => <FaStar key={i} size={10} />)}
                                        </div>
                                        <p className="text-base-content/60 font-medium italic leading-relaxed text-sm">"{rev.comment}"</p>
                                    </motion.div>
                                )) : (
                                    <div className="col-span-full py-20 text-center bg-base-200/20 rounded-[3rem] border-2 border-dashed border-base-content/5">
                                        <FaUtensils className="mx-auto text-4xl opacity-10 mb-4" />
                                        <p className="font-black uppercase tracking-widest opacity-20 text-sm">No reviews yet for this dish</p>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Meals Section */}
            {relatedMeals.length > 0 && (
                <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-32">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <p className="text-primary font-black uppercase text-[10px] tracking-[0.4em] mb-2 underline-offset-4 decoration-primary/30">Suggestions</p>
                            <h2 className="text-4xl md:text-5xl font-black">You May Also <span className="text-primary">Like</span></h2>
                        </div>
                        <Link to="/all-meals" className="btn btn-ghost rounded-xl font-black opacity-30 hover:opacity-100">See All <FaChevronRight /></Link>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {relatedMeals.map(meal => (
                            <motion.div key={meal._id} whileHover={{ y: -10 }} className="group bg-base-200/40 rounded-[2.5rem] p-5 border border-base-content/5 hover:border-primary/20 transition-all">
                                <div className="h-44 rounded-[1.8rem] overflow-hidden mb-5 relative">
                                    <img src={meal.foodImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                                    <div className="absolute top-4 right-4 bg-base-100/90 backdrop-blur-md px-4 py-2 rounded-2xl text-xs font-black text-primary shadow-xl">{meal.price}৳</div>
                                </div>
                                <h5 className="font-black text-xl mb-4 truncate text-base-content/90">{meal.foodName}</h5>
                                <Link to={`/meal-details/${meal._id}`} className="btn btn-sm btn-block rounded-xl bg-base-100 border-none font-bold text-[10px] group-hover:bg-primary group-hover:text-black transition-all">View Details</Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MealDetails;