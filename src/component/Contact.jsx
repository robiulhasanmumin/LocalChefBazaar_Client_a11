 import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { FaPhoneAlt, FaEnvelope, FaPaperPlane, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import useAxiosPublic from '../hooks/useAxiosPublic';
 
const Contact = () => {
    const formRef = useRef();
    const axiosPublic = useAxiosPublic();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
         const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const subject = form.subject.value;
        const message = form.message.value;

        const contactData = { name, email, subject, message, date: new Date() };

        try {
             const res = await axiosPublic.post('/contact', contactData);
            
            if (res.data.insertedId) {
                 Swal.fire({
                    title: "Message Sent!",
                    text: "Thank you for reaching out. Your data is stored in our database!",
                    icon: "success",
                    confirmButtonColor: "#FA812F",  
                    timer: 3000
                });

                 formRef.current.reset();
            }
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: "Something went wrong. Please try again.",
                icon: "error"
            });
        }
    };

    const inputClasses = "input input-bordered w-full rounded-2xl bg-base-100 border-base-content/10 text-base-content placeholder:text-base-content/40 focus:ring-2 focus:ring-primary h-14 transition-all";
    const textareaClasses = "textarea textarea-bordered w-full rounded-[2rem] bg-base-100 border-base-content/10 text-base-content placeholder:text-base-content/40 focus:ring-2 focus:ring-primary h-40 p-6 transition-all";

    return (
        <div className="bg-base-100 min-h-screen pb-24 transition-colors duration-300">
            {/* --- Header Section --- */}
            <section className="pt-24 pb-16 px-6 lg:px-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h4 className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs mb-4">Get In Touch</h4>
                    <h1 className="text-5xl md:text-7xl font-black text-base-content leading-tight">
                        Let’s Start a <span className="text-primary decoration-1 underline-offset-8">Conversation</span>
                    </h1>
                </motion.div>
            </section>

            {/* --- Contact Content --- */}
            <section className="max-w-7xl mx-auto px-6 lg:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    
                    {/* Left Side: Info & Map */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-10"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="p-8 bg-base-200/50 rounded-[2rem] border border-base-content/5 hover:border-primary/20 transition-colors">
                                <FaPhoneAlt className="text-primary text-2xl mb-4" />
                                <h4 className="font-black text-lg mb-1 text-base-content">Call Us</h4>
                                <p className="text-base-content/60 text-sm font-semibold">+880 1234 567 890</p>
                            </div>
                            <div className="p-8 bg-base-200/50 rounded-[2rem] border border-base-content/5 hover:border-primary/20 transition-colors">
                                <FaEnvelope className="text-primary text-2xl mb-4" />
                                <h4 className="font-black text-lg mb-1 text-base-content">Email Us</h4>
                                <p className="text-base-content/60 text-sm font-semibold truncate">muminrobiulhasan@gmail.com</p>
                            </div>
                        </div>

                        {/* Interactive Map */}
                        <div className="relative h-80 w-full rounded-[3rem] overflow-hidden border-8 border-base-200 shadow-2xl group">
                            <iframe 
                                title="location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9024424301385!2d90.39063631503378!3d23.75087538458925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8bd55555555%3A0x6d1f9a567634f5d8!2sDhaka!5e0!3m2!1sen!2sbd!4v1625061234567!5m2!1sen!2sbd"
                                className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 contrast-125"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </div>

                        <div className="flex gap-3 pt-2">
                          {[
                            { Icon: FaFacebook, link: "https://facebook.com" },
                            { Icon: FaInstagram, link: "https://instagram.com" },
                            { Icon: FaTwitter, link: "https://twitter.com" }
                          ].map((item, idx) => (
                            <a 
                              key={idx}
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 rounded-xl bg-base-300 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
                            >
                              <item.Icon size={18} />
                            </a>
                          ))}
                        </div>
                    </motion.div>

                    {/* Right Side: Contact Form */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-base-200 p-8 md:p-14 rounded-[3rem] shadow-2xl border border-base-content/5 relative overflow-hidden"
                    >
                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest ml-2 text-base-content/70">Full Name</label>
                                    <input name="name" type="text" placeholder="John Doe" className={inputClasses} required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest ml-2 text-base-content/70">Email Address</label>
                                    <input name="email" type="email" placeholder="john@example.com" className={inputClasses} required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest ml-2 text-base-content/70">Subject</label>
                                <input name="subject" type="text" placeholder="How can we help?" className={inputClasses} required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest ml-2 text-base-content/70">Your Message</label>
                                <textarea name="message" className={textareaClasses} placeholder="Write your message here..." required></textarea>
                            </div>
                            
                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="btn btn-primary w-full h-16 rounded-2xl text-white font-black text-lg shadow-xl shadow-primary/20 group"
                            >
                                Send Message 
                                <FaPaperPlane className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Contact;