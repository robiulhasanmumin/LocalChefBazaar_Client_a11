import React from 'react'
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import useTitle from '../../../hooks/useTitle';



const MyOrders = () => {
  useTitle("My Orders")
  const { user } = useAuth();
const axiosSecure = useAxiosSecure();
const navigate = useNavigate()

const { data: orders = [], refetch } = useQuery({
  queryKey: ['myOrders', user?.email],
  enabled: !!user?.email,
  queryFn: async () => {
    const res = await axiosSecure.get(`/orders/user/${user.email}`, {
      headers: {
        Authorization: `Bearer ${await user.getIdToken()}`
      }
    });
    return res.data;
  }
});


const handlePayment = async (order) => {

  const confirm = await Swal.fire({
    title: `Pay ৳${order.price * order.quantity}?`,
    text: "Do you want to proceed to payment?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, Pay Now",
    cancelButtonColor: "red"
  });

  if (confirm.isConfirmed) {
    try {
      const res = await axiosSecure.post("/create-checkout-session", {
        orderId: order._id,
        amount: order.price * order.quantity,
      });

      window.location.href = res.data.url;

    } catch (error) {
      Swal.fire("Error", "Payment failed", "error");
    }
  }
};






  return (
    <div className='p-5'>
      <h1 className="text-3xl font-bold mb-5 text-primary text-center">My Orders : {orders.length}</h1>
      <p className='text-xl mb-6 text-gray-400'>You can only make <span className='text-primary'>payment</span> if the chef <span className='text-primary'>accepts</span> the order.</p>

      {
        orders.length > 0 ?

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
{orders.map(order => (
  <div key={order._id} className="border rounded px-5 py-4">
    <p><strong>Food Name:</strong> {order.mealName}</p>
    <p><strong>Chef:</strong> {order.chefName} ({order.chefId})</p>
    <p><strong>Quantity:</strong> {order.quantity}</p>
    <p><strong>Price:</strong> ৳{order.price}</p>
    <p><strong>Order Status:</strong> {order.orderStatus}</p>
    <p><strong>Payment Status:</strong> <span className={order.paymentStatus === "paid" ? "text-green-500 font-bold" : ""}>{order.paymentStatus}</span> </p>
    <p><strong>Order Time:</strong> {new Date(order.orderTime).toLocaleString()}</p>

    {/* Pay Button */}
     {order.orderStatus === "accepted" && order.paymentStatus === "Pending" && (
              <button
                className="btn btn-primary mt-2 text-black font-bold"
                onClick={() => handlePayment(order)}
              >
                Pay Now
              </button>
            )}  </div>
))}
      </div> :
      <p className='text-3xl text-gray-500 mt-10'>Your Orders not found...</p>
      }
    </div>
  )
}

export default MyOrders