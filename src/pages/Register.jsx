import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import useAxiosSecure from '../hooks/useAxiosSecure'
import { useForm } from 'react-hook-form'
import useAuth from '../hooks/useAuth'
import axios from 'axios'
import Swal from 'sweetalert2'

const Register = () => {
    const location = useLocation()
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {registerUser,updateUserProfile}=useAuth()
 

  const handleRegister = (data) => {

    const profileImg = data.photo[0]

    registerUser(data.email, data.password)
    .then(()=>{
            Swal.fire({
        title: "Registered Successfully!",
        icon: "success"
      });
      

      // store the img in form data 
      const formData= new FormData()
      formData.append("image",profileImg)
      // send the photo to store and get the url
      const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img_host_key}`;

      axios.post(image_API_URL, formData)
      .then(res=>{
        const photoURL = res.data.data.url
        // create user 
        const userInfo = {
          email:data.email,
          displayName:data.name,
          photoURL:photoURL
        }
        axiosSecure.post("/users",userInfo)
        .then(res=>{
          if(res.data.insertedId){
            console.log("user created in the data base");
          }
        })
        // update the profile to firebase
        const userProfile={
          displayName : data.name,
          photoURL : photoURL
        }
        updateUserProfile(userProfile)
        .then(()=>{
          navigate(location.state || "/")
        })
        .catch(err=>{
          alert(err);
        })
      })
    })
    .catch(err=>{
      alert(err);
    })
  };

  return (
    <div>
       <div className="card mx-auto w-full max-w-sm mt-20 md:mt-0 shrink-0">
        <div className='px-6'>
        <h3 className="text-3xl font-bold">Create an Account</h3>
        <p>Register with LocalChefBazaar</p>
        </div>

      <div className="card-body pt-3">

      <form onSubmit={handleSubmit(handleRegister)}>
        <fieldset className="fieldset">
          {/* Name */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input w-full bg-gray-800"
            placeholder="Your Name"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500">Name reqired</p>
          )}

          {/* photo */}
          <label className="label">Photo URL</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="input file-input w-full bg-gray-800"
            placeholder="photo URL"
          />
          {errors.photo?.type === "required" && (
            <p className="text-red-500">PhotoURL reqired</p>
          )}

          {/* Email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input w-full bg-gray-800"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">email reqired</p>
          )}

         {/*password  */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6,pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/ })}
            className="input w-full bg-gray-800"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500">password required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">password minimum 6</p>
          )}
          {
            errors.password?.type==="pattern" && <p className="text-red-500">at least 1 uppercase, lowercse and 1 digit</p>
          }


          <button className="btn btn-neutral bg-primary text-black border-none shadow-none mt-4">Register</button>
        </fieldset>
        <p className='pt-2'>Already you have an Account <Link state={location.state} className='text-primary underline' to="/login">Login</Link> </p>
      </form>

      </div>
    </div>
    </div>
  )
}

export default Register