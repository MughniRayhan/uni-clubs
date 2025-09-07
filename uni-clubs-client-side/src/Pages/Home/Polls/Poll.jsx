import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { FaArrowRightLong } from "react-icons/fa6";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import { Link } from "react-router";

const Polls = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([
    { id: 1, name: "🎶 Music Night", votes: 0 },
    { id: 2, name: "💻 Tech Workshop", votes: 0 },
    { id: 3, name: "⚽ Sports Fest", votes: 0 },
    { id: 4, name: "🎭 Drama Festival", votes: 0 },
    { id: 5, name: "📚 Book Fair", votes: 0 },
    { id: 6, name: "🎨 Art Exhibition", votes: 0 },
    { id: 7, name: "🎤 Debate Competition", votes: 0 },
    { id: 8, name: "🎬 Film Screening", votes: 0 },
    { id: 9, name: "🏆 Hackathon", votes: 0 },
    { id: 10, name: "🧩 Quiz Night", votes: 0 },
  ]);

  // ✅ Show only first 6 clubs
  const limitedEvents = events.slice(0, 6);

  const handleVote = (id) => {
    if (!user) {
      toast.error("Please login to vote!");
      return;
    }
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id ? { ...event, votes: event.votes + 1 } : event
      )
    );
    toast.success("✅ Your vote has been added!");
  };

  return (
    <div className="bg-gradient-to-tl from-primary/20 via-transparent to-primary/10 px-10 py-20" data-aos="fade-up" data-aos-duration="2000">
      <div className="p-6 max-w-5xl mx-auto">
        <motion.h2
          className="text-3xl lg:mt-10 md:text-5xl text-center bg-gradient-to-tl from-black via-primary to-secondary/50 bg-clip-text text-transparent font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          🎉 Club Voting Section
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {limitedEvents.map((event, index) => (
            <motion.div
              key={event.id}
              className="flex justify-between items-center bg-gradient-to-r from-blue-100 to-blue-50 p-5 rounded-2xl shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ scale: 1.03 }}
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {event.name}
                </h3>
                <motion.span
                  key={event.votes}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-blue-600 font-bold"
                >
                  {event.votes} votes
                </motion.span>
              </div>

              <motion.button
                onClick={() => handleVote(event.id)}
                whileTap={{ scale: 0.9 }}
                className={`px-4 py-2 rounded-xl shadow-md font-medium ${
                  user
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
              >
                {user ? "Vote" : <Link to="/auth/login">Login Required</Link>}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* ✅ Button goes to AllPolls page */}
        <Link to="/AllPolls">
          <div className="flex justify-center text-primary items-center gap-x-2 mt-10 hover:text-secondary font-semibold">
            <h1 className="text-2xl font-bold">Show More Polls</h1>
            <FaArrowRightLong />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Polls;
