import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react'
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';

const Payment = () => {
 const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const { order } = location.state;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const res = await axiosSecure.post("/create-payment-intent", {
      amount: order.price * order.quantity},{
    headers: {
      Authorization: `Bearer ${await user.getIdToken()}`
    }
  }
);

if (!order) {
  return <p className="text-center mt-20">No order found</p>;
}

    const clientSecret = res.data.clientSecret;

    const card = elements.getElement(CardElement);

    const { paymentIntent, error } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            email: user.email,
          },
        },
      });

    if (error) {
      Swal.fire("Error", error.message, "error");
      return;
    }

    if (paymentIntent.status === "succeeded") {
 const paymentInfo = {
    orderId: order._id,
    email: user.email,
    amount: order.price * order.quantity,
    transactionId: paymentIntent.id,
  };

  await axiosSecure.post("/payments", paymentInfo, {
    headers: {
      Authorization: `Bearer ${await user.getIdToken()}`
    }
  });

  Swal.fire("Success", "Payment Successful!", "success");
  navigate("/payment-success");
  }

  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-5">
      <CardElement />
      <button className="btn btn-primary mt-4" disabled={!stripe}>
        Pay ৳{order.price * order.quantity}
      </button>
    </form>
  );
}

export default Payment