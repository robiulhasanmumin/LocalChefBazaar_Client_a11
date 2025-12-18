import React from 'react'
import useAxiosSecure from '../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import { FaStar } from 'react-icons/fa'

const CustomerReviews = () => {
      const axiosSecure = useAxiosSecure()

  const {data:reviews = []} = useQuery({
     queryKey: ['reviews'],
     queryFn: async()=>{
      const res = await axiosSecure.get("/reviews")
      return res.data
     }
  })

  return (
    <div className='mb-10 lg:px-10'>
      <h1 className='text-3xl font-bold text-primary text-center mt-20'>Customer Reviews</h1>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-10'>
        {
          reviews.map(review=><div className='border-2 rounded-2xl p-4' key={review._id}>
            <div className='flex gap-5 items-center'>
                <img src={review.reviewerImage} className='h-10 w-10 rounded-full' alt="" />
              <div>
                <p className='font-semibold'>{review.reviewerName}</p>
                <p className='text-sm text-gray-500'>{review.date}</p>
              </div>
            </div>
            <div className='flex justify-between items-center'>

            <p className='mt-3'>- {review.comment}</p>
            <p className='flex gap-1 items-center text-lg font-semibold'> <FaStar className='text-primary'></FaStar> {review.rating}</p>
            </div>
          </div>)
        }
      </div>
    </div>
  )
}

export default CustomerReviews