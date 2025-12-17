import React from 'react'
import Navbar from '../component/Navbar'
import { Outlet } from 'react-router'
import Footer from '../component/Footer'

const RootLayout = () => {
  return (
    <div className='bg-gray-900 h-screen text-white'>
      <div className='max-w-7xl mx-auto'>

      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
      </div>
    </div>
  )
}

export default RootLayout