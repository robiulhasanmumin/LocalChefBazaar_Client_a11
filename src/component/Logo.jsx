import React from 'react'
import { IoFastFood } from 'react-icons/io5'
import { Link } from 'react-router'
import logo from "../assets/burger.png"

const Logo = () => {
  return (
  
    <Link className='flex gap-1.5 items-center' to="/">
      <img className='h-8 w-8 hidden md:flex' src={logo} alt="" />
      <p className='text-xl font-bold text-yellow-500'>LocalChefBazaar</p>
    </Link>
  )
}

export default Logo