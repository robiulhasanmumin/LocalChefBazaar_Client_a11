import React from 'react'
import Logo from './Logo'
import { Link, NavLink } from 'react-router'

const Navbar = () => {
    const links = <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/all-meals">All Meals</NavLink></li>
      {/* {
        user &&
        <>
      <li><NavLink to="/createPartnerProfile">Create Partner Profile</NavLink></li>
      <li><NavLink to="/myConnection">My Connections </NavLink></li>
        </>
      } */}

  </>

  return (
<div className="navbar shadow-md shadow-gray-800 lg:px-5">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          {links}
      </ul>
    </div>
    <Logo></Logo>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {links}
    </ul>
  </div>

  <div className="navbar-end">
    {/* {
      user ? 

      <>
          <div className="dropdown dropdown-end">
  <img src={user?.photoURL} tabIndex={0} role="button" className="cursor-pointer w-[45px] h-[45px] rounded-full mr-4"></img>
  <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
    <li> <Link to="/myProfile" className="text-blue-500"><FaRegUserCircle />
 My Profile</Link></li>
    <li> <Link to="/" onClick={handleLogOut} className="text-red-500"><MdLogout /> LogOut</Link></li>
  </ul>
</div>
      </>
      :

          <> */}
    <Link to="/login" className="btn bg-primary text-black border-0">Login</Link>
    <Link to="/register" className="btn bg-primary  text-black border-0 ml-2 mr-2">Register</Link>

          {/* </>
    }
 */}

  </div>
</div>

)
}

export default Navbar