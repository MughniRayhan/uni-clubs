import React from 'react'
import { Outlet } from 'react-router'
import NavBar from '../Shared/NavBar/NavBar'

function AuthLayout() {
  return (
    <div>
        <NavBar/>
        <div className=" lg:max-w-screen w-full min-h-screen">
        
    <Outlet/>
</div>
    </div>
  )
}

export default AuthLayout