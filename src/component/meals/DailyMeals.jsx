import React from 'react'
import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from '../../hooks/useAxiosSecure'
import Meal from './Meal'
import { Link } from 'react-router'
import { FaArrowRight } from 'react-icons/fa'
import { motion } from 'framer-motion'

const DailyMeals = () => {
  const axiosSecure = useAxiosSecure()

  const { data: mealData = { meals: [] }, isLoading } = useQuery({
    queryKey: ['meals'],
    queryFn: async () => {
      const res = await axiosSecure.get("/meals")
      return res.data
    }
  })
  const meals = Array.isArray(mealData?.meals) ? mealData.meals : []

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 px-6 lg:px-10">
        {[1, 2, 3, 4, 5, 6].map(n => (
          <div key={n} className="flex flex-col gap-4 w-full h-80 bg-base-200 animate-pulse rounded-2xl"></div>
        ))}
      </div>
    )
  }

  return (
    <section className="py-24 px-4 md:px-10 bg-base-100">
       <div className="text-center mb-16 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h4 className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4">Freshly Prepared</h4>
          <h2 className="text-4xl md:text-5xl font-black text-base-content leading-tight">
            Daily <span className="text-primary decoration-1 underline-offset-8">Specials</span>
          </h2>
          <p className="text-base-content/60 mt-6 text-lg leading-relaxed">
            Handpicked delicious meals prepared fresh every day by our expert local chefs.
          </p>
        </motion.div>
        
         <div className="flex justify-center mt-6">
            <span className="w-16 h-1 bg-primary rounded-full inline-block"></span>
            <span className="w-4 h-1 bg-primary/30 rounded-full inline-block mx-1"></span>
            <span className="w-2 h-1 bg-primary/20 rounded-full inline-block"></span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {
          meals.slice(0, 4).map((meal, index) => (
            <motion.div
              key={meal._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
            >
              <Meal meal={meal} />
            </motion.div>
          ))
        }
      </div>

      <div className='flex justify-center mt-20'>
        <motion.div
           whileHover={{ scale: 1.05 }}
           whileTap={{ scale: 0.95 }}
        >
          <Link 
            className='btn btn-primary rounded-2xl btn-lg px-12 shadow-xl shadow-primary/20 hover:shadow-primary/40 group transition-all duration-300 font-black' 
            to="/all-meals"
          >
            Explore All Meals 
            <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default DailyMeals