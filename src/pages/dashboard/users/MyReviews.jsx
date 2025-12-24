import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

const MyReviews = () => {
  const {user} = useAuth()
  const axiosSecure = useAxiosSecure()
const [editingReview, setEditingReview] = useState(null);

  const {register,handleSubmit,reset} = useForm()

  const { data: reviews = [], refetch } = useQuery({
  queryKey: ['myReviews', user?.email],
  enabled: !!user?.email,
  queryFn: async () => {

    const token = await user.getIdToken();
    const res = await axiosSecure.get(`/reviews/${user.email}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  }
});

 const handleDelete = async (reviewId) => {
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
      await axiosSecure.delete(`/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire("Deleted!", "Your review has been deleted.", "success");
      refetch();
    }
  };


 // Open edit modal
  const openEditModal = (review) => {
    setEditingReview(review);
    reset({
      rating: review.rating,
      comment: review.comment,
    });
  };

  // Update review
  const onSubmit = async (data) => {
    const token = await user.getIdToken();
    await axiosSecure.put(`/reviews/${editingReview._id}`,data,{ 
      headers: { Authorization: `Bearer ${token}` } 
    }
    );
    Swal.fire("Updated!", "Your review has been updated.", "success");
    setEditingReview(null);
    refetch();
  };



  return (
    <div className='p-5'>
    <h1 className="text-3xl font-bold mb-7 text-primary text-center">My Reviews : {reviews.length}</h1>

     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {reviews.map((review) => (
          <div key={review._id} className="border rounded p-4">
            <p>
              <strong>Meal:</strong> {review.foodName}
            </p>
            <p>
              <strong>Rating:</strong> {review.rating}
            </p>
            <p>
              <strong>Comment:</strong> {review.comment}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(review.date).toLocaleDateString()}
            </p>
            <div className="mt-2 flex gap-2">
              <button
                className="btn btn-primary text-black"
                onClick={() => openEditModal(review)}
              >
                Update
              </button>
              <button
                className="btn btn-error"
                onClick={() => handleDelete(review._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingReview && (
        <div className="fixed inset-0 bg-black flex justify-center items-center z-50">

          <div className="bg-gray-900 p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Update Review</h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              <label>
                Rating:
                <input
                  type="number"
                  min="1"
                  max="5"
                  {...register("rating", { required: true })}
                  className="input input-bordered w-full bg-gray-800"
                />
              </label>
              <label>
                Comment:
                <textarea
                  {...register("comment", { required: true })}
                  className="textarea textarea-bordered w-full bg-gray-800"
                />
              </label>
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEditingReview(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary text-black">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyReviews