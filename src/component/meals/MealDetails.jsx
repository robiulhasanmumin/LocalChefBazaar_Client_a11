import React, { useEffect, useState } from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router'
import { FaStar, FaUsers } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { IoIosTime } from "react-icons/io";


const MealDetails = () => {
  const {id} = useParams()
  const axiosSecure = useAxiosSecure()
  const [mealData, setMealData]  = useState({})
  const navigate = useNavigate()

  const {data:meals = []} = useQuery({
     queryKey: ['meals'],
     queryFn: async()=>{
      const res = await axiosSecure.get("/meals")
      return res.data
     }
  })

  const {foodName,chefName, foodImage,price,rating,ingredients,
deliveryArea,estimatedDeliveryTime,chefExperience,chefId } = mealData || {}

  useEffect(()=>{
    const singleMeal = meals.find(meal=>meal._id===id)
    setMealData(singleMeal)
  },[meals,id])


  const ingredient = ingredients?.map(i=>i).join(", ")



  return (
    <div className="flex flex-col md:flex-row gap-8 px-10 py-20 items-center">
      <div className="flex-1">
        <img
          src={foodImage}
          className="rounded-md h-[400px] w-full"
          alt=""
        />
      </div>
      <div className="flex-1 space-y-2">
        <p className="text-4xl font-bold">{foodName}</p>
        <p className='text-xl font-bold'>Price - <span className='text-primary text-2xl'>{price}/=</span></p>
        <p className="font-semibold text-lg">Made By -
          <span className="font-bold text-primary">  {chefName}</span>
        </p>
        <p className="font-semibold text-lg">Experience : {chefExperience}</p>
        <p className="font-semibold">ChefID : {chefId}</p>
        <p className="font-semibold text-lg">Ingredients : {ingredient} </p>

        <div className="flex gap-12 my-4">
          <div>
            <p className="text-xl font-bold">Rating</p>
            <p className="flex gap-2 text-lg items-center font-semibold">
              <FaStar className="text-amber-500" /> {rating}
            </p>
          </div>
          <div>
            <p className="text-xl font-bold">Delivery Area</p>
            <p className="flex gap-2 text-xl items-center font-semibold">
              <FaLocationDot /> {deliveryArea}
            </p>
          </div> 
          <div>
            <p className="text-xl font-bold">Delivery Time</p>
            <p className="flex gap-2 text-xl items-center font-semibold">
              <IoIosTime /> {estimatedDeliveryTime}
            </p>
          </div> 
        </div>


        <div className="flex gap-3">
          <button
            className="btn btn-primary text-black font-bold"
          >
            Order Now
          </button>
          {/* <button
            onClick={() => navigate(-1)}
            className="btn btn-primary text-black font-bold"
          >
            Go Back
          </button> */}
        </div>
      </div>
    </div>
  )
}

export default MealDetails