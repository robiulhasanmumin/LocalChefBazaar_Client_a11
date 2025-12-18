import React from 'react'
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';

const Login = () => {
  const {register,handleSubmit,formState:{errors}} = useForm();
  const location = useLocation()
  const navigate = useNavigate()
  const {signInUser}= useAuth()

  const handleLogin=(data)=>{
    signInUser(data.email, data.password)
    .then(()=>{
      Swal.fire({
  title: "Good job!",
  text: "You clicked the button!",
  icon: "success"
});
      navigate(location?.state || "/")
    })
    .catch(err=>{
      alert(err);
    })
  }

  return (
    <div>
       <div className="card mx-auto w-full mt-10 md:mt-0 max-w-sm shrink-0">
        <div className='px-6'>
        <h3 className="text-3xl font-bold">Welcome Back</h3>
        <p>Please Login</p>
        </div>

      <div className="card-body pt-3">

      <form onSubmit={handleSubmit(handleLogin)}>

        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" className="input w-full" {...register("email",{required:true})} placeholder="Email" />
          {errors.email?.type === "required" && <p className='text-red-500'>Email Required</p> }

          <label className="label">Password</label>
          <input type="password" className="input w-full" {...register("password",{required:true,minLength:6})} placeholder="Password" />
          {errors.password?.type==="required" && <p className='text-red-500'>Password required</p>}
          {errors.password?.type==="minLength" && <p className='text-red-500'>minimum 6 carecter required</p>}

          <button className="btn btn-neutral bg-primary text-black border-none shadow-none mt-4">Login</button>
        </fieldset>
        <p className='pt-2'>Are you new in LocalChefBazaar? <Link className='text-primary underline' to="/register" state={location.state}>Register</Link> </p>
      </form>

      </div>
    </div>
    </div>
  )
}

export default Login