import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const AddEvent = () => {
  const axiosSecure = UseAxiosSecure();
  const [bannerFile, setBannerFile] = useState(null);
 const [myClubs, setMyClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState("");

  useEffect(() => {
  const loadClubs = async () => {
    try {
      const res = await axiosSecure.get("/leader/clubs");
      // make sure it's an array
      setMyClubs(res.data.clubs || []); 
    } catch (err) {
      console.error(err);
      setMyClubs([]);
    }
  };
  loadClubs();
}, []);


 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!selectedClub) {
    toast.error("Please select a club");
    return;
  }

  try {
    const form = e.target;

    const title = form.eventName.value;
    const shortDescription = form.shortDescription.value;
    const userName = form.userName.value;
    const studentId = form.studentId.value;
    const date = form.eventDate.value;
    const time = form.eventTime.value;
    const venue = form.venue.value;
    const category = form.category.value;

    // --- Upload Banner to IMGBB ---
    let bannerUrl = "";
    if (bannerFile) {
      const fd = new FormData();
      fd.append("image", bannerFile);

      const uploadRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_key}`,
        fd
      );

      bannerUrl = uploadRes.data.data.url;
    }

    // --- Prepare Data ---
    const payload = {
      title,
      shortDescription,
      date,
      time,
      venue,
      category,
      banner: bannerUrl,
      createdByName: userName,
      studentId,
    };

    // --- Send Event Request ---
    await axiosSecure.post(`/events/${selectedClub}`, payload);

    toast.success("Event request sent to admin!");
    form.reset();
    setBannerFile(null);
    setSelectedClub(""); // reset select
  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.message || "Failed to submit event");
  }
};


  return (
    <section className="flex justify-center items-center min-h-screen p-4">
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
            Fill in the details to create and publish your event 
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Event Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Event Name
            </label>
            <input
              name="eventName"
              type="text"
              placeholder="Enter event name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-[#036666]"
              required
            />
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Event Short Description
            </label>
            <textarea
              name="shortDescription"
              rows="3"
              placeholder="Write a short description..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-[#036666]"
            ></textarea>
          </div>

          {/* User Name & Student ID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Your Name
              </label>
              <input
                name="userName"
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-[#036666]"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Student ID
              </label>
              <input
                name="studentId"
                type="text"
                placeholder="Enter student ID"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-[#036666]"
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
                name="eventDate"
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-[#036666]"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Event Time
              </label>
              <input
                name="eventTime"
                type="time"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-[#036666]"
              />
            </div>
          </div>

          {/* Venue */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Event Venue
            </label>
            <input
              name="venue"
              type="text"
              placeholder="Enter venue/location"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-[#036666]"
            />
          </div>

          <div>
  <label className="block text-gray-700 font-semibold mb-1">
    Select Club (Required)
  </label>
  <select
    required
    value={selectedClub}
    onChange={(e) => setSelectedClub(e.target.value)}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-[#036666] cursor-pointer"
  >
    <option value="">Choose a club</option>
    {myClubs.map((club) => (
      <option key={club._id} value={club._id}>
        {club.name}
      </option>
    ))}
  </select>
</div>


          {/* Category */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Event Category
            </label>
            <select
              name="category"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-[#036666] cursor-pointer"
            >
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
              name="banner"
              type="file"
              onChange={(e) => setBannerFile(e.target.files[0])}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-[#036666] file:text-white hover:file:bg-[#024f4f]"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 rounded-lg bg-[#036666] text-white font-bold shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            Add Event
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default AddEvent;
