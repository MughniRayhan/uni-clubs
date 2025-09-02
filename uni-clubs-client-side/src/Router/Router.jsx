import React from "react";
import { createBrowserRouter } from "react-router";
import Error from "../Pages/Error/Error";
import Home from "../Pages/Home/Home";
import RootLayout from "../LayOut/RootLayout";
import AuthLayout from "../LayOut/AuthLayout";
import Login from "../Pages/Auth/SignIn/Login";
import SignUp from "../Pages/Auth/SignUp/SignUp";
import Forbidden from "../Pages/Forbidden/Forbidden";
import Profile from "../Components/Profile";
import Dashboard from "../Components/Dashboard";
import MyClubs from "../Components/MyClubs";
import Clubs from "../Components/Clubs/Clubs";
import Events from "../Components/Events/Events";


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
        path: '/Profile',
        Component: Profile
      },
      {
        path: '/Dashboard',
        Component: Dashboard
      },
      {
        path: '/MyClubs',
        Component: MyClubs
      },
      {
        path: '/Clubs',
        Component:Clubs
      },
      {
        path: '/Events',
        Component: Events
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