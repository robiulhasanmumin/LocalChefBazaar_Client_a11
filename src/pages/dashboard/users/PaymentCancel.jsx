import { useNavigate } from "react-router";
import { MdCancel } from "react-icons/md";

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-center items-center text-center space-y-4">
      <MdCancel className="text-red-500 text-7xl" />

      <h1 className="text-3xl font-bold text-red-500">
        Payment Cancelled
      </h1>

      <p className="text-gray-400 max-w-md">
        Your payment was not completed.  
        No money has been charged from your account.
      </p>

      <button
        onClick={() => navigate("/dashboard/my-orders")}
        className="btn btn-primary text-black font-bold mt-4"
      >
        Back to My Orders
      </button>
    </div>
  );
};

export default PaymentCancel;
