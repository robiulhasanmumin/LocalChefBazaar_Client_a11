import React, { useEffect, useState } from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate, useParams } from 'react-router'
import { FaRegHeart, FaStar, FaUsers } from 'react-icons/fa'
import { FaBowlFood, FaLocationDot } from 'react-icons/fa6'
import { IoIosTime } from "react-icons/io";
import useAuth from '../../hooks/useAuth'
import Swal from 'sweetalert2'


const MealDetails = () => {
  const {id} = useParams()
      const {user} = useAuth()
  const axiosSecure = useAxiosSecure()
  const [mealData, setMealData]  = useState({})
  const [comment, setComment] = useState('')
  const [ratings, setRatings] = useState(5)

  const {data:meals = []} = useQuery({
     queryKey: ['meals'],
     queryFn: async()=>{
      const res = await axiosSecure.get("/meals")
      return res.data
     }
  })
  // reviews
    const {data:reviews = [], refetch} = useQuery({
     queryKey: ['reviews',id],
     queryFn: async()=>{
      const res = await axiosSecure.get(`/reviews?foodId=${id}`)
      return res.data
     }
  })



  const {foodName,chefName, foodImage,price,rating,ingredients,
deliveryArea,estimatedDeliveryTime,chefExperience,chefId } = mealData || {}


useEffect(() => {
  if (meals.length > 0) {
    const singleMeal = meals.find(meal => meal._id === id)
    if (singleMeal) {
      setMealData(singleMeal)
    }
  }
}, [meals, id])

  const ingredient = ingredients?.map(i=>i).join(", ")



  // reviews
  const handleReviewSubmit = async (e) => {
  e.preventDefault();

  const reviewInfo = {
    foodId: id,
    reviewerName: user.displayName,
    reviewerImage: user.photoURL,
    email:user.email,
    foodName:foodName,
    rating:ratings,
    comment:comment,
    date:new Date(),
  };

  await axiosSecure.post("/reviews", reviewInfo);

  Swal.fire("Success!", "Review submitted successfully!", "success");

  setComment("");
  setRatings(5);

  refetch(); 
};

// favourite
const handleAddFavorite = async () => {
  const favoriteInfo = {
    userEmail: user.email,
    mealId: id,
    mealName: foodName,
    chefId:chefId,
    chefName:chefName,
    price:price,
  };

  const res = await axiosSecure.post("/favourites", favoriteInfo);

  if (res.data.message === "already exists") {
    Swal.fire("Oops!", "Already in favorites", "info");
  } else {
    Swal.fire("Added!", "Meal added to favorites", "success");
  }
};


  return (

    <div>
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


        <div className="flex gap-3 mt-2">
          <Link to={`/order-meal/${id}`}
            className="btn btn-primary text-black font-bold"
          >
           <FaBowlFood />  Order Now
          </Link>
          <button onClick={handleAddFavorite}
            className="btn btn-primary text-black font-bold"
          >
           <FaRegHeart />  Add to Favorite 
          </button>
        </div>
      </div>



    </div>


    {/* reviews section */}

    <div>
      {/* give review*/}

<div className='mb-10' >
  <h3 className="text-3xl font-bold text-primary mb-4">Give Review</h3>

  <form onSubmit={handleReviewSubmit} className="space-y-4 max-w-md">
    
    {/* Rating */}
    <select
      value={ratings}
      onChange={(e) => setRatings(Number(e.target.value))}
      className="select select-bordered bg-gray-800 w-full"
    >
      <option value={5}>⭐⭐⭐⭐⭐</option>
      <option value={4}>⭐⭐⭐⭐</option>
      <option value={3}>⭐⭐⭐</option>
      <option value={2}>⭐⭐</option>
      <option value={1}>⭐</option>
    </select>

    {/* Comment */}
    <textarea
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      className="textarea textarea-bordered w-full bg-gray-800"
      placeholder="Write your review..."
      required
    />

    <button className="btn btn-primary text-black font-bold w-full">
      Submit Review
    </button>
  </form>
</div>



{/* customer review */}

      <h2 className="text-3xl text-primary font-bold mb-6">Customer Reviews</h2>

<div className='grid grid-cols-1 md:grid-cols-3 gap-5 mb-20'>

    {reviews.map(review => (
  <div key={review._id} className="border rounded-xl p-4">
    <div className="flex gap-3 items-center">
      <img src={review.reviewerImage} className="w-10 h-10 rounded-full" />
      <div>
        <p className="font-bold">{review.reviewerName}</p>
        <p className="text-sm text-gray-500">
          {new Date(review.date).toLocaleDateString()}
        </p>
      </div>
    </div>

    <p className=" mt-2">"{review.comment}"</p>
    <p className="">⭐ {review.rating}</p>
  </div>
))}
</div>


    </div>



    </div>
  )
}

export default MealDetails