import { motion } from "framer-motion";
import CountUp from "react-countup";
import { FaUsers, FaCalendarAlt, FaUniversity, FaChartLine } from "react-icons/fa";

const stats = [
  { icon: <FaUniversity className="w-10 h-10 text-primary" />, value: 6000, suffix: "+", label: "Active Students" },
  { icon: <FaCalendarAlt className="w-10 h-10 text-primary" />, value: 250, suffix: "+", label: "Expert Faculty & Staff" },
  { icon: <FaUsers className="w-10 h-10 text-primary" />, value: 100, suffix: "%", label: "Permanent Campus" },
  { icon: <FaChartLine className="w-10 h-10 text-primary" />, value: 10000, suffix: "+", label: "Global Alumni" },
];

export default function Stats() {
  return (
    <section className="bg-base-100 lg:py-24 py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-7xl text-center bg-gradient-to-tl from-black via-primary to-secondary/50 bg-clip-text text-transparent font-bold mb-16"
        >
          Our <span className="text-primary">Impact</span> in Numbers
        </motion.h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="card bg-white shadow-lg hover:shadow-xl transition rounded-2xl p-8 flex flex-col items-center space-y-4"
            >
              {stat.icon}
              <motion.h3
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-gray-900"
              >
                <CountUp end={stat.value} duration={3} />{stat.suffix}
              </motion.h3>
              <p className="text-lg text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
