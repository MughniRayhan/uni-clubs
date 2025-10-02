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
import About from "../Pages/Home/AboutSection/About";
import AllPolls from "../Pages/Home/Polls/AllPolls";
import AllUsers from "../Pages/DashBoard/AllUsers/AllUsers";
import AddEvent from "../Pages/DashBoard/AddEvents/AddEvent";
import JoinClub from "../Pages/DashBoard/JoinClubs/JoinClub";
import CreateClub from "../Pages/DashBoard/CreateClub/CreateClub";
import PendingClubs from "../Pages/DashBoard/PendingClubs/PendingClubs";





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
        path: '/clubs',
        Component:Clubs
      },
      {
        path: '/events',
        Component: Events
      },
      {
        path: '/about',
        Component: About
      },
      {
        path: '/AllPolls',
        Component: AllPolls
      }

    ]

  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        path: 'profile',
        Component:Profile
      },
      {
        path: 'createClub',
        Component: CreateClub
      },
      {
        path: 'myClubs',
        Component: MyClubs
      },
      {
        path: 'allUsers',
        Component: AllUsers
      },
      {
        path: 'pending-clubs',
        Component: PendingClubs
      },
      {
        path: 'addEvent',
        Component: AddEvent
      },
      {
        path: 'joinClub',
        Component: JoinClub
      }
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