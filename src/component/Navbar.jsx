import React from 'react'
import Logo from './Logo'
import { Link, NavLink } from 'react-router'
import useAuth from '../hooks/useAuth'
import { FaRegUserCircle } from 'react-icons/fa'
import { IoMdLogOut } from 'react-icons/io'
import Swal from 'sweetalert2'

const Navbar = () => {
    const {user,logOut} = useAuth()

    const links = <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/all-meals">All Meals</NavLink></li>
      {
        user &&
        <>
      <li><NavLink to="/dashboard/profile">Dashboard</NavLink></li>
        </>
      }

  </>


  const handleLogOut=()=>{
          Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "red",
  cancelButtonColor: "green",
  confirmButtonText: "LogOut!"
}).then((result) => {
  if (result.isConfirmed) {
        logOut()
    .then(()=>{
      Swal.fire({
        title: "Loged Out Successfully!",
        icon: "success"
      });
    })
    .catch(err=>alert(err))

  }
});

  }


  return (
<div className="navbar shadow-md shadow-gray-800 lg:px-5">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow bg-gray-800">
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
    {
      user ? 

      <>
   <Link to="/dashboard/profile" className="text-blue-500">  <img src={user?.photoURL} className="cursor-pointer w-[45px] h-[45px] rounded-full mr-4"></img></Link>
   <Link to="/" onClick={handleLogOut} className="btn bg-red-500 text-white border-0 shadow-none">LogOut</Link>
      </>
      :

          <>
    <Link to="/login" className="btn btn-primary text-black border-0 font-bold">Login</Link>
    <Link to="/register" className="btn btn-primary  text-black border-0 ml-2 mr-2 font-bold">Register</Link>

          </>
    }


  </div>
</div>

)
}

export default Navbar