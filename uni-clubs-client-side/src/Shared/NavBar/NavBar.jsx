import { Link, NavLink, useNavigate } from "react-router";
import { toast } from "react-toastify";
import Logo from "../Logo/Logo";
import Avatar from "../../assets/avatar.png";
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
            ? "text-primary border-b-2 border-primary font-semibold sm:text-xl"
            : "text-primary font-semibold sm:text-xl"
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/clubs"
        className={({ isActive }) =>
          isActive
            ? "text-primary border-b-2 border-primary font-semibold sm:text-xl"
            : "text-primary font-semibold sm:text-xl"
        }
      >
        Clubs
      </NavLink>

      <NavLink
        to="/About"
        className={({ isActive }) =>
          isActive
            ? "text-primary border-b-2 border-primary font-semibold sm:text-xl"
            : "text-primary font-semibold sm:text-xl"
        }
      >
        About
      </NavLink>

      <NavLink
        to="/events"
        className={({ isActive }) =>
          isActive
            ? "text-primary border-b-2 border-primary font-semibold sm:text-xl"
            : "text-primary font-semibold sm:text-xl"
        }
      >
        Events
      </NavLink>


    </>
  );

  return (
    <div className="sticky top-0 z-50">
      <div className="navbar bg-white  text-white border-b border-gray-100 lg:px-15 lg:py-5 px-5 py-2 ">

        {/* LEFT SIDE */}
        <div className="navbar-start">

          {/* Mobile Menu */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-black">
              ☰
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3  w-52 p-3 space-y-2 shadow"
            >
              {NavList}

              <div className="border-t border-gray-200 pt-2 mt-2 text-primary font-semibold text-xl">
                {user ? (
                  <>
                    <li>
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li >
                      <button onClick={handleLogout}>Sign Out</button>
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
                      user?.photoURL ||
                      Avatar
                    }
                    alt="Profile"
                    title={user.displayName}

                  />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-5 shadow text-center flex flex-col justify-center items-center bg-white rounded-box w-52  text-primary"
              >
                <li className="font-semibold text-center">
                  {user.displayName || "User"}
                </li>
                <div className="divider my-1"></div>

                <li className=" font-semibold text-center ">
                  <Link to="/dashboard" className="text-[16px] ">Dashboard</Link>
                </li>

                <li className=" font-bold mt-2">
                  <button className="lg:inline-block px-4 py-2 text-center lg:border border-gray-200 rounded-md bg-transparent lg:hover:bg-[#26667F] text-[16px] hover:text-[#daf5ff] transition duration-300 font-medium" onClick={handleLogout}>Sign Out</button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="px-4 py-2 border border-gray-200 rounded-md 
                           bg-secondary hover:text-black transition duration-300 font-medium"
              >
                Sign In
              </Link>

              <Link
                to="/auth/register"
                className="px-4 py-2 border border-gray-200 rounded-md 
                           bg-secondary hover:text-black transition duration-300 font-medium"
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
