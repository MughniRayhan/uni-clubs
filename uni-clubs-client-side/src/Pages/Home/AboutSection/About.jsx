import { motion } from "framer-motion";
import { FaUsers, FaCalendarAlt, FaBell, FaEye, FaBullseye } from "react-icons/fa";

export default function About() {
  return (
    <section className="bg-base-100 py-20"  data-aos="fade-up" data-aos-duration="2000" >
      <div className="max-w-6xl mx-auto px-6 text-center">
        
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl bg-gradient-to-tl from-black via-primary to-secondary/50 bg-clip-text text-transparent font-bold mb-4"
        >
          About <span className="">Us</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-lg text-gray-500 max-w-3xl mx-auto mb-12"
        >
          Uni-Clubs is a centralized platform designed to make university club 
          management effortless. From joining clubs and registering for events 
          to staying updated with announcements, Uni-Clubs connects students, 
          leaders, and admins in one seamless system.
        </motion.p>

                {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
       
          <div
           
            className="card bg-base-200 shadow-lg hover:shadow-xl transition rounded-2xl p-10 space-y-4 text-left"
          >
            <FaBullseye className="w-10 h-10 text-primary" />
            <h3 className="text-2xl font-semibold relative inline-block">
              Our Mission
              <motion.span
                initial={{ scaleX: 0 }}         
                whileInView={{ scaleX: 1 }}     
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                style={{
                  transformOrigin: "left",   
                }}
                className="hidden lg:block absolute left-0 right-0 -bottom-2 h-[2px] bg-gradient-to-r from-primary to-secondary/20 rounded-full"
              />
          </h3>
            <p className="text-gray-600 ">
              To simplify student engagement by providing a unified digital 
              platform that eliminates manual club management and ensures 
              smooth participation in all university events.
            </p>
 
          </div>
    

          <div
            
            className="card bg-base-200 shadow-lg hover:shadow-xl transition rounded-2xl p-10 space-y-4 text-left"
          >
            <FaEye className="w-10 h-10 text-primary" />
            <h3 className="text-2xl font-semibold relative inline-block">
              Our Vision
             <motion.span
               initial={{ scaleX: 0 }}        
               whileInView={{ scaleX: 1 }}     
               viewport={{ once: true }}
               transition={{ duration: 0.8, ease: "easeInOut" }}
               style={{
                 transformOrigin: "right",   
               }}
               className="hidden lg:block absolute left-0 right-0 -bottom-2 h-[2px] bg-gradient-to-r from-primary/70 to-secondary/20 rounded-full"
             />
           </h3>
            <p className="text-gray-600">
              To build a future-ready university ecosystem where technology 
              enhances student involvement, fosters collaboration, and 
              strengthens the campus community.
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <FaUsers className="w-10 h-10 text-primary" />,
              title: "Seamless Membership",
              desc: "Easily join and manage club memberships without paperwork."
            },
            {
              icon: <FaCalendarAlt className="w-10 h-10 text-primary" />,
              title: "Event Registration",
              desc: "Discover and register for events with a single click."
            },
            {
              icon: <FaBell className="w-10 h-10 text-primary" />,
              title: "Real-Time Notifications",
              desc: "Stay updated with instant announcements and reminders."
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="card bg-gradient-to-br from-secondary/20 via-white/60 to-primary/5 shadow-lg hover:shadow-xl transition rounded-2xl p-6 space-y-4"
            >
              <div className="flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-500">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
