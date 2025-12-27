import React from 'react'
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useTitle from '../../../hooks/useTitle';

const ManageUsers = () => {
    useTitle("Manage Users")
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();


const { data: users = [], refetch } = useQuery({
  queryKey: ['allUsers',user?.email],
   enabled: !!user?.email,
  queryFn: async () => {
    const token = await user.getIdToken();
    const res = await axiosSecure.get('/users', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  }
});


const handleFraud = async (id) => {
      const confirm = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor:"red",
        confirmButtonText: "Yes, Fraud him!",
      });
  
      if (confirm.isConfirmed) {
            const token = await user.getIdToken();
        await axiosSecure.patch(`/users/fraud/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
       Swal.fire("Success", "User marked as fraud", "success");
        refetch();
      }
  
};


  return (
    <div className='p-5'>
    <h1 className="text-3xl font-bold mb-10 text-primary text-center">Manage Users : {users.length}</h1>


    <table className="table">
  <thead className='text-primary'>
    <tr>
      <th>Serial</th>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
      <th>Status</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {users.map((u,i) => (
      <tr key={u._id}>
        <td>{i+1}</td>
        <td>{u.displayName}</td>
        <td>{u.email}</td>
        <td>{u.role}</td>
        <td className={u.status === "fraud" ? "text-red-500" : "text-green-500"}>{u.status}</td>
        <td>
{u.role !== 'admin' && u.status !== 'fraud' && (
  <button
    onClick={() => handleFraud(u._id)}
    className="btn btn-error"
  >
    Make Fraud
  </button>
)}
        </td>
      </tr>
    ))}
  </tbody>
</table>


    </div>
  )
}

export default ManageUsers