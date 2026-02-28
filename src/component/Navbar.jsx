import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import { Link, NavLink } from 'react-router';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import { FaSun, FaMoon, FaUserCircle, FaSignOutAlt, FaColumns, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.querySelector("html").setAttribute("data-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const handleLogOut = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#FA812F",
            confirmButtonText: "Yes, LogOut!",
        }).then((result) => {
            if (result.isConfirmed) {
                logOut().then(() => {
                    Swal.fire({ title: "Logged Out!", icon: "success", timer: 1500, showConfirmButton: false });
                });
            }
        });
    };

    const navLinkStyles = ({ isActive }) =>
        `relative px-3 py-2 transition-all duration-300 font-semibold hover:text-primary ${
            isActive ? "text-primary after:content-[''] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:bg-primary" : "text-base-content/80"
        }`;

    const links = (
        <>
            <li><NavLink to="/" className={navLinkStyles}>Home</NavLink></li>
            <li><NavLink to="/all-meals" className={navLinkStyles}>All Meals</NavLink></li>
            <li><NavLink to="/about" className={navLinkStyles}>About</NavLink></li>
            <li><NavLink to="/contact" className={navLinkStyles}>Contact</NavLink></li>
            {user && (
                <>
                    <li><NavLink to="/dashboard/profile" className={navLinkStyles}>Dashboard</NavLink></li>
                    <li><NavLink to="/blog" className={navLinkStyles}>Blog</NavLink></li>
                </>
            )}
        </>
    );

    return (
        <div className="sticky top-0 z-[100] w-full border-b border-base-content/5 bg-base-100/80 backdrop-blur-md">
            <div className="navbar max-w-7xl mx-auto px-4 md:px-6">
                
                {/* --- Navbar Start --- */}
                <div className="navbar-start w-auto">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden mr-2 p-0 px-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-2xl bg-base-100 rounded-2xl w-64 border border-base-content/5 space-y-2">
                            {links}
                            
                            {/* Mobile Only Login/Register */}
                            {!user && (
                                <div className="flex flex-col gap-2 pt-4 border-t border-base-content/10 lg:hidden">
                                    <li>
                                        <Link to="/login" className="btn btn-primary btn-sm text-white w-full">
                                            <FaSignInAlt /> Login
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/register" className="btn btn-outline btn-primary btn-sm w-full">
                                            <FaUserPlus /> Register
                                        </Link>
                                    </li>
                                </div>
                            )}
                        </ul>
                    </div>
                    <Logo />
                </div>

                {/* --- Navbar End --- */}
                <div className="navbar-end flex-1 gap-2 sm:gap-4">
                    
                    {/* Desktop Menu Links */}
                    <div className="hidden lg:flex gap-5">
                        <ul className="menu menu-horizontal px-1 gap-1">
                            {links}
                        </ul>
                    </div>

                    {/* Theme Toggle */}
                    <button 
                        onClick={toggleTheme} 
                        className="btn btn-ghost btn-circle btn-sm sm:btn-md hover:bg-primary/10 transition-transform active:scale-90"
                    >
                        {theme === "light" ? <FaMoon className="text-xl md:text-2xl" /> : <FaSun className="text-yellow-400 text-xl md:text-2xl" />}
                    </button>

                    {user ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="avatar hover:opacity-90 transition-opacity cursor-pointer">
                                <div className="w-9 sm:w-10 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src={user?.photoURL} alt="User" />
                                </div>
                            </div>
                            <ul tabIndex={0} className="mt-4 z-[1] p-2 shadow-2xl menu menu-sm dropdown-content bg-base-100 rounded-2xl w-60 border border-base-content/5">
                                <div className="px-4 py-3 border-b border-base-content/5 mb-2">
                                    <p className="font-bold text-base-content truncate">{user?.displayName}</p>
                                    <p className="text-xs text-base-content/60 truncate">{user?.email}</p>
                                </div>
                                <li><Link to="/dashboard/profile" className="py-2"><FaUserCircle /> Profile</Link></li>
                                <li><Link to="/dashboard/profile" className="py-2"><FaColumns /> Settings</Link></li>
                                <div className="divider my-0 opacity-20"></div>
                                <li><button onClick={handleLogOut} className="py-2 text-error font-semibold"><FaSignOutAlt /> Logout</button></li>
                            </ul>
                        </div>
                    ) : (
                        /* Desktop Only Login/Register */
                        <div className="hidden lg:flex items-center gap-2">
                            <Link to="/login" className="btn btn-primary px-6 rounded-xl text-white border-none shadow-md">
                                Login
                            </Link>
                            <Link to="/register" className="btn btn-outline px-6 rounded-xl hover:bg-primary hover:border-primary hover:text-white transition-all ">
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;