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
import DashboardSidebar from "../Pages/DashBoard/components/DashboardSidebar";


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
        <div className="navbar bg-white shadow-md px-4 sm:px-12">
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
                className="menu dropdown-content mt-3 p-2 shadow bg-white rounded-box w-48 flex flex-col items-center"
              >
                <li className="px-2 py-1 text-center font-medium">
                  {profile?.displayName || user?.displayName || "User"}
                </li>

                <div className="divider my-1"></div>
                <div>

                  <NavLink
                    to="/dashboard/profile"
                    className="flex items-center gap-2 dashboard_page"
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

        {/* Main Content Outlet */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* ===== SIDEBAR / DRAWER ===== */}
      <div className="drawer-side shadow-lg">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <DashboardSidebar role={role} />
      </div>
    </div>
  );
}

export default DashboardLayout;
