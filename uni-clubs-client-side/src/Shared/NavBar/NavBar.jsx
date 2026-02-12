import { Link, NavLink, useNavigate } from "react-router";
import { toast } from "react-toastify";
import Logo from "../Logo/Logo";
import UseAuth from "../../Hooks/UseAuth";

const NavBar = () => {
  const { user, logOut } = UseAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully");
        navigate("/");
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
            ? "text-[#FAFEFF] border-b-2 border-[#FAFEFF] font-semibold text-xl"
            : "text-[#FAFEFF] font-semibold text-xl"
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/clubs"
        className={({ isActive }) =>
          isActive
            ? "text-[#FAFEFF] border-b-2 border-[#FAFEFF] font-semibold text-xl"
            : "text-[#FAFEFF] font-semibold text-xl"
        }
      >
        Clubs
      </NavLink>

      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive
            ? "text-[#FAFEFF] border-b-2 border-[#FAFEFF] font-semibold text-xl"
            : "text-[#FAFEFF] font-semibold text-xl"
        }
      >
        About
      </NavLink>

      <NavLink
        to="/events"
        className={({ isActive }) =>
          isActive
            ? "text-[#FAFEFF] border-b-2 border-[#FAFEFF] font-semibold text-xl"
            : "text-[#FAFEFF] font-semibold text-xl"
        }
      >
        Events
      </NavLink>

      
    </>
  );

  return (
    <div className="sticky top-0 z-50">
      <div className="navbar bg-[#036666] text-white shadow-sm lg:px-15 lg:py-5 px-5 py-2 border-b border-secondary">

        {/* LEFT SIDE */}
        <div className="navbar-start">

          {/* Mobile Menu */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              ☰
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-primary rounded-box z-[1] mt-3 w-52 p-3 space-y-2 shadow"
            >
              {NavList}

              <div className="border-t pt-2 mt-2">
                {user ? (
                  <>
                    <li>
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li >
                      <button  onClick={handleLogout}>Sign Out</button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/auth/login">Sign In</Link>
                    </li>
                    <li>
                      <Link to="/auth/register">Sign Up</Link>
                    </li>
                  </>
                )}
              </div>
            </ul>
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>
        </div>

        {/* CENTER (Desktop Menu) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-x-5">
            {NavList}
          </ul>
        </div>

        {/* RIGHT SIDE */}
        <div className="navbar-end gap-x-4 sm:flex hidden">
          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="cursor-pointer avatar">
                <div className="w-15 rounded-full border-2 border-white">
                  <img
                    src={
                      user.photoURL ||
                      "https://i.ibb.co/4pDNDk1/avatar.png"
                    }
                    alt="Profile"
                    title={user.displayName}
                  
                  />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-5 shadow  bg-white rounded-box w-52  text-primary"
              >
                <li className="font-semibold text-center">
                  {user.displayName || "User"}
                </li>

                <li className=" font-bold mt-4">
                  <Link to="/dashboard" className="text-[16px]">Dashboard</Link>
                </li>

                <li className=" font-bold mt-5">
                  <button className="lg:inline-block px-4 py-2 text-center lg:border border-gray-200 rounded-md bg-transparent lg:hover:bg-[#26667F] text-[16px] hover:text-[#daf5ff] transition duration-300 font-medium" onClick={handleLogout}>Sign Out</button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="px-4 py-2 border border-gray-200 rounded-md 
                           hover:bg-[#26667F] transition duration-300 font-medium"
              >
                Sign In
              </Link>

              <Link
                to="/auth/register"
                className="px-4 py-2 border border-gray-200 rounded-md 
                           hover:bg-[#26667F] transition duration-300 font-medium"
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
