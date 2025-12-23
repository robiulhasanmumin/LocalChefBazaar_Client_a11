import React from 'react'
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';



const MyOrders = () => {
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
    });

    if (confirm.isConfirmed) {
      // try {
      //   Swal.fire("Payment Processing...", "This is just a placeholder.", "info");

      //   await axiosSecure.patch(`/orders/${order._id}/pay`, {}, {
      //     headers: { Authorization: `Bearer ${await user.getIdToken()}` }
      //   });

      //   Swal.fire("Success!", "Payment successful!", "success");
         navigate("/payment", { state: { order } });
      //   refetch(); 
      // } catch {
      //   Swal.fire("Error!", "Payment failed!", "error");
      // }
    }
  };


  return (
    <div className='p-5'>
      <h1 className="text-3xl font-bold mb-7 text-primary text-center">My Orders</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
{orders.map(order => (
  <div key={order._id} className="border rounded px-5 py-4">
    <p><strong>Food Name:</strong> {order.mealName}</p>
    <p><strong>Chef:</strong> {order.chefName} ({order.chefId})</p>
    <p><strong>Quantity:</strong> {order.quantity}</p>
    <p><strong>Price:</strong> ৳{order.price}</p>
    <p><strong>Order Status:</strong> {order.orderStatus}</p>
    <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
    <p><strong>Order Time:</strong> {new Date(order.orderTime).toLocaleString()}</p>

    {/* Pay Button */}
     {order.orderStatus === "accepted" && order.paymentStatus === "Pending" && (
              <button
                className="btn btn-primary mt-2"
                onClick={() => handlePayment(order)}
              >
                Pay Now
              </button>
            )}  </div>
))}
      </div>
    </div>
  )
}

export default MyOrders