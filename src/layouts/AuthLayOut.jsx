import React from 'react';
import { Outlet } from 'react-router';
import { motion } from 'framer-motion';
import Logo from '../component/Logo';
import ScrollTop from '../component/ScrollTop';
import authImg from '../assets/img1.jpg';

const AuthLayOut = () => {
    return (
         <div className="bg-base-100 text-base-content min-h-screen transition-all duration-500">
            <ScrollTop />
            
            <div className="flex min-h-screen">
                {/* Left Side: Form Section */}
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="flex-1 flex flex-col p-8 md:p-12 lg:p-20 relative z-20 bg-base-100"
                >
                    {/* Header: Logo */}
                    <header className="mb-12">
                        <div className="inline-block transform hover:rotate-3 transition-transform">
                            <Logo />
                        </div>
                    </header>

                    {/* Main Content: Login/Register Form */}
                    <main className="flex-1 flex items-center justify-center w-full max-w-sm mx-auto">
                        <div className="w-full">
                            <Outlet />
                        </div>
                    </main>

                    {/* Footer */}
                    <footer className="mt-10 text-[10px] font-bold opacity-30 uppercase tracking-[0.4em]">
                        © 2026 Premium Kitchen • Secure Auth
                    </footer>
                </motion.div>

                {/* Right Side: Visual Section */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2 }}
                    className="hidden lg:flex flex-1 relative overflow-hidden bg-base-200"
                >
                     <div className="absolute inset-0 bg-gradient-to-r from-base-100 via-base-100/20 to-transparent z-10 w-1/3"></div>
                    
                    {/* Bottom Content Overlay */}
                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-16 bg-gradient-to-t from-base-100/80 via-transparent to-transparent">
                        <h2 className="text-4xl font-black leading-tight mb-2 tracking-tighter">
                            Elevate Your <br /> 
                            <span className="text-primary italic">Cooking Journey.</span>
                        </h2>
                        <p className="max-w-xs text-sm font-semibold opacity-60">
                            The most trusted platform for professional chefs and food enthusiasts.
                        </p>
                    </div>

                    {/* Background Image with subtle zoom */}
                    <motion.img 
                        src={authImg} 
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 20, repeat: Infinity, repeatType: "mirror" }}
                        className="w-full h-full object-cover opacity-90 dark:opacity-70" 
                        alt="Background" 
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default AuthLayOut;