import React from 'react'
import {useQuery} from "@tanstack/react-query"
import useAxiosSecure from '../../hooks/useAxiosSecure'
import Meal from './Meal'
import { Link } from 'react-router'
import { FaArrowRight } from 'react-icons/fa'

const DailyMeals = () => {
  const axiosSecure = useAxiosSecure()

  const {data:meals = []} = useQuery({
     queryKey: ['meals'],
     queryFn: async()=>{
      const res = await axiosSecure.get("/meals")
      return res.data
     }
  })
  return (
    <div>
      <h1 className='text-3xl font-bold text-primary text-center mt-12'>Daily Meals</h1>
      
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mt-10 lg:px-10">
        {
          meals.slice(0, 6).map(meal=><Meal meal={meal} key={meal._id}></Meal>)
        }
      </div>


      <div className='text-center mt-10'>
        <Link className='btn btn-primary text-black font-bold' to="/all-meals">All Meals <FaArrowRight /></Link>
      </div>
      
    </div>
  )
}

export default DailyMeals