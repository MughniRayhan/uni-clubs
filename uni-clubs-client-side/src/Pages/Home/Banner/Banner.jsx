import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import BannerImage from "../../../assets/banner.png";
import { Link } from 'react-router';
import UseAuth from '../../../Hooks/UseAuth';

const messages = [
  { text: "🎓  Join your favorite clubs", position: "top-[-60px] right-[-60px] -translate-x-1/2" },
  { text: "📅 Register for events", position: "top-[-40] right-[-50px] -translate-y-1/2"  },
  { text: "📊 Track your engagement", position: "top-[-60px] left-1/2 -translate-x-1/2" },
];

export default function Banner() {
  const {user} = UseAuth();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 2000); // show each message for 3s
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-gradient-to-r from-[#01161e] to-secondary text-white py-20" 
   
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row justify-center items-center">
        
        {/* Left Side */}
        <div className="space-y-6 lg:order-1 order-2 text-center lg:text-left flex flex-col items-center lg:items-start p-8  lg:bg-gradient-to-r lg:from-secondary/20 lg:to-transparent">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-extrabold leading-tight w-full lg:w-180"
          >
            One Portal for All <span className="bg-gradient-to-r from-secondary via-green-200 to-secondary bg-clip-text text-transparent">University Clubs</span> & Events
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-200 max-w-xl"
          >
            Discover, join, and engage with your university’s clubs and events
            — all in one centralized platform designed for students, leaders, and admins.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
            
          >
            <Link to='/Clubs' className="bg-primary hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition">
              Explore Clubs
            </Link>
            {!user && 
            <Link to='/auth/register'  className="border border-white hover:bg-gradient-to-r hover:from-primary hover:to-secondary  font-semibold px-6 py-3 rounded-xl transition">
              Register Now
            </Link>
            }
          </motion.div>
        </div>

        {/* Right Side: Image and Floating Messages */}
        <div className="relative flex justify-center md:justify-end order-1 lg:order-2 p-8 rounded-t-full rounded-xl lg:bg-gradient-to-b lg:from-indigo-100/10 lg:to-transparent">
          <motion.img
            src={BannerImage}
            alt="University Clubs"
           
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -15, 0],        
              rotate: [0, 2, -2, 0]  
            }}
            transition={{ 
              duration: 11,
              delay: 0.9, 
              repeat: Infinity, 
              repeatType: "loop",
              ease: "easeInOut" 
            }}
            className="w-full max-w-2xl drop-shadow-2xl rounded-2xl"
          />

          {/* Floating Messages */}
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className={`absolute ${messages[index].position} bg-white text-indigo-900 font-medium px-4 py-6 rounded-3xl shadow-lg hidden
            lg:inline-block`}
          >
            {messages[index].text}
             <div className="absolute -bottom-2 left-6 w-0 h-0 
                  border-l-8 border-r-8 border-t-8 
                  border-l-transparent border-r-transparent 
                  border-t-white"></div>
          </motion.div>
        </div>
      </div>
      
    </section>
  );
}
