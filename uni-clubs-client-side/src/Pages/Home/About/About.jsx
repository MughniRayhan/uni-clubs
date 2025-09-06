import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="w-full   mb-5 text-white ">
      <div className="max-w-7xl lg:mt-10 bg-gradient-to-r from-[#527171] to-secondary rounded-xl py-16 px-6 md:px-20 mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side - Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            About Our Clubs 
          </h2>
          <p className="text-lg leading-relaxed text-gray-300">
            The University Clubs Management System is designed to streamline the
            process of managing student clubs and organizations. It helps
            students discover clubs, register for events, and stay connected,
            while providing administrators with powerful tools to oversee
            activities, finances, and memberships.
          </p>
          <p className="text-lg leading-relaxed text-gray-300">
            Our goal is to encourage student engagement, enhance leadership
            skills, and create a vibrant campus community through effective club
            management.
          </p>
        </motion.div>

        {/* Right Side - Two Animated Images */}
        <div className="relative flex justify-center items-center h-96">
          <motion.img
            src="https://img.freepik.com/free-vector/team-concept-illustration_114360-678.jpg"
            alt="Clubs Illustration 1"
            className="w-64 md:w-72 rounded-2xl shadow-lg absolute"
            animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />

          <motion.img
            src="https://img.freepik.com/free-vector/office-concept-illustration_114360-1084.jpg"
            alt="Clubs Illustration 2"
            className="w-64 md:w-72 rounded-2xl shadow-lg absolute top-24 left-24"
            animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          />
        </div>
      </div>
    </section>
  );
}
