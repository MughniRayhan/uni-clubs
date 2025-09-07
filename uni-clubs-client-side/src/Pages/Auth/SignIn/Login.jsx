import React from 'react'
import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import { toast } from 'react-toastify';
import UseAuth from '../../../Hooks/UseAuth';
import animation from '../../../assets/Animation/login.json'
import Lottie from 'lottie-react';


function Login() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const emailValue = watch("email");
    const {signIn,forgetPassword} = UseAuth();
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

    // forgot password
   const handleForgotPassword = () => {
  if (!emailValue) {
    toast.error("Please enter your email first");
    return;
  }
  
  forgetPassword(emailValue)
    .then(() => {
      toast.success("A password reset email has been sent. Please check your inbox or check your spam folder");
    })
    .catch((error) => {
      toast.error(error.message);
    });
};

  return (
    <div className="bg-gradient-to-tl from-primary/20 via-transparent to-primary/10  " > 
    <div className=' flex  items-center justify-center  '>
        <form onSubmit={handleSubmit(onSubmit)} className='lg:w-1/2 w-full bg-white  min-h-screen flex flex-col justify-center items-center shadow-lg md:shadow-none px-5 '>
        <h2  className="text-3xl bg-gradient-to-t from-black via-primary to-secondary/50 bg-clip-text text-transparent font-bold mb-6">
        Welcome Back
        </h2>   
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" name='email'
          {...register("email",{ required: true})} 
          className="input" placeholder="Email" />
          {
            errors.email?.type === 'required' && <span className='text-red-500'>Password is required</span>
          }

          <label className="label">Password</label>
          <input type="password"  name='password'
          {...register("password",{ required: true})} 
          className="input" placeholder="Password" />
          {
            errors.password?.type === 'required' && <span className='text-red-500'>Password is required</span>
          }
          <div onClick={handleForgotPassword}><a className="link link-hover mt-2">Forgot password?</a></div>
          <button 
          className="btn  mt-3 sm:w-[330px] bg-primary text-white hover:bg-white hover:text-primary hover:border hover:border-primary font-bold ">
            Login
          </button>
           <div className='mt-2 text-base'>Don't have any account? <Link to='/auth/register' className='text-secondary font-semibold underline'>Register</Link></div>
          
          <SocialLogin/>
        </fieldset>
        </form>
        <div className=" w-1/2  bg-secondary/20  min-h-screen lg:flex justify-center items-center hidden">
         <Lottie className='w-150 h-150' animationData={animation} loop={true}></Lottie>
       </div>
    </div>
    </div>
  )
}

export default Login