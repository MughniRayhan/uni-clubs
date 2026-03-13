import React from "react";
import { motion } from "framer-motion";
import aboutBanner from "../../../assets/about.png";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const Overview = () => {
  return (

    <section className="bg-white ">
      <div className="relative w-full h-[400px] md:h-[500px]">
        <img
          src={aboutBanner}
          alt="About Banner"
          className="w-full h-full object-cover"
        />

        {/* Optional Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold">
            Overview of University
          </h1>
        </div>
      </div>
      {/* ================= ACADEMIC & STUDENT INFO ================= */}
      <section className="bg-white py-20">
        <div className="max-w-screen-xl mx-auto px-6 space-y-16">
          {/* Academic Departments */}
          <div>
            <h2 className="text-2xl md:text-4xl font-semibold text-blue-900 mb-6 border-l-4 border-blue-800 pl-4">
              Academic Departments
            </h2>

            <div className="grid md:grid-cols-2 gap-6 text-gray-700 text-sm">
              <ul className="border border-gray-300 text-lg rounded-lg p-4 space-y-1">
                <li>Science & Technology</li>
                <li>Computer Science & Engineering (CSE)</li>
                <li>Software Engineering</li>
                <li>Data Science</li>
                <li>Electrical & Electronic Engineering (EEE)</li>
              </ul>
              <ul className="border  border-gray-300 rounded-lg p-4  text-lg space-y-1">
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
            <h2 className="text-2xl md:text-4xl font-semibold text-blue-900 mb-6 border-l-4 border-blue-800 pl-4 mt-4">
              Offered Degree Programmes
            </h2>

            <div className="overflow-x-auto rounded">
              <table className="w-full text-left border border-gray-300 rounded">
                <thead className="bg-blue-900 text-white rounded-xl">
                  <tr>
                    <th className="px-4  text-xl py-2">Category</th>
                    <th className="px-4 text-xl  py-2">Programmes Offered</th>
                  </tr>
                </thead>
                <tbody className="bg-white text-gray-900">
                  <tr className="border-b border-gray-300">
                    <td className="px-4  py-2 font-semibold">Honours</td>
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
            <h2 className="text-2xl  md:text-4xl font-semibold mt-4 text-blue-900 mb-6 border-l-4 border-blue-800 pl-4">
              Student Life & Organizations
            </h2>

            <p className="text-gray-700 mb-4 ">
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
            <h2 className="text-2xl  md:text-4xl font-semibold mt-4 text-blue-900 mb-6 border-l-4 border-blue-800 pl-4">
              Scholarships & Financial Aid
            </h2>

            <div className="grid md:grid-cols-2 gap-6 text-gray-700 ">
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
          <div className="bg-blue-900 text-white rounded-lg p-8 text-center mt-10">
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
