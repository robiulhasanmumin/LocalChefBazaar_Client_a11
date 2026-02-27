// import React from 'react'
// import {useQuery} from "@tanstack/react-query"
// import useAxiosSecure from '../../hooks/useAxiosSecure'
// import Meal from './Meal'
// import { Link } from 'react-router'
// import { FaArrowRight } from 'react-icons/fa'

// const DailyMeals = () => {
//   const axiosSecure = useAxiosSecure()

//   const {data:meals = []} = useQuery({
//      queryKey: ['meals'],
//      queryFn: async()=>{
//       const res = await axiosSecure.get("/meals")
//       return res.data
//      }
//   })
//   return (
//     <div>
//       <h1 className='text-3xl font-bold text-primary text-center mt-12'>Daily Meals</h1>
      
//       <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mt-10 lg:px-10">
//         {
//           meals.slice(0, 6).map(meal=><Meal meal={meal} key={meal._id}></Meal>)
//         }
//       </div>


//       <div className='text-center mt-10'>
//         <Link className='btn btn-primary text-black font-bold' to="/all-meals">All Meals <FaArrowRight /></Link>
//       </div>
      
//     </div>
//   )
// }

// export default DailyMeals

import React from 'react'
import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from '../../hooks/useAxiosSecure'
import Meal from './Meal'
import { Link } from 'react-router'
import { FaArrowRight } from 'react-icons/fa'
import { motion } from 'framer-motion'

const DailyMeals = () => {
  const axiosSecure = useAxiosSecure()

  const { data: meals = [], isLoading } = useQuery({
    queryKey: ['meals'],
    queryFn: async () => {
      const res = await axiosSecure.get("/meals")
      return res.data
    }
  })

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
    <section className="py-16 px-4 md:px-10">
       <div className="text-center mb-12 space-y-2">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-extrabold text-primary"
        >
          Daily Specials
        </motion.h2>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        <p className="text-base-content/70 max-w-lg mx-auto pt-2 italic">
          Handpicked delicious meals prepared fresh every day by our expert local chefs.
        </p>
      </div>

       <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 md:gap-8 gap-4">
        {
          meals.slice(0, 6).map((meal, index) => (
            <motion.div
              key={meal._id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Meal meal={meal} />
            </motion.div>
          ))
        }
      </div>

       <div className='flex justify-center mt-16'>
        <Link 
          className='btn btn-primary btn-lg text-white font-bold px-10 shadow-lg shadow-primary/20 hover:shadow-primary/40 group transition-all duration-300' 
          to="/all-meals"
        >
          Explore All Meals 
          <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>
    </section>
  )
}

export default DailyMeals