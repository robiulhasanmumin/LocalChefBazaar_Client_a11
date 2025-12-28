import React from 'react'
import useAxiosSecure from '../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import { FaStar } from 'react-icons/fa'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/autoplay'
import { Autoplay } from 'swiper/modules'

const CustomerReviews = () => {
  const axiosSecure = useAxiosSecure()

  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews")
      return res.data
    }
  })

  return (
    <div className='mb-10 lg:px-10'>
      <h1 className='text-3xl font-bold text-primary text-center mt-20'>
        Customer Reviews
      </h1>

      <div className='mt-10'>
        <Swiper
          spaceBetween={20}
          slidesPerView={1} 
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          modules={[Autoplay]}
          className="mySwiper"
        >
          {reviews.map(review => (
            <SwiperSlide key={review._id} className="pb-5">
              <div className='border-2 rounded-2xl p-5 h-full flex flex-col justify-between shadow-lg'>
                <div>
                  <div className='flex gap-4 items-center'>
                    <img 
                      src={review.reviewerImage} 
                      className='h-12 w-12 rounded-full object-cover border-2 border-primary' 
                      alt={review.reviewerName} 
                    />
                    <div>
                      <p className='font-semibold text-white'>{review.reviewerName}</p>
                      <p className='text-xs text-gray-400'>{review.date}</p>
                    </div>
                  </div>
                  <p className='mt-4 text-gray-300 italic text-sm md:text-base'>
                    "{review.comment}"
                  </p>
                </div>

                <div className='flex justify-end items-center mt-2'>
                  <p className='flex gap-1 items-center text-lg font-bold'>
                    <FaStar className='text-primary' /> {review.rating}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default CustomerReviews;