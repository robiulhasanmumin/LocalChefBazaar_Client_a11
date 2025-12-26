import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { useForm } from "react-hook-form";

const MyMeal = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedMeal, setSelectedMeal] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  const { data: meals = [], refetch } = useQuery({
    queryKey: ["myMeals", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/meals/chef/${user.email}`);
      return res.data;
    },
  });

  // 🗑 DELETE
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This meal will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "red",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/meals/${id}`);
        refetch();
        Swal.fire("Deleted!", "Meal has been deleted.", "success");
      }
    });
  };

  const handleUpdate = async (data) => {
    try {
      await axiosSecure.patch(`/meals/${selectedMeal._id}`, {
        foodName: data.foodName,
        price: data.price,
        rating: data.rating,
        estimatedDeliveryTime: data.estimatedDeliveryTime,
        ingredients: data.ingredients.split(","),
      });

      Swal.fire("Updated!", "Meal updated successfully", "success");
      document.getElementById("update_modal").close();
      refetch();
    } catch (err) {
      Swal.fire("Error", "Update failed", "error");
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold mb-10 text-primary text-center">
        My Meals
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {meals.map((meal) => (
          <div key={meal._id} className="border-2 p-5 rounded-2xl">
            <figure>
              <img
                src={meal.foodImage}
                className="rounded-2xl w-full h-[200px]"
                alt={meal.foodName}
              />
            </figure>

            <div className="">
              <h2 className="text-2xl font-bold text-primary mt-2 mb-1">
                {meal.foodName}
              </h2>
              <p>
                Price: <span className="text-primary">{meal.price}/=</span>
              </p>
              <p className="flex gap-2">
                Rating :{" "}
                <span className="flex items-center gap-1">
                  <FaStar className="text-primary" /> {meal.rating}
                </span>
              </p>
              <p>Ingredients: {meal.ingredients.join(", ")}</p>
              <p>Delivery: {meal.estimatedDeliveryTime}</p>
              <p>
                Chef: {meal.chefName} - ({meal.chefId})
              </p>

              <div className="card-actions mt-4">
                <button
                  onClick={() => {
                    setSelectedMeal(meal);
                    reset({
                      ...meal,
                      ingredients: meal.ingredients.join(","),
                    });
                    document.getElementById("update_modal").showModal();
                  }}
                  className="btn btn-primary text-black"
                >
                  Update
                </button>

                <button
                  onClick={() => handleDelete(meal._id)}
                  className="btn btn-error"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <dialog
          id="update_modal"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box bg-gray-900">
            <h3 className="font-bold text-xl mb-4 text-primary">Update Meal</h3>

            <form onSubmit={handleSubmit(handleUpdate)} className="space-y-3">
              <input
                {...register("foodName")}
                placeholder="Food Name"
                className="input input-bordered w-full bg-gray-800"
              />

              <input
                type="number"
                {...register("price")}
                placeholder="Price"
                className="input input-bordered w-full bg-gray-800"
              />

              <input
                {...register("estimatedDeliveryTime")}
                placeholder="Delivery Time"
                className="input input-bordered w-full bg-gray-800"
              />

              <input
                {...register("ingredients")}
                placeholder="Ingredients (comma separated)"
                className="input input-bordered w-full bg-gray-800"
              />

              <div className="modal-action">
                <button type="submit" className="btn btn-primary text-black">
                  Update
                </button>

                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("update_modal").close()
                  }
                  className="btn btn-error"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default MyMeal;
