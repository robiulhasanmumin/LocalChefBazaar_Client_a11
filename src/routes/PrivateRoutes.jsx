import React from 'react'
import useAuth from '../hooks/useAuth'
import { Navigate, useLocation } from 'react-router'

const PrivateRoutes = ({children}) => {
  const {user,loading} = useAuth()
  const location = useLocation()
  if(loading){
    return <div>
      <span className="loading loading-infinity loading-xl"></span>
    </div>
  }
  if(!user){
    return <Navigate to="/login" state={location.pathname}></Navigate>
  }
  return children;
}

export default PrivateRoutes