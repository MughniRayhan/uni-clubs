import React from 'react'
import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import { toast } from 'react-toastify';
import UseAuth from '../../../Hooks/UseAuth';

function Login() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {signIn} = UseAuth();
    const location = useLocation();
    const navigate = useNavigate();
  

    const onSubmit = (data) => {
       
        signIn(data.email, data.password)
            .then((result) => {
                toast.success("Successfully logged in")
                navigate(location.state || '/');
            })
            .catch((error) => {
                console.error(error.message);
            })
    }
  return (
    <div className=' my-10 sm:w-[70%] mx-auto w-full shadow-lg md:shadow-none  '>
        <form onSubmit={handleSubmit(onSubmit)} className='card-body'>
           <div className='mb-2'>
             <h2 className='font-extrabold sm:text-3xl text-xl mb-1 '>Welcome Back</h2>
            
           </div>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email"  
          {...register("email",{ required: true})} 
          className="input" placeholder="Email" />
          {
            errors.email?.type === 'required' && <span className='text-red-500'>Password is required</span>
          }

          <label className="label">Password</label>
          <input type="password"  
          {...register("password",{ required: true})} 
          className="input" placeholder="Password" />
          {
            errors.password?.type === 'required' && <span className='text-red-500'>Password is required</span>
          }
          
          <button className="btn btn-neutral mt-4 sm:w-[330px] bg-primary   font-bold border-none">Login</button>
           <div className='mt-2 text-base'>Don't have any account? <Link to='/auth/register' className='text-secondary font-semibold underline dark:text-green-600'>Register</Link></div>
          
          <SocialLogin/>
        </fieldset>
    </form>
    </div>
  )
}

export default Login