import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useTitle from '../../hooks/useTitle';

const OrderMeal = () => {
  useTitle("Oder Meal")
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();


  const { register, handleSubmit, watch } = useForm();
  const quantity = watch("quantity", 1);


    const { data: meal = {} } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meals/${id}`);
      return res.data;
    },
  });


  const totalPrice = meal.price * quantity;

  const onSubmit = async (data) => {

    const orderInfo = {
      foodId: id,
      mealName: meal.foodName,
      price: meal.price,
      quantity: data.quantity,
      chefName: meal.chefName,
      chefId: meal.chefId,
      userEmail: user.email,
      userAddress: data.address,
      paymentStatus: "Pending",
      orderStatus: "pending",
      orderTime: new Date(),
    };

    const confirm = await Swal.fire({
      title: `Total Price ৳${totalPrice}`,
      text: "Do you want to confirm the order?",
      icon: "question",
      showCancelButton: true,
      cancelButtonColor:"red",
      confirmButtonText: "Yes, Confirm",
    });

try {
if (confirm.isConfirmed) {
  await axiosSecure.post("/orders", orderInfo);

  Swal.fire({
    icon: "success",
    title: "Order Placed!",
    text: "Your order has been placed successfully.",
    timer: 2000,
    showConfirmButton: false,
  });

  navigate("/dashboard/my-orders");
}
} catch (error) {
  if (error.response?.status === 409) {
    Swal.fire(
      "Oops!",
      "You already placed the same order with this quantity.",
      "warning"
    );
  }
   if (error.response?.status === 403) {
    Swal.fire(
      "Access Denied",
      "Your account is marked as fraud. You cannot place orders.",
      "error"
    );
  } 
}





  };


  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-primary my-10">
        Order Your Meal
      </h1>

       <form onSubmit={handleSubmit(onSubmit)} className="space-y-1 grid grid-cols-1 md:grid-cols-2 md:gap-x-10 md:gap-y-2 md:px-14">

        {/* Meal Name */}
        <div className='space-y-1.5'>
        <label className='label'>Meal Name</label>
        <input
          value={meal.foodName}
          readOnly
          className="input w-full bg-gray-800"
        />
        </div>


        {/* Price */}
        <div className='space-y-1.5'>
        <label className='label'>Price</label>
        <input
          value={meal.price}
          readOnly
          className="input w-full bg-gray-800"
        />
        </div>

        {/* Quantity */}
        <div className='space-y-1.5'>

        <label className='label'>Quantity</label>
        <input
          type="number"
          min={1}
          defaultValue={1}
          {...register("quantity", { required: true })}
          className="input w-full bg-gray-800"
        />
        </div>
        {/* chefId */}
        <div className='space-y-1.5'>

        <label className='label'>Chef Id</label>
        <input
          type="text"
          value={meal.chefId}
          readOnly
          className="input w-full bg-gray-800"
        />
        </div>

        {/* Email */}
        <div className='space-y-1.5'>

        <label className='label'>Email</label>
        <input
          value={user?.email}
          readOnly
          className="input w-full bg-gray-800"
        />
        </div>

        {/* Address */}
        <div className='space-y-1.5'>

        <label className='label'>Address</label>
        <input
          type='text'
          required
          {...register("address", { required: true })}
          placeholder="Enter delivery address"
          className="input w-full bg-gray-800"
        />
        </div>

        {/* Total */}
        <div>

        <p className="font-bold text-xl my-2">
          Total: <span className="text-primary text-2xl">৳ {totalPrice}</span>
        </p>

        <button className="btn btn-primary mt-2 text-black font-bold mb-14">
          Confirm Order
        </button>
        </div>
      </form>

    </div>
  )
}

export default OrderMeal