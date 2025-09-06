import { motion } from "framer-motion";
import UseAuth from "../../../Hooks/UseAuth";
import { Link } from "react-router";

export default function CallToAction() {
    const {user} = UseAuth();
  return (
    <section className="relative overflow-hidden bg-gray-900 text-white py-20 mt-10">
      {/* Animated Blobs Background */}
      <motion.div
        className="absolute top-10 left-10 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl"
        animate={{ x: [0, 40, -40, 0], y: [0, -30, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-10 right-10 w-56 h-56 bg-emerald-500/30 rounded-full blur-3xl"
        animate={{ x: [0, -50, 50, 0], y: [0, 40, -40, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
     
      <motion.div
        className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative max-w-5xl mx-auto px-6 text-center space-y-8">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl lg:text-7xl font-extrabold leading-tight"
        >
          Ready to Explore and Join Your{" "}
          <span className="bg-gradient-to-r from-secondary via-green-200 to-secondary bg-clip-text text-transparent">University Clubs?</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg text-gray-200 max-w-2xl mx-auto"
        >
          Uni-Clubs makes it simple to connect with student communities,
          register for events, and stay updated with all the latest
          announcements — all in one place.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          {
            user ?
             <Link to='/Clubs'>
            <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-6 rounded-xl bg-gradient-to-r from-gray-900/60 to-primary/60 border border-gray-200  text-white font-semibold shadow-lg transition"
          >
            Get Started
          </motion.button>
           </Link>
           :
           <Link to='/auth/login'>
            <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-6 rounded-xl bg-gradient-to-r from-gray-900/60 to-primary/60 border border-gray-200  text-white font-semibold shadow-lg transition"
          >
            Get Started
          </motion.button>
           </Link>
          }


          <Link to='/About'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-6 rounded-xl border border-white hover:bg-secondary  font-semibold transition"
          >
            Learn More
          </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
