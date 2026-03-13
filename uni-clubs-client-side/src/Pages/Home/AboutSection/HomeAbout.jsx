import React from 'react';
import { motion } from "framer-motion";
import { FaUsers, FaBell, FaEye, FaBullseye, FaHistory } from "react-icons/fa";
import { GiAbstract091 } from "react-icons/gi";
import { CiCircleInfo } from "react-icons/ci";
import { Link } from "react-router";
import aboutImage from "../../../assets/about.png";

const HomeAbout = () => {
  return (
    <div>
      <section
        className="bg-base-100 py-20"
        data-aos="fade-up"
        data-aos-duration="2000"
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-3xl md:text-7xl bg-gradient-to-tl from-black via-primary to-secondary/50 bg-clip-text text-transparent font-bold mb-4"
          >
            About Us
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-lg text-gray-500 max-w-3xl mx-auto mb-8"
          >
            Metropolitan University, Sylhet, Bangladesh is a leading private
            university committed to quality education, innovative research, and
            holistic student development.
          </motion.p>

          <div className='flex flex-col md:flex-row justify-center items-center gap-6 mb-4'>
            <div>
              <motion.img src={aboutImage} alt="about"
                className="rounded-3xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }} />

            </div>
            <div>
              {/* Mission & Vision */}
              <div  >
                <div className="card p-10 space-y-4 text-left">
                  <div className='flex items-center gap-3'>
                    <FaBullseye className="w-10 h-10 text-primary bg-white rounded-full shadow-md p-2" />
                    <h3 className="text-2xl font-semibold">Our Mission</h3>
                  </div>
                  <p className="text-gray-600">
                    1 .
                    To provide our students with globally compatible tertiary education characterized by academic excellence in a range of subjects pertinent to the present and future social needs.  <br /><br />

                    2 .
                    To provide our students with the necessary lessons on moral values, ethics, self-respect, and patriotism.  <br /><br />

                    3 .
                    To provide a stimulating learning environment where our students can prepare themselves for pursuing their academic, personal, and career goals.
                  </p>
                  <div className='flex items-center gap-3'>
                    <FaEye className="w-10 h-10 text-primary bg-white rounded-full shadow-md p-2" />
                    <h3 className="text-2xl font-semibold">Our Vision</h3>
                  </div>
                  <p className="text-gray-600">
                    To emerge as a distinguished teaching and research university
                    recognized around the globe through innovative education,
                    creation and application of knowledge, and community engagement
                  </p>
                </div>


              </div>


            </div>

          </div>
          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
            {[
              {
                icon: <CiCircleInfo className="w-10 h-10 text-primary " />,
                title: "Overview",
                desc: "University Overview.",
                path: "/Overview",
              },
              {
                icon: <FaHistory className="w-10 h-10 text-primary" />,
                title: "Legacy and History",
                desc: "Explore our journey and milestones.",
                path: "/history",
              },
              {
                icon: <GiAbstract091 className="w-10 h-10 text-primary" />,
                title: "Our Strategies",
                desc: "order to materialize the mission we pursue strategies including.",
                path: "/Strategies",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="card cursor-pointer bg-gradient-to-br from-secondary/20 via-white/60 to-primary/5 shadow-lg hover:shadow-xl transition rounded-2xl p-6 space-y-4"
              >
                <Link to={feature.path} className="block h-full">

                  <div className="">{feature.icon}</div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>

                  <p className="text-gray-500">{feature.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeAbout;