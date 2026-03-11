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
import JoinClub from "../Pages/DashBoard/JoinClubs/JoinClub";
import CreateClub from "../Pages/DashBoard/CreateClub/CreateClub";
import PrivateRoute from "../Routes/PrivateRoute";
import DashboardHome from "../Pages/DashBoard/DashboardHomePages/DashboardHome";
import ClubDetails from "../Pages/Clubs/ClubDetails";
import AllEvents from "../Pages/DashBoard/AllEvents/AllEvents";
import LeaderClubs from "../Pages/DashBoard/LeaderDashboard/LeaderClubs";
import MyEvents from "../Pages/DashBoard/LeaderDashboard/LeaderEvents/MyEvents";
import AddEvent from "../Pages/DashBoard/LeaderDashboard/LeaderEvents/AddEvent";
import AllClubs from "../Pages/DashBoard/Clubs/AllClubs";
import PendingClubs from "../Pages/DashBoard/Clubs/PendingClubs";
import leadership from "../Pages/Home/AboutSection/Overview";
import history from "../Pages/Home/AboutSection/history";
import Strategies from "../Pages/Home/AboutSection/Strategies";
import Overview from "../Pages/Home/AboutSection/Overview";
import HomeAbout from "../Pages/Home/AboutSection/HomeAbout";
import PendingJoinRequest from "../Pages/DashBoard/ClubMembers/PendingJoinRequest";
import ManageMembers from "../Pages/DashBoard/ClubMembers/ManageMembersPage";
import ManageClubDetails from "../Pages/DashBoard/Clubs/ManageClubDetails";
import PendingEventRegistration from "../Pages/DashBoard/LeaderDashboard/LeaderEvents/PendingEventRegistration";
import ManageEventRegistrations from "../Pages/DashBoard/LeaderDashboard/LeaderEvents/ManageEventRegistrations";
import EventParticipants from "../Pages/DashBoard/LeaderDashboard/LeaderEvents/EventParticipants";
import RegisteredEvents from "../Pages/DashBoard/Events/RegisteredEvents";





export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: Error,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: '/forbidden',
        Component: Forbidden
      },

      {
        path: '/clubs',
        Component: Clubs
      },
      {
        path: '/clubs/:clubId',
        Component: ClubDetails
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
        path: "/HomeAbout",
        Component: HomeAbout

      },
      {
        path: '/leadership',
        Component: leadership
      },
      {
        path: '/history',
        Component: history
      },
      {
        path: '/strategies',
        Component: Strategies
      },
      {
        path: '/Overview',
        Component: Overview
      },
      {
        path: '/AllPolls',
        Component: AllPolls
      }

    ]

  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      {
        index: true,
        Component: DashboardHome
      },
      {
        path: 'profile',
        Component: Profile
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
        path: 'registered-events',
        Component: RegisteredEvents
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
        path: 'all-clubs',
        Component: AllClubs
      },
      {
        path: 'club-details',
        Component: ManageClubDetails
      },
      {
        path: 'pending-members',
        Component: PendingJoinRequest
      },
      {
        path: 'manage-members',
        Component: ManageMembers
      },
      {
        path: 'all-events',
        Component: AllEvents,
      },
      {
        path: 'addEvent',
        Component: AddEvent
      },
      {
        path: 'myEvents',
        Component: MyEvents
      },
      {
        path: 'pending-event-reg',
        Component: PendingEventRegistration
      },
      {
        path: 'all-event-reg',
        Component: ManageEventRegistrations
      },
      {
        path: 'event-participants/:eventId',
        Component: EventParticipants
      },
      {
        path: 'leaderClubs',
        Component: LeaderClubs
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
    children: [
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