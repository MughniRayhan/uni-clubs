import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import UseAuth from "../../Hooks/UseAuth";

export default function Footer() {
    const {user} = UseAuth();

       const NavList = (
    <> 
      <NavLink  to="/" >Home</NavLink>
      <NavLink to="/Clubs">Clubs</NavLink>
      <NavLink to="/About">About</NavLink>
      <NavLink to="/Events">Events</NavLink>

      {user && (

        <>
        
        <NavLink to="/Dashboard">Dashboard</NavLink>

        </>
      )}
     
    </>
  );

  return (
    <footer className="bg-primary  pt-12 pb-6 lg:rounded-tl-full text-white">
      <div className="max-w-7xl mx-auto sm:px-20 px-6 flex flex-col md:flex-row justify-between  gap-10">
        
        {/* Brand / About */}
        <div className="space-y-4 md:w-1/3">
          <Link to='/' className="flex items-center ">
            <h3 className=" text-4xl font-semibold">UniClubs</h3>
           </Link>
          <p className="text-gray-200 text-sm">
            Uni-Clubs is a centralized platform for managing university clubs and 
            events — making student engagement simpler, smarter, and more connected.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4 md:w-1/5">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="space-y-2 text-sm flex flex-col">
            {NavList}
          </ul>
        </div>

        {/* Social Links */}
        <div className="space-y-4 md:w-1/4">
          <h3 className="text-lg font-semibold">Connect With Us</h3>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-primary transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-primary transition"><FaTwitter /></a>
            <a href="#" className="hover:text-primary transition"><FaLinkedinIn /></a>
            <a href="https://github.com/yourgithub" className="hover:text-primary transition"><FaGithub /></a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 mt-10 pt-4  text-center text-sm text-gray-300">
        © {new Date().getFullYear()} Uni-Clubs. All Rights Reserved.
      </div>
    </footer>
  );
}
