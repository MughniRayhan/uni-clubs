import React from "react";
import leader1 from "../../../assets/Leader/leader1.png";
import leader2 from "../../../assets/Leader/leader2.png";
import leader3 from "../../../assets/Leader/leader3.png";

const Leadership = () => {
  const leaders = [
    {
      img: leader1,
      name: "Dr. Toufique Rahman Chowdhury",
      profession: "Founder & Chairman (Emeritus)",
      subtitle:
        "The visionary pioneer who established Metropolitan University with a mission to provide world-class education in Sylhet.",
    },
    {
      img: leader2,
      name: "Mr. Tanwir Rahman Chowdhury",
      profession: "Chairman, Board of Trustees",
      subtitle:
        "Leading the university’s strategic growth and modernization efforts to ensure excellence in higher education and campus infrastructure.",
    },
    {
      img: leader3,
      name: "Professor Dr. Mohammad Jahirul Hoque",
      profession: "Vice Chancellor",
      subtitle:
        "Dedicated to fostering academic integrity, research innovation, and a vibrant learning culture for all MU students.",
    },
  ];

  return (
    <section className="bg-base-100 py-20">
      <div className="max-w-screen-2xl mx-auto px-6 text-center">

        {/* Section Title */}
        <h2 className="text-3xl md:text-5xl font-bold mb-14 bg-gradient-to-tl from-black via-primary to-secondary/50 bg-clip-text text-transparent">
          University Leadership
        </h2>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {leaders.map((leader, index) => (
            <div
              key={index}
              className="card bg-base-200
                         border-2 border-transparent
                         hover:border-primary
                         hover:ring-4 hover:ring-primary/20
                         hover:scale-105
                         shadow-lg hover:shadow-2xl
                         transition-all duration-300 ease-in-out
                         rounded-2xl overflow-hidden"
            >
              {/* Image Section */}
              <div className="bg-white flex items-center justify-center h-80">
                <img
                  src={leader.img}
                  alt={leader.name}
                  className="max-h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Card Content */}
              <div className="p-6 text-center space-y-3">
                <h3 className="text-xl font-semibold">
                  {leader.name}
                </h3>

                <p className="text-primary font-medium">
                  {leader.profession}
                </p>

                <p className="text-gray-500 text-sm leading-relaxed">
                  {leader.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Leadership;