import React from "react";
import { motion } from "framer-motion";

const AddEvent = () => {
  return (
    <section className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#e0f7f5] to-[#f0fdfa] p-4">
      {/* Card / Box */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl p-8 border-t-4 border-[#036666]"
      >
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#036666]">Add Event</h1>
          <p className="text-gray-500 mt-2">
            Fill in the details to create and publish your event 🌟
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          {/* Event Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Event Name
            </label>
            <input
              type="text"
              placeholder="Enter event name"
              className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#036666]"
              required
            />
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Event Short Description
            </label>
            <textarea
              rows="3"
              placeholder="Write a short description..."
              className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#036666]"
            ></textarea>
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
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#036666]"
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
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#036666]"
                required
              />
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Event Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#036666]"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Event Time
              </label>
              <input
                type="time"
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#036666]"
              />
            </div>
          </div>

          {/* Venue */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Event Venue
            </label>
            <input
              type="text"
              placeholder="Enter venue/location"
              className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#036666]"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Event Category
            </label>
            <select className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#036666]">
              <option value="">Select category</option>
              <option value="seminar">Seminar</option>
              <option value="workshop">Workshop</option>
              <option value="competition">Competition</option>
              <option value="cultural">Cultural</option>
              <option value="sports">Sports</option>
            </select>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Event Banner
            </label>
            <input
              type="file"
              className="w-full px-4 py-2 border rounded-lg cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-[#036666] file:text-white hover:file:bg-[#024f4f]"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 rounded-lg bg-[#036666] text-white font-bold shadow-lg hover:shadow-xl transition-all"
          >
            Add Event
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default AddEvent;
