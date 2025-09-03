import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const messages = [
  "Join and explore university clubs",
  "Register for upcoming events easily",
  "Get announcements and notifications instantly",
  "Track your participation and engagement"
];

export default function BannerMessages() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 3000); // change message every 3 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.p
      key={index} // forces animation when text changes
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="text-lg md:text-xl text-emerald-300 font-medium mt-4 bg-white/10 inline-block px-3 py-1 rounded-lg"
    >
      {messages[index]}
    </motion.p>
  );
}
