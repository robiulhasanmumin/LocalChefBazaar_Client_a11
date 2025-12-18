import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Meal from "./Meal";

const AllMeals = () => {
  const [sort,setSort] = useState('')
    const axiosSecure = useAxiosSecure()

  const {data:meals = []} = useQuery({
     queryKey: ['meals'],
     queryFn: async()=>{
      const res = await axiosSecure.get("/meals")
      return res.data
     }
  })

const sortData = [...meals].sort((a,b)=>{
    if(sort==='asc'){
      return a.price - b.price
    }
    else if(sort === 'desc'){
      return b.price - a.price
    }
})

  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-primary my-10">
        All Meals
      </h1>
      <div className="flex items-center gap-2 text-lg font-semibold lg:px-10">
        <p >Sort By Price: </p>
        {/* sort */}
        <select
          defaultValue="Server location" 
          onChange={(e)=>setSort(e.target.value)}
          className="select select-neutral w-[200px] bg-gray-800"
        >
          <option value='desc'>High to Low</option>
          <option value='asc'>Low to High</option>
        </select>
      </div>


      <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 mt-10 lg:px-10">
        {
          sortData.map(meal=><Meal meal={meal} key={meal._id}></Meal>)
        }
      </div>


      {/* pagination */}
      <div className="join flex justify-center my-10">
  <input
    className="join-item btn btn-square text-black"
    type="radio"
    name="options"
    aria-label="1"
    checked="checked" />
  <input className="join-item btn btn-square" type="radio" name="options" aria-label="2" />
  <input className="join-item btn btn-square" type="radio" name="options" aria-label="3" />
  <input className="join-item btn btn-square" type="radio" name="options" aria-label="4" />
</div>


    </div>
  );
};

export default AllMeals;
