import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaCamera, FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useTitle from '../hooks/useTitle';

const Register = () => {
    useTitle("Create Account | LocalChefBazaar");
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [regLoading, setRegLoading] = useState(false);
    
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { registerUser, updateUserProfile } = useAuth();

    const password = watch("password");
    const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img_host_key}`;

const handleRegister = async (data) => {
    setRegLoading(true);
    try {
         const formData = new FormData();
        formData.append("image", data.photo[0]);
        const imgRes = await axios.post(image_API_URL, formData);
        const photoURL = imgRes.data.data.url;

         await registerUser(data.email, data.password);
        await updateUserProfile(data.name, photoURL);

         const userInfo = {
            name: data.name,
            email: data.email,
            password: data.password, 
            image: photoURL,
            role: 'user'
        };

        const dbRes = await axiosSecure.post("/users", userInfo);
        
        if (dbRes.data.insertedId) {
            Swal.fire({ title: "Success!", icon: "success" });
            navigate("/");
        }
    } catch (err) {
        Swal.fire({ title: "Error", text: err.message, icon: "error" });
    } finally {
        setRegLoading(false);
    }
}


    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md mx-auto"
        >
            <div className="px-6 mb-6 text-center md:text-left">
                <h3 className="text-4xl font-black tracking-tighter text-base-content">Join Us</h3>
                <p className="text-sm font-bold opacity-50 uppercase tracking-widest mt-1">Start your culinary journey</p>
            </div>

            <div className="card-body p-6 bg-base-100/50 backdrop-blur-xl rounded-[2.5rem] border border-base-content/5 shadow-2xl">
                <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
                    
                    {/* Name Field */}
                    <div className="form-control">
                        <label className="label text-[10px] font-black uppercase tracking-widest opacity-60">Full Name</label>
                        <div className="relative">
                            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" />
                            <input 
                                type="text" 
                                placeholder="Chef John Doe" 
                                className="input input-bordered w-full pl-12 rounded-2xl h-12 bg-transparent border-base-content/10 focus:border-primary" 
                                {...register("name", { required: "Name is required" })} 
                            />
                        </div>
                        {errors.name && <p className="text-error text-[10px] font-bold mt-1 ml-2 uppercase">{errors.name.message}</p>}
                    </div>

                    {/* Photo Upload */}
                    <div className="form-control">
                        <label className="label text-[10px] font-black uppercase tracking-widest opacity-60">Profile Picture</label>
                        <div className="relative cursor-pointer">
                            <input 
                                type="file" 
                                className="file-input file-input-bordered w-full rounded-2xl h-12 bg-transparent border-base-content/10" 
                                {...register("photo", { required: "Profile photo is required" })} 
                            />
                        </div>
                        {errors.photo && <p className="text-error text-[10px] font-bold mt-1 ml-2 uppercase">{errors.photo.message}</p>}
                    </div>

                    {/* Email Field */}
                    <div className="form-control">
                        <label className="label text-[10px] font-black uppercase tracking-widest opacity-60">Email Address</label>
                        <div className="relative">
                            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" />
                            <input 
                                type="email" 
                                placeholder="chef@example.com" 
                                className="input input-bordered w-full pl-12 rounded-2xl h-12 bg-transparent border-base-content/10 focus:border-primary" 
                                {...register("email", { required: "Email is required" })} 
                            />
                        </div>
                        {errors.email && <p className="text-error text-[10px] font-bold mt-1 ml-2 uppercase">{errors.email.message}</p>}
                    </div>

                    {/* Password Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label text-[10px] font-black uppercase tracking-widest opacity-60">Password</label>
                            <div className="relative">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="••••••••" 
                                    className="input input-bordered w-full rounded-2xl h-12 bg-transparent border-base-content/10 focus:border-primary" 
                                    {...register("password", { 
                                        required: "Required", 
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                                            message: "Weak password"
                                        }
                                    })} 
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 opacity-30">
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label text-[10px] font-black uppercase tracking-widest opacity-60">Confirm</label>
                            <input 
                                type="password" 
                                placeholder="••••••••" 
                                className="input input-bordered w-full rounded-2xl h-12 bg-transparent border-base-content/10 focus:border-primary" 
                                {...register("confirmPassword", { 
                                    required: "Required",
                                    validate: value => value === password || "Mismatch"
                                })} 
                            />
                        </div>
                    </div>
                    {(errors.password || errors.confirmPassword) && (
                        <p className="text-error text-[10px] font-bold ml-2 uppercase">
                            {errors.password?.message || errors.confirmPassword?.message}
                        </p>
                    )}

                    {/* Submit Button */}
                    <button 
                        disabled={regLoading}
                        className="btn btn-primary w-full h-14 rounded-2xl font-black uppercase text-black shadow-lg shadow-primary/20 mt-4"
                    >
                        {regLoading ? <span className="loading loading-spinner"></span> : "Create Account"}
                    </button>
                </form>

                <p className="text-center mt-6 text-sm font-medium opacity-60">
                    Already a member? <Link className="text-primary font-black hover:underline" to="/login" state={location.state}>Sign In</Link>
                </p>
            </div>
        </motion.div>
    );
};

export default Register;