import React from 'react'
import useAuth from '../hooks/useAuth'
import { Navigate, useLocation } from 'react-router'

const PrivateRoutes = ({children}) => {
  const {user,loading} = useAuth()
  const location = useLocation()
  if(loading){
    return <div className='w-full mx-auto bg-gray-900 text-primary h-screen text-center py-10'>
      <span className="loading loading-infinity loading-xl w-[80px] text-primary"></span>
    </div>
  }
  if(!user){
    return <Navigate to="/login" state={location.pathname}></Navigate>
  }
  return children;
}

export default PrivateRoutes