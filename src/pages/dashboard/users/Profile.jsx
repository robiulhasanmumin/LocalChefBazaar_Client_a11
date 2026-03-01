import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuth from "../../../hooks/useAuth"
import useTitle from '../../../hooks/useTitle';
import { FaCamera, FaEdit, FaKey, FaUserCircle } from 'react-icons/fa';
import axios from 'axios';

  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img_host_key}`;

const Profile = () => {
    useTitle("My Profile");
    const { user, updateUserProfile, updatePasswordEmail } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);

    // 🔹 User info load from DB
    const { data: currentUser = {}, refetch } = useQuery({
        queryKey: ['currentUser', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });

    // 1️⃣ Profile Image Update Handler
    const handleImageUpdate = async (e) => {
        const image = e.target.files[0];
        if (!image) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('image', image);

        try {
            // Upload to ImgBB
            const res = await axios.post(image_hosting_api, formData);
            if (res.data.success) {
                const photoURL = res.data.data.display_url;
                
                // Update Firebase
                await updateUserProfile(currentUser.displayName, photoURL);
                
                // Update MongoDB
                await axiosSecure.patch(`/users/${currentUser.email}`, { photoURL });
                
                Swal.fire("Success", "Profile picture updated!", "success");
                refetch();
            }
        } catch (err) {
            Swal.fire("Error", "Image upload failed", "error");
        } finally {
            setLoading(false);
        }
    };

    // 2️⃣ Edit Name Handler
    const handleEditName = async () => {
        const { value: newName } = await Swal.fire({
            title: "Enter your new name",
            input: "text",
            inputValue: currentUser.displayName,
            showCancelButton: true,
        });

        if (newName) {
            try {
                await updateUserProfile(newName, currentUser.photoURL);
                await axiosSecure.patch(`/users/${currentUser.email}`, { displayName: newName });
                Swal.fire("Updated!", "Your name has been updated.", "success");
                refetch();
            } catch (err) {
                Swal.fire("Error", "Failed to update name", "error");
            }
        }
    };

    // 3️⃣ Password Update Handler (Firebase)
    const handlePasswordUpdate = async () => {
        Swal.fire({
            title: "Reset Password?",
            text: "A password reset email will be sent to your inbox.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Send Email"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await updatePasswordEmail(currentUser.email);
                    Swal.fire("Sent!", "Check your email to reset password.", "success");
                } catch (err) {
                    Swal.fire("Error", err.message, "error");
                }
            }
        });
    };

    // 4️⃣ Role Request Handler (Existing Logic)
    const handleRoleRequest = async (role) => {
        const requestInfo = {
            userName: currentUser.displayName,
            userEmail: currentUser.email,
            requestType: role,
            requestStatus: "pending",
            requestTime: new Date()
        };

        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: `Send request to be a ${role}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Send"
        });

        if (confirm.isConfirmed) {
            try {
                await axiosSecure.post('/role-requests', requestInfo);
                Swal.fire("Success!", "Request sent successfully!", "success");
                refetch();
            } catch (error) {
                if (error.response?.status === 409) {
                    Swal.fire("Pending!", "Already have a pending request.", "warning");
                } else {
                    Swal.fire("Error", "Something went wrong", "error");
                }
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-base-200 rounded-3xl p-8 shadow-xl border border-base-300">
                <h2 className="text-4xl font-black mb-10 text-center uppercase tracking-tighter"> <span className='text-primary'>Profile </span> Settings</h2>

                <div className="flex flex-col md:flex-row gap-12 items-center">
                    {/* Left Side: Avatar Section */}
                    <div className="relative group">
                        <div className="avatar">
                            <div className="w-48 h-48 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4 overflow-hidden bg-base-300">
                                {currentUser.photoURL ? (
                                    <img src={currentUser.photoURL} alt="profile" />
                                ) : (
                                    <FaUserCircle className="w-full h-full text-base-content/20" />
                                )}
                            </div>
                        </div>
                        {/* Overlay Camera Icon */}
                        <label htmlFor="image-upload" className="absolute bottom-2 right-4 bg-primary p-3 rounded-full text-black cursor-pointer shadow-lg hover:scale-110 transition-transform">
                            <FaCamera size={20} />
                            <input type="file" id="image-upload" className="hidden" onChange={handleImageUpdate} disabled={loading} />
                        </label>
                        {loading && <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full text-white text-sm">Uploading...</div>}
                    </div>

                    {/* Right Side: Info Section */}
                    <div className="flex-1 space-y-6 w-full text-center md:text-left">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-4 bg-base-100 rounded-2xl border border-base-300">
                                <span className="text-xs font-bold text-base-content/50 uppercase tracking-widest">Full Name</span>
                                <div className="flex items-center justify-between mt-1">
                                    <p className="text-xl font-black">{currentUser.displayName}</p>
                                    <button onClick={handleEditName} className="text-primary hover:bg-primary/10 p-2 rounded-lg"><FaEdit /></button>
                                </div>
                            </div>
                            <div className="p-4 bg-base-100 rounded-2xl border border-base-300">
                                <span className="text-xs font-bold text-base-content/50 uppercase tracking-widest">Email Address</span>
                                <p className="text-xl font-bold mt-1 truncate">{currentUser.email}</p>
                            </div>
                            <div className="p-4 bg-base-100 rounded-2xl border border-base-300">
                                <span className="text-xs font-bold text-base-content/50 uppercase tracking-widest">Account Status</span>
                                <p className={`text-xl font-black mt-1 capitalize ${currentUser.status === "fraud" ? "text-error" : "text-success"}`}>
                                    {currentUser.status || 'Active'}
                                </p>
                            </div>
                            <div className="p-4 bg-base-100 rounded-2xl border border-base-300">
                                <span className="text-xs font-bold text-base-content/50 uppercase tracking-widest">Your Role</span>
                                <p className="text-xl font-black mt-1 text-primary uppercase">{currentUser.role}</p>
                            </div>
                        </div>

                        {/* Security Section */}
                        <div className="pt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                            <button onClick={handlePasswordUpdate} className="btn btn-outline btn-sm gap-2 rounded-xl">
                                <FaKey /> Update Password
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- Bottom Action Area (Role Requests) --- */}
                <div className="mt-12 pt-8 border-t border-base-300">
                    <p className="text-center text-sm font-bold text-base-content/40 mb-6 uppercase tracking-[0.3em]">Account Upgrades</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        {currentUser.status !== "fraud" && (
                            <>
                                {currentUser.role === "user" && (
                                    <button
                                        onClick={() => handleRoleRequest("chef")}
                                        className="btn btn-primary px-8 rounded-2xl font-black shadow-lg shadow-primary/20"
                                    >
                                        Be a Chef
                                    </button>
                                )}

                                {currentUser.role !== "admin" && (
                                    <button
                                        onClick={() => handleRoleRequest("admin")}
                                        className="btn bg-green-500 px-8 rounded-2xl font-black shadow-lg"
                                    >
                                        Be an Admin
                                    </button>
                                )}
                            </>
                        )}
                        {currentUser.status === "fraud" && <p className="text-error font-bold italic">Your account is restricted.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;