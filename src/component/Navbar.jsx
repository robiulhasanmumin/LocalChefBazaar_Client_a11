import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import { Link, NavLink } from 'react-router';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import { FaSun, FaMoon, FaUserCircle, FaSignOutAlt, FaColumns } from 'react-icons/fa';

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
            text: "You will be logged out of your session!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#FA812F",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, LogOut!",
            background: theme === "dark" ? "#1d232a" : "#fff",
            color: theme === "dark" ? "#fff" : "#000"
        }).then((result) => {
            if (result.isConfirmed) {
                logOut().then(() => {
                    Swal.fire({ title: "Logged Out!", icon: "success", timer: 1500, showConfirmButton: false });
                });
            }
        });
    };

     const navLinkStyles = ({ isActive }) =>
        `relative px-3 py-2 transition-all duration-300 font-medium hover:text-primary ${
            isActive ? "text-primary after:content-[''] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:bg-primary" : "text-base-content/80"
        }`;

    const links = (
        <>
            <li><NavLink to="/" className={navLinkStyles}>Home</NavLink></li>
            <li><NavLink to="/all-meals" className={navLinkStyles}>All Meals</NavLink></li>
            <li><NavLink to="/about" className={navLinkStyles}>About</NavLink></li>
            {user &&
             <>
              <li><NavLink to="/dashboard/profile" className={navLinkStyles}>Dashboard</NavLink></li>
              <li><NavLink to="/blog" className={navLinkStyles}>Blog</NavLink></li>
             </>

             
            }
        </>
    );

return (
    <div className="sticky top-0 z-[100] w-full border-b border-base-content/5 bg-base-100/80 backdrop-blur-md transition-all duration-300">
         <div className="navbar max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-2 lg:grid-cols-3 items-center min-h-[4.5rem]">
            
            {/* --- Start: Hamburger + Logo --- */}
            <div className="flex items-center gap-1 justify-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden p-1 h-10 w-10 min-h-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-2xl bg-base-100 rounded-2xl w-56 border border-base-content/5 font-semibold">
                        {links}
                    </ul>
                </div>
                <Logo />
            </div>

            {/* --- Center: Desktop Menu   --- */}
            <div className="hidden lg:flex justify-center items-center">
                <ul className="flex items-center gap-1">
                    {links}
                </ul>
            </div>

            {/* --- End: Theme + Auth   --- */}
            <div className="flex items-center justify-end gap-2 sm:gap-4">
                {/* Theme Toggle */}
                <button 
                    onClick={toggleTheme} 
                    className="btn btn-ghost btn-circle btn-sm sm:btn-md hover:bg-primary/10 transition-transform active:scale-90"
                >
                    {theme === "light" ? <FaMoon className="text-2xl" /> : <FaSun className="text-yellow-400 text-2xl" />}
                </button>

                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="avatar hover:opacity-90 transition-opacity">
                            <div className="w-9 sm:w-10 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={user?.photoURL} alt="User profile" />
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-4 z-[1] p-2 shadow-2xl menu menu-sm dropdown-content bg-base-100 rounded-2xl w-60 border border-base-content/5">
                            <div className="px-4 py-3 border-b border-base-content/5 mb-2">
                                <p className="font-bold text-base-content truncate">{user?.displayName}</p>
                                <p className="text-xs text-base-content/60 truncate">{user?.email}</p>
                            </div>
                            <li><Link to="/dashboard/profile" className="py-2"><FaUserCircle /> Profile</Link></li>
                            <li><Link to="/dashboard/my-orders" className="py-2"><FaColumns /> Dashboard</Link></li>
                            <div className="divider my-0 opacity-20"></div>
                            <li><button onClick={handleLogOut} className="py-2 text-error font-semibold"><FaSignOutAlt /> Logout</button></li>
                        </ul>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <Link to="/login" className="btn btn-primary btn-xs sm:btn-sm md:btn-md px-3 sm:px-6 text-white border-none shadow-md">
                            Login
                        </Link>
                        <Link to="/register" className="btn btn-outline btn-primary btn-xs sm:btn-sm md:btn-md px-3 sm:px-6 hidden sm:flex">
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </div>
    </div>
);};

export default Navbar;