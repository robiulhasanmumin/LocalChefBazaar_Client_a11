import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import useTitle from '../hooks/useTitle';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUserShield, FaGoogle } from 'react-icons/fa';

const Login = () => {
    useTitle("Login | LocalChefBazaar");
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const location = useLocation();
    const navigate = useNavigate();
    const { signInUser, signInGoogle } = useAuth();

    // 🔐 Handle Manual Login
    const handleLogin = async (data) => {
        setLoading(true);
        try {
            await signInUser(data.email, data.password);
            Swal.fire({
                title: "Welcome Back!",
                text: "Login Successful",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
                background: 'transparent',
                backdrop: `rgba(0,0,123,0.4)`
            });
            navigate(location?.state || "/");
        } catch (err) {
            Swal.fire({
                title: "Authentication Failed",
                text: err.message.includes('auth/invalid-credential') ? "Invalid email or password" : err.message,
                icon: "error"
            });
        } finally {
            setLoading(false);
        }
    };

    // 🛠 Demo Admin Login Helper
    const fillDemoAdmin = () => {
        setValue("email", "admin@chef.com");
        setValue("password", "Admin@123");
    };

// google sign in handler
    const handleGoogleLogin = () => {
    setLoading(true);
    signInGoogle()
        .then((result) => {
            Swal.fire({
                title: "Logged In!",
                text: `Welcome back, ${result.user.displayName}`,
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });
            navigate(location?.state || "/");
        })
        .catch((err) => {
            Swal.fire({
                title: "Login Failed",
                text: err.message,
                icon: "error"
            });
        })
        .finally(() => setLoading(false))
}

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md mx-auto"
        >
            <div className="px-6 mb-8 text-center md:text-left">
                <h3 className="text-4xl font-black tracking-tighter text-base-content">Welcome Back</h3>
                <p className="text-sm font-bold opacity-50 uppercase tracking-widest mt-1 text-base-content">Access your chef dashboard</p>
            </div>

            <div className="card-body p-6 bg-base-100/50 backdrop-blur-xl rounded-[2.5rem] border border-base-content/5 shadow-2xl">
                <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
                    
                    {/* Email Field */}
                    <div className="form-control">
                        <label className="label text-[10px] font-black uppercase tracking-widest opacity-60">Email Address</label>
                        <div className="relative">
                            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" />
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className={`input input-bordered w-full pl-12 rounded-2xl h-14 bg-transparent border-base-content/10 focus:border-primary transition-all ${errors.email ? 'border-error' : ''}`} 
                                {...register("email", { required: "Email is required" })} 
                            />
                        </div>
                        {errors.email && <p className="text-error text-[10px] font-bold mt-1 ml-2 uppercase tracking-tighter">{errors.email.message}</p>}
                    </div>

                    {/* Password Field */}
                    <div className="form-control">
                        <label className="label text-[10px] font-black uppercase tracking-widest opacity-60">Password</label>
                        <div className="relative">
                            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" />
                            <input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="••••••••" 
                                className={`input input-bordered w-full pl-12 pr-12 rounded-2xl h-14 bg-transparent border-base-content/10 focus:border-primary transition-all ${errors.password ? 'border-error' : ''}`} 
                                {...register("password", { 
                                    required: "Password is required", 
                                    minLength: { value: 6, message: "Minimum 6 characters required" } 
                                })} 
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100 transition-opacity"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.password && <p className="text-error text-[10px] font-bold mt-1 ml-2 uppercase tracking-tighter">{errors.password.message}</p>}
                    </div>

                    {/* Demo Access Button */}
                    <div className="flex justify-end">
                        <button 
                            type="button" 
                            onClick={fillDemoAdmin}
                            className="text-[10px] font-black text-primary hover:underline flex items-center gap-1 uppercase tracking-tighter"
                        >
                            <FaUserShield /> Quick Demo Access
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button 
                        disabled={loading}
                        className="btn btn-primary w-full h-14 rounded-2xl font-black uppercase text-black shadow-lg shadow-primary/20 mt-2"
                    >
                        {loading ? <span className="loading loading-spinner"></span> : "Sign In"}
                    </button>

                    <div className="divider opacity-10 text-[10px] font-black uppercase">Or</div>

                    {/* Google Login */}
                    <button 
                        type="button"
                        onClick={handleGoogleLogin}
                        className="btn btn-outline w-full h-14 rounded-2xl font-bold gap-3 border-base-content/10 hover:bg-base-content/5"
                    >
                        <FaGoogle className="text-error" /> Continue with Google
                    </button>
                </form>

                <p className="text-center mt-8 text-sm font-medium opacity-60">
                    New to LocalChefBazaar? <Link className="text-primary font-black hover:underline" to="/register" state={location.state}>Create Account</Link>
                </p>
            </div>
        </motion.div>
    );
};

export default Login;