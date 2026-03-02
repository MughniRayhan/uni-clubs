import React from "react";
import { motion } from "framer-motion";
import aboutBanner from "../../../assets/about.png";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const Overview = () => {
  return (
    
    <section className="bg-[#f4f6f9] mb-15">
      <div className="max-w-screen-xl mx-auto px-6">
        {/* ================= HERO/BANNER ================= */}
        {/* <div className="relative h-[500px] w-full mb-20">
          <img
            src={aboutBanner}
            alt="Overview Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-6">
            <motion.h1
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold text-white"
            >
              Genesis & History
            </motion.h1>

            <motion.p
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.8 }}
              className="text-gray-200 mt-6 max-w-3xl"
            >
              From a visionary beginning in 2003 to becoming a premier seat of learning,
              Metropolitan University continues to shape future leaders.
            </motion.p>
          </div>
        </div> */}
        <div className="mt-20">
          <h1 className="text-center  text-blue-900  text-5xl font-bold">
            University Overview{" "}
          </h1>
        </div>
        {/* ================= GENESIS & HISTORY ================= */}
        <div className="mt-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-10 bg-blue-800"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900 uppercase">
              Genesis & History
            </h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-gray-700 text-[18px] leading-relaxed max-w-6xl"
          >
            The commencement of the WTO regime alongside rapid ICT growth
            created a paradigm shift for developing nations. Recognizing the
            need for skilled manpower, the Government enacted the Private
            University Act. In early 2000s, Sylhet faced limited higher
            education opportunities. Dr. Toufique Rahman Chowdhury founded
            Metropolitan University, officially launched on 3 May 2003 with 17
            students, evolving into a premier seat of learning.
          </motion.p>
        </div>

        {/* ================= KEY STATISTICS ================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-20">
          {[
            { value: "2003", label: "Academic Journey Began" },
            { value: "10,000+", label: "Graduates Produced" },
            { value: "6,000+", label: "Enrolled Students" },
            { value: "8.5 Acre", label: "Permanent Campus" },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-sm"
            >
              <h3 className="text-3xl font-extrabold text-blue-900">{item.value}</h3>
              <p className="text-gray-600 mt-2 text-[18px]">{item.label}</p>
            </motion.div>
          ))}
        </div>

        {/* ================= FOUNDER'S VISION ================= */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-10 bg-blue-800"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900 uppercase">
              The Founder's Vision
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Founder Info Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm"
            >
              <h3 className="text-green-700 font-semibold text-xl mb-2">
                Dr. Toufique Rahman Chowdhury
              </h3>
              <p className="font-semibold text-gray-800 mb-4">
                Founder & Chairman (Emeritus)
              </p>

              <p className="text-gray-700 leading-relaxed text-[15px]">
                A PhD holder in Development Economics from the USA and a
                graduate of the University of Dhaka, Dr. Chowdhury brings
                decades of high-level banking experience to education. His
                leadership blends academic rigor with entrepreneurial spirit.
              </p>
            </motion.div>

            {/* Quote Box */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-blue-50 border-l-4 text-[18px] border-blue-800 rounded-lg p-8 text-blue-900 italic shadow-sm"
            >
              “The sight of young minds striving for knowledge is far more
              rewarding than having trillions in a bank account. Complete
              student care is our religion.”
            </motion.div>
          </div>
        </div>

        {/* ================= CAMPUS & INFRASTRUCTURE ================= */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-10 bg-blue-800"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900 uppercase">
              Campus & Infrastructure
            </h2>
          </div>

          <p className="text-gray-700 mb-8 text-[16px] max-w-5xl">
            Moving from its initial city campus, the university now resides in a
            sprawling permanent campus designed to be architecturally iconic,
            providing a sanctuary for research and learning.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Modern Facilities */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
            >
              <h3 className="text-blue-800 text-xl font-semibold mb-4">
                Modern Facilities
              </h3>
              <ul className="space-y-2 text-gray-700 text-xl">
                <li>
                  <strong>Library:</strong> 50,000+ volumes & journals.
                </li>
                <li>
                  <strong>IT Infrastructure:</strong> 24/7 fiber internet.
                </li>
                <li>
                  <strong>Environment:</strong> Fully AC academic blocks.
                </li>
                <li>
                  <strong>Labs:</strong> Engineering & computing labs.
                </li>
              </ul>
            </motion.div>

            {/* Residential & Support */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
            >
              <h3 className="text-blue-800 text-xl font-semibold mb-4">
                Residential & Support
              </h3>
              <ul className="space-y-2 text-gray-700 text-xl">
                <li>
                  <strong>Housing:</strong> Female hostel facility.
                </li>
                <li>
                  <strong>Counseling:</strong> Professional support body.
                </li>
                <li>
                  <strong>Transport:</strong> Dedicated shuttle service.
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
      {/* ================= ACADEMIC & STUDENT INFO ================= */}
      <section className="bg-[#f4f6f9] py-20">
        <div className="max-w-screen-xl mx-auto px-6 space-y-16">
          {/* Academic Departments */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6 border-l-4 border-blue-800 pl-4">
              Academic Departments
            </h2>

            <div className="grid md:grid-cols-2 gap-6 text-gray-700 text-sm">
              <ul className="border text-xl rounded-lg p-4 space-y-1">
                <li>Science & Technology</li>
                <li>Computer Science & Engineering (CSE)</li>
                <li>Software Engineering</li>
                <li>Data Science</li>
                <li>Electrical & Electronic Engineering (EEE)</li>
              </ul>
              <ul className="border rounded-lg p-4  text-xl space-y-1">
                <li>Business & Humanities</li>
                <li>Business Administration</li>
                <li>Economics</li>
                <li>English</li>
                <li>Law & Justice</li>
                <li>Journalism and Media Studies (Proposed)</li>
              </ul>
            </div>
          </div>

          {/* Offered Degree Programmes */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6 border-l-4 border-blue-800 pl-4">
              Offered Degree Programmes
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left border border-gray-300">
                <thead className="bg-blue-900 text-white">
                  <tr>
                    <th className="px-4  text-xl py-2">Category</th>
                    <th className="px-4 text-xl  py-2">Programmes Offered</th>
                  </tr>
                </thead>
                <tbody className="bg-white text-gray-900">
                  <tr className="border-b border-gray-300">
                    <td className="px-4 tex-xl py-2 font-semibold">Honours</td>
                    <td className="px-4 py-2">
                      BSc. in CSE, Software Engineering, EEE, ETC; BBA, B.A.
                      (Hons.) in English, BSS in Economics, LL.B. (Hons.)
                    </td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="px-4 py-2 font-semibold">Masters</td>
                    <td className="px-4 py-2">
                      MBA (Regular & General), M.A. in English (Prelim & Final),
                      LL.M. (1 & 2 Year), MSc. in MIS, MSS in Economics
                    </td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="px-4 py-2 font-semibold">Specialized</td>
                    <td className="px-4 py-2">
                      Android Application Development, Microcontroller
                      Programming, Journalism & Media Studies
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-2 text-green-600 text-sm">
                Feature: Free 3-month English Language Camp for every trimester
              </p>
            </div>
          </div>

          {/* Student Life & Organizations */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6 border-l-4 border-blue-800 pl-4">
              Student Life & Organizations
            </h2>

            <p className="text-gray-700 mb-4 text-[16px]">
              We believe in the holistic development of our students. The
              following organizations actively engage students in leadership,
              culture, and social service:
            </p>

            <div className="flex flex-wrap gap-2">
              {[
                "MU Sports Club",
                "MU Cultural Club",
                "MU Business Club",
                "MU Law Forum",
                "MU Blood Donation Club",
                "Rover Scout Group",
                "MU Music Club (Jammers)",
              ].map((org, index) => (
                <span
                  key={index}
                  className="bg-white border border-gray-300 rounded-full px-4 py-1 text-sm text-gray-700 shadow-sm"
                >
                  {org}
                </span>
              ))}
            </div>
          </div>

          {/* Scholarships & Financial Aid */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6 border-l-4 border-blue-800 pl-4">
              Scholarships & Financial Aid
            </h2>

            <div className="grid md:grid-cols-2 gap-6 text-gray-700 text-xl">
              <div>
                <p>
                  <strong>Merit Based:</strong> Chairman’s & VC’s Merit
                  Scholarships.
                </p>
                <p>
                  <strong>Social Support:</strong> Wards of Freedom Fighters &
                  Ethnic Minorities.
                </p>
                <p>
                  <strong>Inclusion:</strong> Female students & students with
                  disabilities.
                </p>
              </div>
              <div>
                <p>
                  <strong>Excellence:</strong> Chancellor’s Award (Gold Medal &
                  Cash Prize).
                </p>
                <p>
                  <strong>Athletics:</strong> Waivers for outstanding national
                  athletes.
                </p>
                <p>
                  <strong>Needs-Based:</strong> Economically disadvantaged
                  student support.
                </p>
              </div>
            </div>
          </div>

          {/* Legacy of Excellence */}
          <div className="bg-blue-900 text-white rounded-lg p-8 text-center">
            <h3 className="text-xl md:text-2xl font-bold mb-4">
              A Legacy of Excellence
            </h3>
            <p className="text-sm md:text-base">
              With over 10,000 success stories globally, Metropolitan University
              remains dedicated to academic rigor, ethics, and the pursuit of
              knowledge.
            </p>
            <p className="mt-2 text-gray-300 text-xs">
              IQAC Certified • Research Driven • Student Centric
            </p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Overview;
