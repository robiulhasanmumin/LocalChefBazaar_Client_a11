import React from 'react';
import { Link } from 'react-router';
import useTitle from '../hooks/useTitle';
import { motion } from 'framer-motion';
import { FaHome, FaArrowLeft } from 'react-icons/fa';

const ErrorPage = () => {
  useTitle("404 - Page Not Found");

  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center px-6 transition-colors duration-300 overflow-hidden relative">
      
      {/* ব্যাকগ্রাউন্ড ডেকোরেশন (ব্লোঁ শ্যাডো) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-primary/10 blur-[120px] rounded-full -z-0"></div>

      <div className="text-center z-10">
        {/* ৪-০-৪ এনিমেশন */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative inline-block"
        >
          <h1 className="text-[120px] md:text-[200px] font-black leading-none text-primary drop-shadow-2xl">
            404
          </h1>
          <motion.div 
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute -top-4 -right-4 md:-top-8 md:-right-8 bg-base-200 p-4 rounded-2xl shadow-xl border border-base-300"
          >
            <span className="text-4xl md:text-6xl">🍲</span>
          </motion.div>
        </motion.div>

        {/* টেক্সট কন্টেন্ট */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="space-y-4"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-base-content">
            Oops! Page is Missing.
          </h2>
          <p className="text-base-content/60 max-w-md mx-auto text-lg">
            It seems the meal you are looking for has already been served or the recipe is missing!
          </p>
        </motion.div>

        {/* অ্যাকশন বাটন */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button 
            onClick={() => window.history.back()} 
            className="btn btn-outline btn-lg px-8 font-bold border-2 hover:bg-base-200 transition-all flex gap-2"
          >
            <FaArrowLeft /> Go Back
          </button>
          
          <Link 
            to="/" 
            className="btn btn-primary btn-lg px-8 text-white font-bold shadow-lg shadow-primary/30 border-none transition-all flex gap-2"
          >
            <FaHome /> Back to Home
          </Link>
        </motion.div>
      </div>

      {/* নিচের দিকে ছোট একটি টেক্সট */}
      <footer className="absolute bottom-10 text-base-content/40 text-sm">
        &copy; {new Date().getFullYear()} LocalChefBazaar - All Rights Reserved
      </footer>
    </div>
  );
};

export default ErrorPage;