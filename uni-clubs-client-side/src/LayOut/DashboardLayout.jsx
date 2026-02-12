import React from "react";
import { MdAddCircleOutline, MdDashboard, MdLogout } from "react-icons/md";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import UseAuth from "../Hooks/UseAuth";
import { FaClock, FaUserCircle, FaUsers } from "react-icons/fa";
import { toast } from "react-toastify";
import useUserRole from "../Hooks/useUserRole";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { VscDiffAdded } from "react-icons/vsc";
import { MdJoinInner } from "react-icons/md";


function DashboardLayout() {
  const { user, logOut } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const { role, roleLoading } = useUserRole();
  const navigate = useNavigate();

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.email],
    enabled: !!user,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully");
        navigate("/auth/login");
      })
      .catch((error) => {
        console.error("Logout Error: ", error);
        toast.error("Logout failed");
      });
  };

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-base-200">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* ===== MAIN CONTENT ===== */}
      <div className="drawer-content flex flex-col">
        {/* Top Navbar */}
        <div className="navbar bg-white shadow-md px-4">
          {/* Small Device Menu Button */}
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>

          {/*  Title */}
          <div className="flex-1 ">
            <h3 className="font-bold text-xl md:text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Dashboard
            </h3>
          </div>

          {/* ===== SEARCH BAR for Large Devices ===== */}
          <div className="flex-1 hidden lg:flex justify-center gap-4">
            <label className="input ">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                type="search"
                className="outlne-none"
                placeholder="Search"
              />
              <kbd className="kbd kbd-sm">⌘</kbd>
            </label>

            {/* ===== Profile Avatar (Large Devices) ===== */}
            <div className="flex-none hidden lg:flex items-center">
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={
                        profile?.photoURL ||
                        user?.photoURL ||
                        "https://i.ibb.co/4pDNDk1/avatar.png"
                      }
                      alt="profile"
                      className="object-cover"
                    />
                  </div>
                </label>

                <ul
                  tabIndex={0}
                  className="menu dropdown-content mt-3 p-2 shadow bg-white rounded-box w-48"
                >
                  <li className="px-2 py-1 text-center font-medium">
                    {profile?.displayName || user?.displayName || "User"}
                  </li>
                    
                  <div className="divider my-1"></div>
                    <div>
                        
          <NavLink
            to="/dashboard/profile"
            className="flex items-center gap-2 text-lg dashboard_page"
          >
            <FaUserCircle /> My Profile
          </NavLink>
                    </div>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="font-semibold mt-5 text-gray-700 flex justify-center"
                    >
                      <MdLogout /> Sign out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Outlet */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* ===== SIDEBAR / DRAWER ===== */}
      <div className="drawer-side shadow-lg">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="menu bg-white min-h-full sm:w-80 w-[80%] p-4 space-y-4">
          {/* Sidebar Header */}
          <Link
            to="/"
            className="sm:text-4xl text-3xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            UniClubs
          </Link>

          {/* Sidebar Links */}
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-2 text-lg font-medium hover:text-primary mt-8 ${isActive ? "text-primary" : "text-gray-700"
              }`
            }
          >
            <MdDashboard /> Dashboard
          </NavLink>


          {
            !roleLoading && role === "user" && (
              <NavLink
                to="/dashboard/createClub"
                className="flex items-center gap-2 mt-5 text-lg dashboard_page"
              >
                <MdAddCircleOutline /> Create Club
              </NavLink>
            )
          }

          {!roleLoading && role === "admin" && (
            <>
              <NavLink
                to="/dashboard/allUsers"
                className="flex items-center gap-2 mt-5 text-lg dashboard_page"
              >
                <FaUsers /> Manage Users
              </NavLink>

              <NavLink
                to="/dashboard/pending-clubs"
                className="flex items-center gap-2 mt-5 text-lg dashboard_page"
              >
                <FaClock /> Pending Clubs
              </NavLink>
              <NavLink
                to="/dashboard/all-events"
                className="flex items-center gap-2 mt-5 text-lg dashboard_page"
              >
                <FaClock /> All Events
              </NavLink>
            </>
          )}

          {!roleLoading && role === "leader" && (
            <>
              <NavLink
                to="/dashboard/addEvent"
                className="flex items-center gap-2 mt-5 text-lg dashboard_page"
              >
                <VscDiffAdded />Add Events
              </NavLink>

              <NavLink
                to="/dashboard/myEvents"
                className="flex items-center gap-2 mt-5 text-lg dashboard_page"
              >
                <VscDiffAdded />My Events
              </NavLink>

              <NavLink
                to="/dashboard/leaderClubs"
                className="flex items-center gap-2 mt-5 text-lg dashboard_page"
              >
                <VscDiffAdded />My Clubs
              </NavLink>

            </>
          )}


          {
            !roleLoading && role === "user" && (
              <>

                <NavLink
                  to="/dashboard/joinClub"
                  className="flex items-center gap-2 mt-5 text-lg dashboard_page"
                >
                  <MdJoinInner />Join Clubs
                </NavLink>
              </>
            )

          }

        </ul>
      </div>
    </div>
  );
}

export default DashboardLayout;
