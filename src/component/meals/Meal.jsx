import React from 'react';
import { FaStar, FaMapMarkerAlt, FaRegClock } from 'react-icons/fa';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const Meal = ({ meal }) => {
    const { _id, chefName, foodImage, foodName, price, rating, deliveryArea, description } = meal;

    return (
        <motion.div 
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="group flex flex-col h-full bg-base-100 rounded-[2.5rem] p-4 border border-base-content/5 shadow-xl hover:shadow-primary/10 transition-all duration-300"
        >
            {/* --- Image Section --- */}
            <div className="relative h-[220px] w-full overflow-hidden rounded-[2rem]">
                <img 
                    src={foodImage} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    alt={foodName} 
                />
                {/* Price Badge Over Image */}
                <div className="absolute top-4 right-4 bg-base-100/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg">
                    <span className="text-primary font-black text-lg">{price}৳</span>
                </div>
                {/* Rating Badge */}
                <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-white text-xs font-bold">
                    <FaStar className="text-amber-400" /> {rating}
                </div>
            </div>

            {/* --- Content Section --- */}
            <div className="flex flex-col flex-grow p-4 space-y-3">
                <div className="flex justify-between items-start gap-2">
                    <h3 className="text-xl font-black text-base-content leading-tight line-clamp-1 group-hover:text-primary transition-colors">
                        {foodName}
                    </h3>
                </div>

                 <p className="text-sm text-base-content/60 font-medium line-clamp-2 leading-relaxed">
                    {description || "Experience the authentic taste of home-cooked " + foodName + " prepared with fresh ingredients."}
                </p>

                {/* Meta Information Grid */}
                <div className="pt-2 space-y-2 border-t border-base-content/5 mt-auto">
                    <div className="flex justify-between items-center text-[13px] font-bold uppercase tracking-wider text-base-content/40">
                        <span className="flex items-center gap-1.5">
                            <FaMapMarkerAlt className="text-primary" /> {deliveryArea}
                        </span>
                        <span className="text-base-content/70 lowercase italic">
                            by <span className="text-primary font-black">@{chefName.split(' ')[0]}</span>
                        </span>
                    </div>
                </div>

                {/* --- Action Button --- */}
                <Link 
                    to={`/meal-details/${_id}`}
                    className="btn btn-primary w-full h-12 rounded-2xl text-white font-black text-md shadow-lg shadow-primary/20 group/btn mt-2"
                >
                    View Details
                    <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                        →
                    </motion.span>
                </Link>
            </div>
        </motion.div>
    );
};

export default Meal;