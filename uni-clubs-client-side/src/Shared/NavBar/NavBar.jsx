import { Link, NavLink, useNavigate } from "react-router";
import { toast } from "react-toastify";
import Logo from "../Logo/Logo"
import UseAuth from "../../Hooks/UseAuth";


const NavBar = () => {
  const { user, logOut } = UseAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully");
        navigate('/');
      })
      .catch((error) => {
        console.error("Logout Error: ", error);
        toast.error("Logout failed");
      });
  };
   const NavList = (
    <> 
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-[#FAFEFF] rounded-b-md border-b-2 border-[#FAFEFF] font-semibold text-xl"
            : "text-[#FAFEFF] font-semibold text-xl"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/clubs"
        className={({ isActive }) =>
          isActive
            ? "text-[#FAFEFF] rounded-b-md border-b-2 font-semibold text-xl"
            : "text-[#FAFEFF] font-semibold text-xl"
        }
      >
        Clubs
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive
            ? "text-[#FAFEFF] rounded-b-md border-b-2 font-semibold text-xl"
            : "text-[#FAFEFF] font-semibold text-xl"
        }
      >
        About
      </NavLink>
      <NavLink
        to="/events"
        className={({ isActive }) =>
          isActive
            ? "text-[#FAFEFF] rounded-b-md border-b-2 font-semibold text-xl"
            : "text-[#FAFEFF] font-semibold text-xl"
        }
      >
        Events
      </NavLink>

      {user && (

        <>
        
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "text-[#FAFEFF] rounded-b-md border-b-2 font-semibold text-xl"
              : "text-[#FAFEFF] font-semibold text-xl"
          }
        >
          Dashboard
        </NavLink>

        </>
      )}
     
    </>
  );

  return (
    <div className="sticky top-0 z-50"> 
      <div className="navbar bg-[#036666]  text-white shadow-sm lg:px-15 lg:py-5 px-5 py-2 border-b border-secondary">
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
              className="menu menu-sm dropdown-content bg-primary rounded-box z-1 mt-3 w-52 p-2 space-y-2  shadow"
            >
              {
                NavList
              }
              {user ? (
            <>
              {/* Large Device Button */}
              <button
                onClick={handleLogout}
                className="lg:inline-block lg:border border-gray-200 rounded-md bg-transparent 
                           text-white lg:hover:bg-[#26667F] hover:text-[#daf5ff] transition duration-300 font-medium"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              {/* Large Device Buttons */}
              <Link
                to="/auth/login"
                className="lg:inline-block  lg:border lg:border-gray-200 rounded-md bg-transparent 
                           text-white lg:hover:bg-[#26667F] hover:text-[#daf5ff] transition duration-300 font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/auth/register"
                className="lg:inline-block  lg:border lg:border-gray-200 rounded-md bg-transparent 
                           text-white lg:hover:bg-[#26667F] hover:text-[#daf5ff] transition duration-300 font-medium"
              >
                Sign Up
              </Link>
            </>
          )}
            </ul>
            
          </div>
           <Link to='/' className="flex items-center ">
            <Logo></Logo>
           </Link>
          
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-x-5 ">
            {
              NavList
            }
          </ul>
        </div>
        <div className="navbar-end gap-x-4 sm:flex hidden">
          {user ? (
            <>
              {/* Large Device Button */}
              <button
                onClick={handleLogout}
                className="lg:inline-block px-4 py-2 lg:border border-gray-200 rounded-md bg-transparent 
                           text-white lg:hover:bg-[#26667F] hover:text-[#daf5ff] transition duration-300 font-medium"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              {/* Large Device Buttons */}
              <Link
                to="/auth/login"
                className="lg:inline-block px-4 py-2 lg:border lg:border-gray-200 rounded-md bg-transparent 
                           text-white lg:hover:bg-[#26667F] hover:text-[#daf5ff] transition duration-300 font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/auth/register"
                className="lg:inline-block px-4 py-2 lg:border lg:border-gray-200 rounded-md bg-transparent 
                           text-white lg:hover:bg-[#26667F] hover:text-[#daf5ff] transition duration-300 font-medium"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
