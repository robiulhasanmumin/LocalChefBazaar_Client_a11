import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Meal from "./Meal";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const AllMeals = () => {
  const [sort,setSort] = useState('')
  const [currentPage,setCurrentPage] = useState(1)
    const axiosSecure = useAxiosSecure()

  const {data:meals = []} = useQuery({
     queryKey: ['meals'],
     queryFn: async()=>{
      const res = await axiosSecure.get("/meals")
      return res.data
     }
  })

  // sort
const sortData = [...meals].sort((a,b)=>{
    if(sort==='asc'){
      return a.price - b.price
    }
    else if(sort === 'desc'){
      return b.price - a.price
    }
})

// pagination
const mealPerPage = 9;
const indexOfLast = currentPage * mealPerPage;
const indexOfFirst = indexOfLast - mealPerPage;
const totalPage = Math.ceil(meals.length / mealPerPage)
const pagination = sortData.slice(indexOfFirst,indexOfLast) 

  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-primary my-10">
        All Meals
      </h1>
      <div className="flex items-center gap-2 text-lg font-semibold lg:px-10">
        <p >Sort By Price : </p>
        {/* sort */}
        <select
          defaultValue="Server location" 
          onChange={(e)=>setSort(e.target.value)}
          className="select select-neutral w-[200px] bg-gray-800"
        >
          <option value="">Default</option>
          <option value='desc'>High to Low</option>
          <option value='asc'>Low to High</option>
        </select>
      </div>


      <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mt-10 lg:px-10">
        {
          pagination.map(meal=><Meal meal={meal} key={meal._id}></Meal>)
        }
      </div>


      {/* pagination */}
      <div className="join flex justify-center my-10">
      {
          currentPage > 1 &&
          <button className="btn" onClick={()=>setCurrentPage(currentPage - 1)}><FaArrowLeft></FaArrowLeft></button>
        }

        {
          [...Array(totalPage).keys()].map(number=><button key={number}
            onClick={()=>setCurrentPage(number+1)}
            className={`btn btn-square ${currentPage === number+1 ? "btn-primary text-black" : ""}`}
            >
              {number+1}
            </button>
          )
        }
        {
          currentPage < totalPage &&
          <button className="btn" onClick={()=>setCurrentPage(currentPage + 1)}><FaArrowRight></FaArrowRight></button>
        }

       </div>


    </div>
  );
};

export default AllMeals;
