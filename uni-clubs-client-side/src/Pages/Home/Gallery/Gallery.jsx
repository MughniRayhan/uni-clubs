import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react"; // for the icon

const mediaItems = [
  { 
    type: "image", 
    src: "https://wp-media.petersons.com/blog/wp-content/uploads/2019/11/04133514/Student-Club-2.jpg",
    title: "Student Club"
  },
  { 
    type: "image", 
    src: "https://wpc.sched.com/wp-content/uploads/2024/10/college-event-ideas.webp",
    title: "Event Club"
  },
  { 
    type: "image", 
    src: "https://www.shutterstock.com/image-vector/vector-sport-club-sports-ball-260nw-619454717.jpg",
    title: "Sports Club"
  },
  { 
    type: "image", 
    src: "https://static01.nyt.com/images/2016/08/19/arts/24iht-rfrcclubbing-1/24iht-rfrcclubbing-1-superJumbo.jpg",
    title: "Music Club"
  },
];

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(1);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % mediaItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Get visible slides (previous, current, next)
  const getVisibleSlides = () => {
    const prev = (activeIndex - 1 + mediaItems.length) % mediaItems.length;
    const next = (activeIndex + 1) % mediaItems.length;
    return [prev, activeIndex, next];
  };

  return (
    <div>
      <h2 className="text-3xl lg:mt-10 md:text-5xl text-center bg-gradient-to-tl from-black via-primary to-secondary/50 bg-clip-text text-transparent font-bold mb-4">
        Gallery & Media
      </h2>

      <section className="w-full py-16 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <div className="flex justify-center items-center space-x-6">
            {getVisibleSlides().map((index) => {
              const item = mediaItems[index];
              const isActive = index === activeIndex;

              return (
                <motion.div
                  key={index}
                  animate={{ scale: isActive ? 1.1 : 0.9, opacity: isActive ? 1 : 0.4 }}
                  transition={{ duration: 0.6 }}
                  className={`relative rounded-xl overflow-hidden shadow-xl ${
                    isActive ? "ring-4 ring-secondary " : "pointer-events-none"
                  }`}
                  style={{ width: "400px", height: "300px" }}
                >
                  {/* Image / Video */}
                  {item.type === "image" ? (
                    <img
                      src={item.src}
                      alt={`media-${index}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={item.src}
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                    />
                  )}

                  {/* Overlay with text */}
                  <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4">
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <button className="mt-2 flex items-center gap-2 text-sm text-yellow-300 hover:text-yellow-400">
                      Read More <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
