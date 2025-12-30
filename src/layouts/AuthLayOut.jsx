import React from 'react'
import Logo from '../component/Logo'
import { Outlet } from 'react-router'
import authImg from '../assets/img1.jpg'
import ScrollTop from '../component/ScrollTop'

const AuthLayOut = () => {
  return (
    <div className='bg-gray-900 min-h-screen overflow-x-hidden text-white'>
      <div className='max-w-7xl mx-auto'>
        <div className='py-5 px-5 md:px-0'>
           <Logo></Logo>
           <ScrollTop></ScrollTop>
        </div>
            <div className='flex items-center'>
        <div className='flex-1'>
          <Outlet></Outlet>
        </div>
        <div className='flex-1 h-[100vh] overflow-hidden hidden md:flex'>
          <img src={authImg} className='w-full h-full object-cover' alt="" />
        </div>
      </div>
      </div>
    </div>
  )
}

export default AuthLayOut