import React from 'react'
import img1 from "../assets/img6.jpg"
import img2 from "../assets/53094793.png"
import img3 from "../assets/img2.jpg"
import img4 from "../assets/img3.JPG"

const BeastMeal = () => {
  return (
    <div className='mb-10 lg:px-10'>
    <h1 className='text-3xl font-bold text-primary text-center mt-20'>Our Best Meals</h1>

    <div className='flex flex-col md:flex-row gap-5 mt-10 mb-20'>
       <div className='flex-1'>
        <img className='h-[220px] w-full border-2 rounded-2xl' src={img1} alt="" />
       </div>
       <div className='flex-1'>
        <img className='h-[220px] w-full border-2 rounded-2xl' src={img2} alt="" />
       </div>
       <div className='flex-1'>
        <img className='h-[220px] w-full border-2 rounded-2xl' src={img3} alt="" />
       </div>
       <div className='flex-1'>
        <img className='h-[220px] w-full border-2 rounded-2xl' src={img4} alt="" />
       </div>
    </div>

<div>

</div>
    </div>
  )
}

export default BeastMeal