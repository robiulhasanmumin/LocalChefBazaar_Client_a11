import React from 'react'
import { Link } from 'react-router'

const PaymentSuccess = () => {
  return (
 <div className="text-center mt-20">
      <h1 className="text-4xl font-bold text-green-600">
        Payment Successful 🎉
      </h1>
      <p className="mt-3">Thank you for your order</p>

      <Link to="/my-orders" className="btn btn-primary mt-5">
        Go to My Orders
      </Link>
    </div>      
    )
}

export default PaymentSuccess