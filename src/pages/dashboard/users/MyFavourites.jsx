import React from 'react'
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useTitle from '../../../hooks/useTitle';

const MyFavourites = () => {
  useTitle("My Favourites")
    const {user} = useAuth()
  const axiosSecure = useAxiosSecure()


    const { data: favourites = [], refetch } = useQuery({
  queryKey: ['myFavourites', user?.email],
  enabled: !!user?.email,
  queryFn: async () => {

    const token = await user.getIdToken();
    const res = await axiosSecure.get(`/favourites/${user.email}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  }
});


 const handleDelete = async (favId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor:"red",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
          const token = await user.getIdToken();
      await axiosSecure.delete(`/favourites/${favId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire("Deleted!", "Your Favourite Item has been deleted.", "success");
      refetch();
    }
  };





  return (
    <div className='p-5'>
    <h1 className="text-3xl font-bold mb-10 text-primary text-center">My Favourites : {favourites.length}</h1>

    <div className="overflow-x-auto text-white">
      <table className="table">
    <thead>
      <tr className='text-primary'>
        <th>Serial</th>
        <th>Meal Name</th>
        <th>Chef Name</th>
        <th>Price</th>
        <th>Date Added</th>
        <th>Actions</th>
      </tr>
    </thead>
      {
        favourites.length > 0 ?
        
<tbody>
  {
    favourites.map((favourite,i)=>(
  <tr key={i}>
    <th>{i+1}</th>
    <td>{favourite.mealName}</td>
    <td>{favourite.chefName}</td>
    <td>{favourite.price}</td>
    <td>{favourite.addedTime}</td>
    <td><button onClick={()=>handleDelete(favourite._id)} className='btn btn-error'>Delete</button></td>
  </tr>
    ))
  } 
</tbody>
        :
      <p className='text-gray-500 text-3xl mt-10'>Yours favourites not found...</p>

      }
      </table>

    </div>

    </div>
  )
}

export default MyFavourites