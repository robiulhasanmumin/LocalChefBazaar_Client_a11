import React from 'react'
import Logo from '../component/Logo'
import { Outlet } from 'react-router'
import authImg from '../assets/img1.jpg'

const AuthLayOut = () => {
  return (
    <div className='bg-gray-900 h-screen text-white'>
      <div className='max-w-7xl mx-auto'>
        <div className='py-5 px-5 md:px-0'>
           <Logo></Logo>
        </div>
            <div className='flex items-center'>
        <div className='flex-1'>
          <Outlet></Outlet>
        </div>
        <div className='flex-1 hidden md:flex'>
          <img src={authImg} alt="" />
        </div>
      </div>
      </div>
    </div>
  )
}

export default AuthLayOut