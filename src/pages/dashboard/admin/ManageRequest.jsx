import React from 'react'
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useTitle from '../../../hooks/useTitle';

const ManageRequest = () => {
  useTitle("Manage Request")
    const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: requests = [], refetch } = useQuery({
  queryKey: ["roleRequests"],
  queryFn: async () => {
    const token = await user.getIdToken();
    const res = await axiosSecure.get("/role-requests", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
});

const handleAccept = async (id) => {
  const token = await user.getIdToken();

  await axiosSecure.patch(
    `/role-requests/accept/${id}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );

  Swal.fire("Approved!", "Request approved successfully", "success");
  refetch();
};


const handleReject = async (id) => {
  const token = await user.getIdToken();

  await axiosSecure.patch(
    `/role-requests/reject/${id}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );

  Swal.fire("Rejected!", "Request rejected", "info");
  refetch();
};


  return (
    <div className='p-5'>
    <h1 className="text-3xl font-bold mb-10 text-primary text-center">Manage Request : {requests.length} </h1>

<div className="overflow-x-auto">

        <table className="table">
  <thead className='text-primary'>
    <tr>
      <th>Serial</th>
      <th>Name</th>
      <th>Email</th>
      <th>Request Type</th>
      <th>Request Status</th>
      <th>Action</th>
    </tr>
  </thead>
<tbody>
  {requests.map((req, i) => (
    <tr key={req._id}>
      <td>{i + 1}</td>
      <td>{req.userName}</td>
      <td>{req.userEmail}</td>
      <td>{req.requestType}</td>
      <td className={req.requestStatus === "approved" ? "text-green-500" : req.requestStatus ==="rejected"? "text-red-500" : "text-blue-500"}>{req.requestStatus}</td>
      <td>
        <button
          onClick={() => handleAccept(req._id)}
 className={`btn btn-primary text-black btn-sm mr-2 transition-all duration-200
    ${
      req.requestStatus !== "pending"
        ? "opacity-20 pointer-events-none cursor-not-allowed"
        : ""
    }
  `}        >
          Accept
        </button>

        <button
          onClick={() => handleReject(req._id)}
 className={`btn btn-error btn-sm transition-all duration-200
    ${
      req.requestStatus !== "pending"
        ? "opacity-20 pointer-events-none cursor-not-allowed"
        : ""
    }
  `}    >
          Reject
        </button>
      </td>
    </tr>
  ))}
</tbody>

</table>
</div>

    </div>
  )
}

export default ManageRequest