import React from "react";
import { motion } from "framer-motion";
import aboutBanner from "../../../assets/about.png"; // adjust path if needed

const History = () => {
  const timeline = [
    { year: "2018", text: "Celebrating Fifteen Years of Success in Quality Education." },
    { year: "2017", text: "Inauguration of Permanent Campus." },
    { year: "2016", text: "Celebrated thirteen years of Excellence in Education." },
    { year: "2015", text: "Second Convocation of the University." },
    { year: "2014", text: "Membership of the Accreditation Service for International Schools, Colleges & Universities." },
    { year: "2013", text: "Celebrated Ten years of Serving the country through ensuring quality higher education." },
    { year: "2012", text: "Opening of Department of Electrical & Electronic Engineering." },
    { year: "2011", text: "Land procurement for permanent campus within Sylhet city." },
    { year: "2010", text: "The First Convocation of the University held." },
    { year: "2009", text: "Membership of the Association of Commonwealth Universities." },
    { year: "2008", text: "Collaboration with Birmingham City University, UK." },
    { year: "2007", text: "Over 1000 regular students in four schools and five departments." },
    { year: "2006", text: "Recognized as one of the most prospective Universities & ranked among top 15 in Bangladesh." },
    { year: "2005", text: "Opening of Faculty of Humanities & Social Sciences and Law." },
    { year: "2004", text: "Opening of modern campus with high-speed backbone network." },
    { year: "2003", text: "Establishment of the University, approved by the UGC & Government of Bangladesh." },
  ];

  return (
    <>
      {/* 🔥 Banner Section (Added) */}
      <div className="relative w-full h-[400px] md:h-[500px]">
        <img
          src={aboutBanner}
          alt="About Banner"
          className="w-full h-full object-cover"
        />

        {/* Optional Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold">
            Our University History
          </h1>
        </div>
      </div>

      {/* Original Section (Unchanged) */}
      <section className="bg-base-100 py-20">
        <div className="max-w-screen-xl mx-auto px-6">

          {/* Section Title */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
               History
            </h2>

            <p className="text-gray-700 lg:text-xl lg:ml-20 mt-4 max-w-6xl leading-relaxed">
              A remarkable fact about Bangladesh is that its economy is growing
              rapidly as is its large youthful population. 34 percent of its 160
              million people are aged 15 or younger, and the country has an
              opportunity to realize the full benefit of this “demographic
              dividend’ in the years ahead — but only if it can provide education
              and training to the millions of students who need it. Indeed, the
              country has seen a tremendous increase in enrolment over the last
              decade or so. Total tertiary enrolment has more than tripled since
              2000. The strength of public universities was direly insufficient to
              keep up with this phenomenal increase in the demand for higher
              education. Against this backdrop, there was a change in the age-old
              notion that the state alone is to shoulder the burden of tertiary
              education and accommodating the private universities to share this
              national duty, of course, without making any compromise in academic
              excellence and other matrices of higher university education.
              Metropolitan University joins this historic shift to bring quality
              higher education at affordable cost to the doorsteps of the
              students. With the approval of the Ministry of Education under the
              Private University Act of 1992 (which was amended first in 1998 and
              then again in 2010), Metropolitan University came into being on 3rd
              May 2003. Dr. Toufique Rahman Chowdhury, an educationist and a
              promising entrepreneur of the country initiated the idea of founding
              Metropolitan University with the direct participation and assistance
              of a few of his close friends, acquaintances, and associates.
            </p>
          </div>

          {/* Timeline Grid (Unchanged) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="relative bg-base-200 p-8 rounded-2xl
                           border border-transparent
                           hover:border-primary
                           hover:shadow-2xl
                           hover:-translate-y-2
                           transition-all duration-300 ease-in-out"
              >
                <div className="absolute -top-5 left-6 bg-gradient-to-r from-primary to-secondary text-white font-bold px-4 py-2 rounded-lg shadow-md">
                  {item.year}
                </div>

                <p className="text-gray-600 leading-relaxed mt-6">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

export default History;