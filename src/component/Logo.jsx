import React from 'react'
import { Link } from 'react-router'
import logo from "../assets/burger.png"

const Logo = () => {
  return (
    <Link 
      className='flex gap-2 items-center group transition-transform duration-300 active:scale-95' 
      to="/"
    >
       <img 
        className='h-5 w-5 md:h-10 md:w-10 object-contain drop-shadow-md group-hover:rotate-12 transition-transform' 
        src={logo} 
        alt="LocalChefBazaar Logo" 
      />

       <p className='text-xl md:text-2xl font-extrabold tracking-tight text-primary'>
        LocalChef<span className='text-base-content'>Bazaar</span>
      </p>
    </Link>
  )
}

export default Logo;