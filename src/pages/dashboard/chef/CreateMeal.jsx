import React, { useState } from 'react'
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import useTitle from '../../../hooks/useTitle';

const CreateMeal = () => {
  useTitle("Create Meal")
   const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false); 

  const { data: currentUser = {} } = useQuery({
  queryKey: ["currentUser", user?.email],
  enabled: !!user?.email,
  queryFn: async () => {
    const res = await axiosSecure.get(`/users/${user.email}`);
    return res.data;
  },
});

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

 const onSubmit = async (data) => {
  setLoading(true)
    try {
      const imageFile = data.foodImage[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img_host_key}`,
        formData
      );

      const imageUrl = imgRes.data.data.url;

      // 🔹 Meal Object
      const mealInfo = {
        foodName: data.foodName,
        chefName: data.chefName,
        foodImage: imageUrl,
        price: parseFloat(data.price),
        rating: Number(data.rating),
        ingredients: data.ingredients.split(",").map(i => i.trim()),
        estimatedDeliveryTime: data.estimatedDeliveryTime,
        deliveryArea: data.deliveryArea,
        chefExperience: data.chefExperience,
        chefId: data.chefId,
        userEmail: user.email,
      };

      await axiosSecure.post("/meals", mealInfo);

      Swal.fire("Success!", "Meal added successfully", "success");
      reset();
    } catch {
      Swal.fire("Error", "Something went wrong", "error");
    }finally {
    setLoading(false); 
  }
  };


  if (currentUser.role !== "chef" || currentUser.status === "fraud") {
  return <p className="text-primary mt-20 text-4xl text-center">You are a Fraud User. So, Access Denied</p>;
}


  return (
    <div className='p-5'>
    <h1 className="text-3xl font-bold mb-10 text-primary text-center">Create Meal </h1>

     <form onSubmit={handleSubmit(onSubmit)} className="space-y-1 grid grid-cols-1 md:grid-cols-2 md:gap-x-10 md:gap-y-2 md:px-14">
        {/* food name */}
        <div className='space-y-1.5'>
        <label className='label'>Food Name</label>
        <input {...register("foodName", { required: true })}
          placeholder="Food Name" className="input input-bordered w-full bg-gray-800" />
        </div>
        
        {/* chefname */}
        <div className='space-y-1.5'>
          <label className='label'>Chef Name</label>
        <input {...register("chefName", { required: true })}
          placeholder="Chef Name" className="input input-bordered w-full bg-gray-800" value={user.displayName} />
        </div>

{/* img */}
        <div className='space-y-1.5'>
          <label className='label'>Food Image</label>
        <input type="file" required
          {...register("foodImage", { required: true })}
          className="file-input file-input-bordered w-full bg-gray-800" />
        </div>

{/* price */}
<div className='space-y-1.5'>
          <label className='label'>Price</label>
        <input type="number"
          {...register("price", { required: true })}
          placeholder="Price"
          className="input input-bordered w-full bg-gray-800" />
</div>

{/* ingradient */}
<div className='space-y-1.5'>
            <label className='label'>Ingredients</label>

        <input type='text'
          {...register("ingredients", { required: true })}
          placeholder="Ingredients (comma separated)"
          className="input textarea-bordered w-full bg-gray-800" />
</div>

{/* delivery time */}
<div className='space-y-1.5'>
            <label className='label'>Delivery Time</label>

        <input
          {...register("estimatedDeliveryTime", { required: true })}
          placeholder="Estimated Delivery Time (Ex: 20 minutes)"
          className="input input-bordered w-full bg-gray-800" />
</div>
{/* delivery area */}
<div className='space-y-1.5'>
            <label className='label'>Delivery Area</label>

        <input
          {...register("deliveryArea", { required: true })}
          placeholder="Delivery Area"
          className="input input-bordered w-full bg-gray-800" />
</div>

{/* experience */}
<div className='space-y-1.5'>
            <label className='label'>Chef Experience</label>

        <input
          {...register("chefExperience", { required: true })}
          placeholder="Chef Experience (Ex: 2 Years)"
          className="input input-bordered w-full bg-gray-800" />
</div>

{/* id */}
<div className='space-y-1.5'>
            <label className='label'>Chef Id</label>

        <input
          {...register("chefId")}
          value={currentUser?.chefId}
          readOnly
          className="input input-bordered w-full bg-gray-800" />
</div>

{/* email */}
<div className='space-y-1.5'>
            <label className='label'>Email</label>


        <input
          value={user?.email}
          readOnly
          className="input input-bordered w-full bg-gray-800" />
        </div>

        <button disabled={loading} className="btn btn-primary w-fit text-black mt-3 font-bold">
{loading ? (
    <>
      <span className="loading loading-spinner"></span> Creating...
    </>
  ) : (
    "Create Meal"
  )}
          </button>
      </form>

    </div>
  )
}

export default CreateMeal