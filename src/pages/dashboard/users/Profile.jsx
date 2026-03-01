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
    const { user, updateUserProfile, updatePasswordEmail, loading: authLoading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [uploading, setUploading] = useState(false);

    // 🔹 User info load from DB
    const { data: dbUser = {}, refetch, isLoading: dbLoading } = useQuery({
        queryKey: ['currentUser', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });

    // 🔹 Data Fallback: DB থেকে না আসা পর্যন্ত Firebase থেকে ডাটা দেখাবে
    const currentUser = {
        displayName: dbUser?.displayName || user?.displayName || "N/A",
        photoURL: dbUser?.photoURL || user?.photoURL || null,
        email: dbUser?.email || user?.email || "N/A",
        role: dbUser?.role || "user",
        status: dbUser?.status || "active"
    };

    // 1️⃣ Profile Image Update Logic
    const handleImageUpdate = async (e) => {
        const image = e.target.files[0];
        if (!image) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('image', image);

        try {
            const res = await axios.post(image_hosting_api, formData);
            if (res.data.success) {
                const photoURL = res.data.data.display_url;
                
                await Promise.all([
                    updateUserProfile(currentUser.displayName, photoURL),
                    axiosSecure.patch(`/users/${currentUser.email}`, { photoURL })
                ]);
                
                Swal.fire("Success", "Profile picture updated!", "success");
                refetch();
            }
        } catch (err) {
            Swal.fire("Error", "Image upload failed", "error");
        } finally {
            setUploading(false);
        }
    };

    // 2️⃣ Name Edit Logic
    const handleEditName = async () => {
        const { value: newName } = await Swal.fire({
            title: "Enter your new name",
            input: "text",
            inputValue: currentUser.displayName,
            showCancelButton: true,
            inputValidator: (value) => { if (!value) return 'Name cannot be empty!' }
        });

        if (newName) {
            try {
                await Promise.all([
                    updateUserProfile(newName, currentUser.photoURL),
                    axiosSecure.patch(`/users/${currentUser.email}`, { displayName: newName })
                ]);
                Swal.fire("Updated!", "Name has been updated.", "success");
                refetch();
            } catch (err) {
                Swal.fire("Error", "Failed to update name", "error");
            }
        }
    };

    // 3️⃣ Password Reset Email Logic
    const handlePasswordUpdate = async () => {
        Swal.fire({
            title: "Reset Password?",
            text: "A reset link will be sent to your email.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Send Link"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await updatePasswordEmail(currentUser.email);
                    Swal.fire("Sent!", "Check your inbox.", "success");
                } catch (err) {
                    Swal.fire("Error", err.message, "error");
                }
            }
        });
    };

    // 4️⃣ Role Request Logic (Be a Chef / Be an Admin)
    const handleRoleRequest = async (requestedRole) => {
        const requestInfo = {
            userName: currentUser.displayName,
            userEmail: currentUser.email,
            requestType: requestedRole,
            requestStatus: "pending",
            requestTime: new Date()
        };

        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: `Apply to become a ${requestedRole}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Send Request"
        });

        if (confirm.isConfirmed) {
            try {
                await axiosSecure.post('/role-requests', requestInfo);
                Swal.fire("Success!", "Request sent to admin.", "success");
                refetch();
            } catch (error) {
                const message = error.response?.status === 409 ? "Request already pending!" : "Something went wrong";
                Swal.fire("Notice", message, "info");
            }
        }
    };

    if (authLoading || (dbLoading && !dbUser?.email)) {
        return <div className="h-96 flex items-center justify-center"><span className="loading loading-spinner text-primary"></span></div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-base-200 rounded-3xl p-8 shadow-xl border border-base-300">
                <h2 className="text-4xl font-black mb-10 text-center uppercase tracking-tighter"> <span className='text-primary'>Profile </span> Settings</h2>

                <div className="flex flex-col md:flex-row gap-12 items-center">
                    {/* Avatar Section */}
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
                        <label htmlFor="image-upload" className="absolute bottom-2 right-4 bg-primary p-3 rounded-full text-black cursor-pointer shadow-lg hover:scale-110">
                            <FaCamera size={20} />
                            <input type="file" id="image-upload" className="hidden" onChange={handleImageUpdate} disabled={uploading} />
                        </label>
                        {uploading && <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full text-white text-xs">Updating...</div>}
                    </div>

                    {/* Info Section */}
                    <div className="flex-1 space-y-6 w-full text-center md:text-left">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-4 bg-base-100 rounded-2xl border border-base-300">
                                <span className="text-xs font-bold text-base-content/50 uppercase">Full Name</span>
                                <div className="flex items-center justify-between mt-1">
                                    <p className="text-xl font-black">{currentUser.displayName}</p>
                                    <button onClick={handleEditName} className="text-primary p-2"><FaEdit /></button>
                                </div>
                            </div>
                            <div className="p-4 bg-base-100 rounded-2xl border border-base-300">
                                <span className="text-xs font-bold text-base-content/50 uppercase">Email</span>
                                <p className="text-xl font-bold mt-1 truncate">{currentUser.email}</p>
                            </div>
                            <div className="p-4 bg-base-100 rounded-2xl border border-base-300">
                                <span className="text-xs font-bold text-base-content/50 uppercase">Status</span>
                                <p className={`text-xl font-black mt-1 capitalize ${currentUser.status === "fraud" ? "text-error" : "text-success"}`}>
                                    {currentUser.status}
                                </p>
                            </div>
                            <div className="p-4 bg-base-100 rounded-2xl border border-base-300">
                                <span className="text-xs font-bold text-base-content/50 uppercase">Your Role</span>
                                <p className="text-xl font-black mt-1 text-primary uppercase">{currentUser.role}</p>
                            </div>
                        </div>
                        <button onClick={handlePasswordUpdate} className="btn btn-outline btn-sm gap-2 rounded-xl">
                            <FaKey /> Update Password
                        </button>
                    </div>
                </div>

                {/* Account Upgrades Section */}
                <div className="mt-12 pt-8 border-t border-base-300 text-center">
                    <p className="text-xs font-bold text-base-content/40 mb-6 uppercase tracking-widest">Account Upgrades</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        {currentUser.status !== "fraud" && (
                            <>
                                {currentUser.role === "user" && (
                                    <button onClick={() => handleRoleRequest("chef")} className="btn btn-primary px-8 rounded-2xl font-black">Be a Chef</button>
                                )}
                                {currentUser.role !== "admin" && (
                                    <button onClick={() => handleRoleRequest("admin")} className="btn bg-green-500 text-white px-8 rounded-2xl font-black border-none">Be an Admin</button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;