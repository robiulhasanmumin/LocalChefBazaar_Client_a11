import React from 'react'
import { Link, NavLink, Outlet } from 'react-router'
import Logo from '../component/Logo'
import { FaHeart, FaLuggageCart, FaRegUserCircle, FaUsers } from 'react-icons/fa'
import { MdConnectWithoutContact, MdOutlineReviews } from "react-icons/md";
import useRole from '../hooks/useRole';
import { IoIosStats } from 'react-icons/io';



const DashboardLayout = () => {

 const { role } = useRole();

  return (
    <div className='bg-gray-900 text-white'>

<div className="drawer  lg:drawer-open max-w-7xl mx-auto">
  <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content  ">
    {/* Navbar */}
    <nav className="navbar w-full bg-gray-800">
      <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
        {/* Sidebar toggle icon */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
      </label>
      <div className="px-4"><Logo></Logo></div>
    </nav>
    {/* Page content here */}

      {/* <h1 className='text-center text-5xl mt-20 font-bold'>Welcome To <br /> <span className='text-primary'>Local Chef Bazaar</span>  Dashboard </h1> */}
    <div className="p-4">
      <Outlet></Outlet>
    </div>
  </div>

  <div className="drawer-side is-drawer-close:overflow-visible bg-gray-800 text-white">
    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
    <div className="flex min-h-full flex-col items-start is-drawer-close:w-14 is-drawer-open:w-64">
      {/* Sidebar content here */}
      <ul className="menu w-full grow">
        {/* List item */}
        <li>
          <NavLink to="/" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-5"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
            <span className="is-drawer-close:hidden">Homepage</span>
          </NavLink>
        </li>

        {/* user */}
        <li>
          <NavLink to="/dashboard/profile" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="myProfile">
          <FaRegUserCircle className='text-xl' />
          <span className="is-drawer-close:hidden">My Profile</span>
          </NavLink>
        </li>

{/* user */}
{
   role === "user" && (
    <>  
        <li>
          <NavLink to="/dashboard/my-orders" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="myOrders">
          <FaLuggageCart className='text-xl' />
          <span className="is-drawer-close:hidden">My Orders</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/my-reviews" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="myReviews">
          <MdOutlineReviews className='text-xl' />
          <span className="is-drawer-close:hidden">My Reviews</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/favorites" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="myFavourites">
          <FaHeart className='text-xl' />
          <span className="is-drawer-close:hidden">My Favourites</span>
          </NavLink>
        </li>
    </>
   )
}

{/* Admin */}
{
  role === "admin" && (
    <>
        <li>
          <NavLink to="/dashboard/admin/request" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="manageRequest">
          <MdConnectWithoutContact className='text-xl' />
          <span className="is-drawer-close:hidden">Manage Request</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/admin/users" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="manageUsers">
          <FaUsers className='text-xl' />
          <span className="is-drawer-close:hidden">Manage Users</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/admin/statistic" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Statistics">
          <IoIosStats className='text-xl' />
          <span className="is-drawer-close:hidden">Statistics</span>
          </NavLink>
        </li>
    </>
  )
}

        {/* chef */}

      </ul>
    </div>
  </div>
</div>
    </div>

)
}

export default DashboardLayout