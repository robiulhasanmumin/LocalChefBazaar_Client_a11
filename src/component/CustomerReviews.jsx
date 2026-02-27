import React from 'react'
import useAxiosSecure from '../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import { FaStar, FaQuoteLeft } from 'react-icons/fa'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper/modules'
import { motion } from 'framer-motion'

const CustomerReviews = () => {
  const axiosSecure = useAxiosSecure()

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews")
      return res.data
    }
  })

  if (isLoading) return <div className="h-40 flex justify-center items-center"><span className="loading loading-dots loading-lg text-primary"></span></div>

  return (
    <section className='py-20 bg-base-100 transition-colors duration-300 overflow-hidden'>
      <div className='max-w-7xl mx-auto px-6 lg:px-10'>
        
        {/* সেকশন হেডার */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary font-bold uppercase tracking-widest text-sm"
          >
            Testimonials
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className='text-4xl md:text-5xl font-extrabold mt-2 text-base-content'
          >
            What Our Foodies Say
          </motion.h2>
          <div className="w-20 h-1.5 bg-primary mx-auto mt-4 rounded-full"></div>
        </div>

        {/* রিভিউ স্লাইডার */}
        <div className='mt-10'>
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            loop={reviews.length > 3}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            modules={[Autoplay, Pagination]}
            className="pb-14"
          >
            {reviews.map(review => (
              <SwiperSlide key={review._id}>
                <div className='bg-base-200 p-8 rounded-[2rem] h-full flex flex-col justify-between border border-base-content/5 shadow-xl hover:shadow-2xl transition-all duration-300 relative group'>
                  
                  {/* কোট আইকন */}
                  <FaQuoteLeft className="absolute top-6 right-8 text-primary/10 text-5xl group-hover:text-primary/20 transition-colors" />

                  <div className="relative z-10">
                    {/* রেটিং স্টারস */}
                    <div className='flex gap-1 mb-4'>
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < review.rating ? "text-yellow-500" : "text-gray-300"} />
                      ))}
                    </div>

                    <p className='text-base-content/80 italic leading-relaxed mb-8'>
                      "{review.comment}"
                    </p>
                  </div>

                  {/* রিভিউয়ার প্রোফাইল */}
                  <div className='flex gap-4 items-center border-t border-base-content/10 pt-6'>
                    <div className="avatar">
                      <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={review.reviewerImage} alt={review.reviewerName} />
                      </div>
                    </div>
                    <div className="overflow-hidden">
                      <p className='font-bold text-base-content text-lg truncate'>{review.reviewerName}</p>
                      <p className='text-xs text-base-content/50 uppercase tracking-tighter'>{review.date}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default CustomerReviews;