import React from 'react'
import { FaStar } from 'react-icons/fa'
import { Link } from 'react-router'
import { FaLocationDot } from "react-icons/fa6";


const Meal = ({meal}) => {
  const {chefName,chefId,foodImage,foodName,price,rating,deliveryArea} = meal
  return (
<div className="border-2 border-gray-300 rounded-2xl p-5">
  {/* content */}
    <img src={foodImage} className='w-full h-[220px] rounded-2xl' alt="" />
    <div className='flex justify-between items-center mt-3'>
    <p className='text-2xl font-bold'>{foodName} </p>
    <span className='text-2xl text-primary font-bold'>{price}/=</span>
    </div>

      <p className='text-[18px] my-2'>Made By - <span className='text-primary font-bold'> {chefName} </span><span className='font-semibold'>({chefId})</span></p> 

    <div className='flex justify-between mt-2'>
      <p className='flex gap-1 items-center text-gray-500 font-bold text-[18px]'><FaStar className='text-amber-500' /> {rating}</p>

      <p className="flex gap-1 items-center text-[18px] font-semibold "><FaLocationDot /> {deliveryArea}</p>
    </div>
      <Link className='btn btn-primary text-black font-bold w-full mt-3' to={`/partnerDetails` }>View Profile</Link>
</div>
  )
}

export default Meal