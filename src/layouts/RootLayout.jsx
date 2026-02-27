// import React from 'react'
// import Navbar from '../component/Navbar'
// import { Outlet } from 'react-router'
// import Footer from '../component/Footer'
// import ScrollTop from '../component/ScrollTop'

// const RootLayout = () => {
//   return (
//     <div className='bg-gray-900 text-white'>
//       <div className='max-w-7xl mx-auto'>

//       <Navbar></Navbar>
//       <ScrollTop></ScrollTop>
//       <div className='p-6 lg:p-0'>
//       <Outlet></Outlet>
//       </div>
//       <Footer></Footer>
//       </div>
//     </div>
//   )
// }

// export default RootLayout


import React from 'react'
import Navbar from '../component/Navbar'
import { Outlet } from 'react-router'
import Footer from '../component/Footer'
import ScrollTop from '../component/ScrollTop'

const RootLayout = () => {
  return (
     <div className='bg-base-100 text-base-content min-h-screen transition-colors duration-300'>
      
       <Navbar />

      <div className='max-w-7xl mx-auto'>
        <ScrollTop />
        
         <div className='p-6 lg:p-0 min-h-[calc(100vh-300px)]'>
          <Outlet />
        </div>
        
        <Footer />
      </div>
    </div>
  )
}

export default RootLayout;