import React from "react";
import { motion } from "framer-motion";
import aboutBanner from "../../../assets/about.png";

const Strategies = () => {
  const strategies = [
    {
      number: "01",
      text: "Giving our students real world industrial exposure through industry-academia collaboration and active alumni engagement.",
    },
    {
      number: "02",
      text: "Providing students with technological orientations that enhance capabilities for thriving in the knowledge economy.",
    },
    {
      number: "03",
      text: "Promoting co-curricular and extra-curricular activities to ensure comprehensive development of the students.",
    },
    {
      number: "04",
      text: "Engaging faculty in active research and pedagogic programs to harness teaching and research potentials.",
    },
    {
      number: "05",
      text: "Maintaining ideal R&D facilities suitable for postgraduate and doctoral research and development projects.",
    },
    {
      number: "06",
      text: "Updating the curriculum and requisites to accommodate changing national priorities and global developments.",
    },
  ];

  return (
    <section>
      <div className="relative w-full h-[400px] md:h-[500px]">
        <img
          src={aboutBanner}
          alt="About Banner"
          className="w-full h-full object-cover"
        />

        {/* Optional Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold">
            Our Strategies
          </h1>
        </div>
      </div>
      <div className="bg-base-100 py-20">
        <div className="max-w-screen-xl mx-auto px-6">

          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Our Strategies
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              In order to materialize the mission we pursue strategies including—but not limited to—the following:.
            </p>
          </div>

          {/* Grid - 2 Cards Per Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {strategies.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative bg-base-200 p-8 rounded-2xl 
                         border border-transparent
                         hover:border-primary
                         hover:shadow-2xl
                         hover:-translate-y-2
                         transition-all duration-300 ease-in-out"
              >
                {/* Strategy Number */}
                <div className="absolute -top-5 left-6 bg-gradient-to-r from-primary to-secondary text-white text-lg font-bold px-4 py-2 rounded-lg shadow-md">
                  {item.number}
                </div>

                {/* Text */}
                <p className="text-gray-600 leading-relaxed mt-6">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Strategies;