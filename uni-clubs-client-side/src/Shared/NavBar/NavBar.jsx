import React, { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { toast } from "react-toastify";

const NavBar = () => {
  const {user,logOut}= useContext(AuthContext)
  console.log(user);

  const handleLogout = () => {
    logOut()
      .then(() => toast.success("Sign out successful"))
      .catch((error) => toast.error(error.message));
  };
  
  return (
    <div>
      <div className="navbar bg-gradient-to-r from-[#084C80] to-[#0D8491] text-white shadow-sm px-15 py-5 ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Home</a>
              </li>
              <li>
                <a>Clubs</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Events</a>
              </li>
            </ul>
          </div>
          <a className=" text-4xl font-semibold">UniClubs</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-xl">
            <li>
              <a>Home</a>
            </li>
            <li>
              <details>
                <summary>Clubs</summary>
                <ul className="p-2 bg-[#084C80]">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
             <details>
                <summary>Events</summary>
                <ul className="p-2 bg-[#084C80]">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
        {
           user? <div className="navbar-end gap-x-4 "> 
           <button className="btn text-white bg-transparent border border-gray-200" 
           onClick={handleLogout}>Sign Out</button>
           </div> : <>
           <div className="navbar-end gap-x-4 ">
          <Link to='/auth/login' className="btn text-white bg-transparent border border-gray-200">Sign In</Link>
          <Link to='/auth/register' className="btn text-white bg-transparent border border-gray-200">Sign Up</Link>
        </div></>
        }
        
      </div>
    </div>
  );
};

export default NavBar;
