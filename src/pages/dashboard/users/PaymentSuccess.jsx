import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useTitle from "../../../hooks/useTitle";

const PaymentSuccess = () => {
  useTitle("Payment Seccess")
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (orderId) {
      axiosSecure.patch(`/orders/pay/${orderId}`)
        .then(() => {
          Swal.fire("Payment Successful!", "Your payment has been completed.", "success");
          navigate("/dashboard/my-orders");
        })
        .catch(() => {
          Swal.fire("Error", "Payment update failed", "error");
        });
    }
  }, [orderId, axiosSecure, navigate]);

  return (
    <div className="h-screen flex justify-center items-center">
      <h2 className="text-3xl font-bold text-green-500">
        Processing Payment...
      </h2>
    </div>
  );
};

export default PaymentSuccess;
