import React from 'react'
import { NavLink, Outlet } from 'react-router'
import Logo from '../component/Logo'
import { FaHeart, FaLuggageCart, FaRegUserCircle, FaUsers } from 'react-icons/fa'
import { MdConnectWithoutContact, MdOutlineReviews } from "react-icons/md";
import useRole from '../hooks/useRole';
import { IoIosStats } from 'react-icons/io';
import { GiHotMeal, GiMeal } from "react-icons/gi";
import { FaUsersViewfinder } from 'react-icons/fa6';
import useTitle from '../hooks/useTitle';

const DashboardLayout = () => {
  useTitle("Dashboard")
  const { role } = useRole();

  return (
     <div className='bg-base-100 min-h-screen text-base-content transition-colors duration-300'>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        
        <div className="drawer-content flex flex-col min-h-screen">
           <nav className="navbar w-full bg-base-200 shadow-sm lg:hidden sticky top-0 z-50">
            <div className='flex-none'>
              <label htmlFor="my-drawer-4" className="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </label>
            </div>
            <div className="flex-1 px-4">
              <Logo />
            </div>
          </nav>

          {/* Page content */}
          <main className="p-4 md:p-8 flex-grow">
            <div className='max-w-7xl mx-auto'>
              <Outlet />
            </div>
          </main>
        </div>

        {/* Sidebar */}
        <div className="drawer-side z-50">
          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
           <div className="menu p-4 w-72 min-h-full bg-base-200 text-base-content border-r border-base-300 flex flex-col">
            
            {/* Sidebar Logo */}
            <div className='mb-8 px-4 hidden lg:block'>
                <Logo />
            </div>

            <ul className="space-y-2">
              {/* Home */}
              <li>
                <NavLink to="/" end className={({ isActive }) => 
                  `flex items-center gap-3 p-3 rounded-lg transition-all ${isActive ? 'bg-primary text-white font-bold shadow-lg' : 'hover:bg-base-300'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-6"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                  <span>Homepage</span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/profile" className={({ isActive }) => 
                  `flex items-center gap-3 p-3 rounded-lg transition-all ${isActive ? 'bg-primary text-white font-bold shadow-lg' : 'hover:bg-base-300'}`}>
                  <FaRegUserCircle className='text-2xl' />
                  <span>My Profile</span>
                </NavLink>
              </li>

              <div className="divider opacity-50 my-4"></div>

              {/* User Role Links */}
              {role === "user" && (
                <>
                  <li><NavLink to="/dashboard/my-orders" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg ${isActive ? 'bg-primary text-white font-bold' : 'hover:bg-base-300'}`}><FaLuggageCart className='text-2xl' /> My Orders</NavLink></li>
                  <li><NavLink to="/dashboard/my-reviews" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg ${isActive ? 'bg-primary text-white font-bold' : 'hover:bg-base-300'}`}><MdOutlineReviews className='text-2xl' /> My Reviews</NavLink></li>
                  <li><NavLink to="/dashboard/favorites" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg ${isActive ? 'bg-primary text-white font-bold' : 'hover:bg-base-300'}`}><FaHeart className='text-2xl' /> My Favourites</NavLink></li>
                </>
              )}

              {/* Admin Role Links */}
              {role === "admin" && (
                <>
                  <li><NavLink to="/dashboard/admin/request" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg ${isActive ? 'bg-primary text-white font-bold' : 'hover:bg-base-300'}`}><MdConnectWithoutContact className='text-2xl' /> Manage Request</NavLink></li>
                  <li><NavLink to="/dashboard/admin/users" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg ${isActive ? 'bg-primary text-white font-bold' : 'hover:bg-base-300'}`}><FaUsers className='text-2xl' /> Manage Users</NavLink></li>
                  <li><NavLink to="/dashboard/admin/statistic" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg ${isActive ? 'bg-primary text-white font-bold' : 'hover:bg-base-300'}`}><IoIosStats className='text-2xl' /> Statistics</NavLink></li>
                </>
              )}

              {/* Chef Role Links */}
              {role === "chef" && (
                <>
                  <li><NavLink to="/dashboard/chef/create-meal" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg ${isActive ? 'bg-primary text-white font-bold' : 'hover:bg-base-300'}`}><GiHotMeal className='text-2xl' /> Create Meal</NavLink></li>
                  <li><NavLink to="/dashboard/chef/my-meals" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg ${isActive ? 'bg-primary text-white font-bold' : 'hover:bg-base-300'}`}><GiMeal className='text-2xl' /> My Meals</NavLink></li>
                  <li><NavLink to="/dashboard/chef/order-requests" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg ${isActive ? 'bg-primary text-white font-bold' : 'hover:bg-base-300'}`}><FaUsersViewfinder className='text-2xl' /> Order Requests</NavLink></li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout;