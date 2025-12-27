import React from 'react'
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const OrderRequest = () => {
   const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: currentUser = {} } = useQuery({
    queryKey: ["currentUser", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });


 const { data: orders = [], refetch } = useQuery({
    queryKey: ["chefOrders", currentUser?.chefId],
    enabled: !!currentUser?.chefId,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/orders/chef/${currentUser.chefId}`
      );
      return res.data;
    },
  });
  

    const handleAccept = async (id) => {
    await axiosSecure.patch(`/orders/accept/${id}`);
    Swal.fire("Accepted!", "Order accepted", "success");
    refetch();
  };

  const handleCancel = async (id) => {
    await axiosSecure.patch(`/orders/cancel/${id}`);
    Swal.fire("Cancelled!", "Order cancelled", "info");
    refetch();
  };

  const handleDeliver = async (id) => {
    await axiosSecure.patch(`/orders/deliver/${id}`);
    Swal.fire("Delivered!", "Order delivered", "success");
    refetch();
  };

  
  
  
  return (
    <div className='p-5'>
    <h1 className="text-3xl font-bold mb-10 text-primary text-center">Order Requests : {orders.length}</h1>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {orders.map((order) => {

          const isPending = order.orderStatus === "pending";
          const isAccepted = order.orderStatus === "accepted";

          return (
            <div key={order._id} className="border p-5 rounded-xl space-y-2">
              <h3 className="text-2xl text-primary font-bold">{order.mealName}</h3>
              <p>Price: {order.price}</p>
              <p>Quantity: {order.quantity}</p>
              <p>User Email: {order.userEmail}</p>
              <p>Address: {order.userAddress}</p>
              <p>Order Time: {order.orderTime}</p>
              <p>
                Status:
                <span className="ml-2 font-bold text-primary">
                  {order.orderStatus}
                </span>
              </p>
              <p>Payment: <span className={order.paymentStatus === "paid"? "text-green-500 font-bold":""}>{order.paymentStatus}</span> </p>

              {/* 🔘 Buttons */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleCancel(order._id)}
                  className={`btn btn-error ${
                    !isPending && "opacity-20 pointer-events-none cursor-not-allowed"
                  }`}
                >
                  Cancel
                </button>

                <button
                  onClick={() => handleAccept(order._id)}
                  className={`btn btn-primary text-black ${
                    !isPending && "opacity-20 pointer-events-none cursor-not-allowed"
                  }`}
                >
                  Accept
                </button>

                <button
                  onClick={() => handleDeliver(order._id)}
                  className={`btn btn-success ${
                    (!isAccepted || order.paymentStatus !== "paid")? "opacity-20 pointer-events-none cursor-not-allowed" : ""
                  }`}
                >
                  Deliver
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  )
}

export default OrderRequest