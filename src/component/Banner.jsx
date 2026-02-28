 import React from "react";
import hero from "../assets/53094793.png";
import { motion } from "framer-motion";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="relative overflow-hidden bg-base-100 transition-colors duration-300">
        
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row gap-10 items-center justify-between px-6 py-12 lg:px-10 lg:py-24">
        
         <div className="flex-1 text-center lg:text-left space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
              <span className="text-primary">Fresh</span> Homemade <br />
              <span className="text-base-content">Food Nearby</span>
            </h1>
            <p className="text-lg md:text-xl text-base-content/70 mt-4 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Delivered straight from Local Chefs to your table. Cooked with love, 
              seasoned with care, and served fresh every day.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center lg:justify-start gap-4"
          >
            <Link 
              to="/all-meals"
              className="btn btn-primary btn-lg px-8 text-white font-bold shadow-lg hover:shadow-primary/30 transition-all border-none"
            >
              Order Now
            </Link>
            <Link 
              to="/about"
              className="btn btn-outline btn-lg px-8 font-bold hover:bg-primary hover:border-primary hover:text-white transition-all"
            >
              Our Story
            </Link>
          </motion.div>
        </div>

         <div className="flex-1 flex justify-center items-center relative">
           <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl scale-75 animate-pulse"></div>
          
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 2, 0] 
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative z-10 w-64 h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px]"
          >
            <img
              className="h-full w-full rounded-full object-cover border-[8px] border-base-200 shadow-2xl ring-4 ring-primary/20"
              src={hero}
              alt="Delicious Homemade Food"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
