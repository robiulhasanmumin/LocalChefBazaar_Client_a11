import React from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuth from "../../../hooks/useAuth"

const Profile = () => {
 const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  // 🔹 User info load
  const { data: currentUser = {}, refetch } = useQuery({
    queryKey: ['currentUser', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`)
      return res.data
    }
  })

  // 🔹 Request handler
  const handleRoleRequest = async (role) => {
    const requestInfo = {
      userName: currentUser.displayName,
      userEmail: currentUser.email,
      requestType: role,
      requestStatus: "pending",
      requestTime: new Date()
    }

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to request to be a ${role}?`,
      icon: "question",
      showCancelButton: true,
      cancelButtonColor:"red",
      confirmButtonText: "Yes, Send Request"
    })

    try{
    if (confirm.isConfirmed) {
      await axiosSecure.post('/role-requests', requestInfo)
      Swal.fire("Success!", "Request sent successfully!", "success")
      refetch()
    }
    }
    catch(error){
   if (error.response?.status === 409) {
    Swal.fire(
      "Already Requested!",
      "You already have a pending request for this role.",
      "warning"
    );
  } else {
    Swal.fire("Error", "Something went wrong", "error");
  }

}

  }

  return (
 <div className="p-5">
      <h2 className="text-3xl font-bold mb-10 text-primary text-center">My Profile</h2>

      <div>

      <div className="flex justify-center mb-4">
        <img
          src={currentUser.photoURL}
          alt="profile"
          className="w-28 h-28 rounded-full border"
        />
      </div>

      <div className="space-y-2 text-center text-xl">
        <p>Name : <span className='font-bold'>{currentUser.displayName}</span> </p>
        <p>Email : <span className='font-bold'>{currentUser.email}</span> </p>
        <p>Role : <span className={currentUser.role==="admin" ? "text-primary font-bold" : "font-bold"}>{currentUser.role}</span> </p>
        <p>Status : <span className={currentUser.status === "fraud" ? "text-red-500" : "text-green-500"}>{currentUser.status}</span> </p>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex space-y-3 justify-center gap-3">
        {
          currentUser.role === "user" && currentUser.status !== "fraud" && (
            <>
              <button
                onClick={() => handleRoleRequest("chef")}
                className="btn btn-primary text-black font-bold"
              >
                Be a Chef
              </button>

              <button
                onClick={() => handleRoleRequest("admin")}
                className="btn bg-green-400 font-bold border-0"
              >
                Be an Admin
              </button>
            </>
          )
        }
      </div>
      </div>

    </div>
    
  )
}

export default Profile