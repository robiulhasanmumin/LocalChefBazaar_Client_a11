import React from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';
import Swal from 'sweetalert2'; // ১. SweetAlert2 ইমপোর্ট করুন

const Newsletter = () => {
    const handleSubscribe = (e) => {
        e.preventDefault();
        
         Swal.fire({
            title: '<span style="font-family: inherit; font-weight: 900;">Welcome to our Family!</span>',
            text: "Check your inbox for exclusive treats and recipes.",
            icon: 'success',
            confirmButtonColor: '#FA812F',  
            confirmButtonText: 'Great!',
            buttonsStyling: true,
            customClass: {
                popup: 'rounded-[2rem]',  
                confirmButton: 'rounded-xl font-black px-8 py-3'
            }
        });

         e.target.reset();
    };

    return (
        <section className="py-24 bg-base-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative bg-base-200 rounded-[3rem] p-12 md:p-24 overflow-hidden border border-base-content/5 shadow-2xl"
                >
                    {/* Background Decorative Blobs */}
                    <div className="absolute -top-32 -right-32 w-80 h-80 bg-primary/10 rounded-full blur-[100px]"></div>
                    <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-primary/5 rounded-full blur-[100px]"></div>

                    <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
                        
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h4 className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs mb-4">
                                Join Our Foodie Family
                            </h4>
                            <h2 className="text-4xl md:text-6xl font-black text-base-content leading-tight">
                                Get Our <span className="text-primary  decoration-1 underline-offset-8">Special</span> Deals
                            </h2>
                            <p className="text-base-content/60 mt-8 text-lg leading-relaxed">
                                Subscribe to get exclusive recipes, seasonal discounts, and the best meal plans delivered right to your inbox.
                            </p>
                        </motion.div>

                        <motion.form 
                            onSubmit={handleSubscribe}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="mt-12 w-full max-w-xl relative"
                        >
                            <div className="flex flex-col sm:flex-row gap-3 p-2 bg-base-100 rounded-[2rem] sm:rounded-full shadow-inner border border-base-content/5 group focus-within:border-primary/50 transition-all duration-300">
                                <input 
                                    type="email" 
                                    required
                                    placeholder="Enter your email address" 
                                    className="flex-1 bg-transparent px-8 py-4 outline-none text-base-content font-medium placeholder:text-base-content/30"
                                />
                                <motion.button 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="btn btn-primary btn-lg rounded-2xl sm:rounded-full px-10 text-white font-black shadow-lg shadow-primary/20 hover:shadow-primary/40 group flex items-center gap-3"
                                >
                                    Subscribe
                                    <FaPaperPlane className="text-sm group-hover:-rotate-12 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </motion.button>
                            </div>
                            
                            <p className="text-[11px] text-base-content/40 mt-5 italic">
                                We value your privacy. Unsubscribe at any time with a single click.
                            </p>
                        </motion.form>

                        <div className="flex justify-center mt-12">
                            <span className="w-12 h-1 bg-primary rounded-full inline-block"></span>
                            <span className="w-3 h-1 bg-primary/30 rounded-full inline-block mx-1"></span>
                            <span className="w-1.5 h-1 bg-primary/20 rounded-full inline-block"></span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Newsletter;