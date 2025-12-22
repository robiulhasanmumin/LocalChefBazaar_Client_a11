import React from 'react'
import { Link } from 'react-router'

const ErrorPage = () => {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-gray-900'>
      <h1 className='text-9xl font-bold text-primary'>404</h1>
      <p className='text-4xl text-gray-500'>Page Not Found</p>
      <Link to="/" className='btn btn-primary text-black mt-5'>Go Back To Home</Link>
    </div>  )
}

export default ErrorPage