import React from "react";
import { motion } from "framer-motion";

const JoinClub = () => {
  return (
    <section className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#e0f7f5] to-[#f0fdfa] p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-8 border-t-4 border-[#036666]"
      >
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#036666]">Join a Club</h1>
          <p className="text-gray-500 mt-2">
            Fill in your details to become a member 🎉
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          {/* Club Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Select Club
            </label>
            <select
              className="w-full px-4 py-2 border rounded-lg bg-[#f0fdfa] text-gray-700 outline-none focus:ring-2 focus:ring-[#036666] focus:bg-white transition"
              required placeholder="Select a club"
            >
              <option value="science">Science Club</option>
              <option value="sports">Sports Club</option>
              <option value="cultural">Cultural Club</option>
              <option value="debate">Debate Club</option>
              <option value="literature">Literature Club</option>
            </select>
          </div>

          {/* User Name & Student ID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-lg bg-[#f0fdfa] text-gray-700 outline-none focus:ring-2 focus:ring-[#036666] focus:bg-white transition"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Student ID
              </label>
              <input
                type="text"
                placeholder="Enter student ID"
                className="w-full px-4 py-2 border rounded-lg bg-[#f0fdfa] text-gray-700 outline-none focus:ring-2 focus:ring-[#036666] focus:bg-white transition"
                required
              />
            </div>
          </div>

          {/* Department */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Department
            </label>
            <input
              type="text"
              placeholder="Enter your department"
              className="w-full px-4 py-2 border rounded-lg bg-[#f0fdfa] text-gray-700 outline-none focus:ring-2 focus:ring-[#036666] focus:bg-white transition"
            />
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg bg-[#f0fdfa] text-gray-700 outline-none focus:ring-2 focus:ring-[#036666] focus:bg-white transition"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                className="w-full px-4 py-2 border rounded-lg bg-[#f0fdfa] text-gray-700 outline-none focus:ring-2 focus:ring-[#036666] focus:bg-white transition"
              />
            </div>
          </div>

          {/* Motivation */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Why do you want to join?
            </label>
            <textarea
              rows="3"
              placeholder="Write a short reason..."
              className="w-full px-4 py-2 border rounded-lg bg-[#f0fdfa] text-gray-700 outline-none focus:ring-2 focus:ring-[#036666] focus:bg-white transition"
            ></textarea>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 rounded-lg bg-[#036666] text-white font-bold shadow-lg hover:shadow-xl transition-all"
          >
            Join Club
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default JoinClub;
