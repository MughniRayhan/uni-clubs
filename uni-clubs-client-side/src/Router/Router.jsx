import React from "react";
import { createBrowserRouter } from "react-router";
import Error from "../Pages/Error/Error";
import Home from "../Pages/Home/Home";
import RootLayout from "../LayOut/RootLayout";
import AuthLayout from "../LayOut/AuthLayout";
import Login from "../Pages/Auth/SignIn/Login";
import SignUp from "../Pages/Auth/SignUp/SignUp";
import Forbidden from "../Pages/Forbidden/Forbidden";
import Events from "../Pages/Events/Events";
import DashboardLayout from "../LayOut/DashboardLayout";
import Profile from "../Pages/DashBoard/Profile/Profile";
import Clubs from "../Pages/Clubs/Clubs"
import MyClubs from "../Pages/DashBoard/MyClubs/MyClubs";
import About from "../Pages/Home/About/About";



 export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: Error ,
    children:[
        {   index: true,
            Component:Home
        },
         {
        path: '/forbidden',
        Component: Forbidden
      },
      
      {
        path: '/Clubs',
        Component:Clubs
      },
      {
        path: '/Events',
        Component: Events
      },
      {
        path: '/About',
        Component: About
      },
    ]

  },
  {
    path: 'Dashboard',
    element: <DashboardLayout />,
    children: [
      {
        path: 'Profile',
        Component:Profile
      },
      {
        path: 'MyClubs',
        Component: MyClubs
      },
    ]
  },
  {
    path: '/auth',
    Component: AuthLayout,
    children:[
      {
        path: '/auth/login',
        Component: Login
      },
      {
        path: '/auth/register',
        Component: SignUp
      }
    ]
  }
]);