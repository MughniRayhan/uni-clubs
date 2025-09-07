import { motion } from "framer-motion";

const benefits = [
  "All-in-one Platform",
  "Instant Notifications",
  "Reduce Manual Work",
  "Better Student Engagement",
  "Easy Member Management"
];

const BenefitsSection = () => {
  return (
    <section className="bg-gradient-to-tl from-primary/20 via-transparent to-primary/10 px-10  py-20"  data-aos="fade-up" data-aos-duration="2000"
   
    >
      <div className="container mx-auto px-4 ">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl text-center bg-gradient-to-tl from-black via-primary to-secondary/50 bg-clip-text text-transparent font-bold mb-4"
        >
          Benefits of UniClubs
        </motion.h2>
       
        <div className="lg:flex lg:gap-12 mt-12 items-center">
<div className="relative lg:w-1/2 ">
  {/* Vertical Line */}
  <div className="absolute left-0 transform -translate-x-1/2 w-1 h-full bg-gradient-to-r from-primary to-secondary"></div>

  {benefits.map((item, id) => (
    <div key={id} className="flex flex-col items-start mb-4 relative w-full">
      {/* Circle */}
      <div className="absolute left-0 transform -translate-x-1/2 bg-gray-800 border-2  w-4 h-4 rounded-full shadow-2xl shadow-secondary z-10"></div>

      {/* Animated Card */}
      <motion.div
        initial={{ scaleX: 0.9 }}
        whileInView={{ scaleX: [0.9, 1, 0.9]}}
        transition={{
          delay: id * 0.7,
          duration: 1.5,
          ease: "easeInOut",
        }}
        className=" w-full p-4 py-5 border ml-1 border-secondary rounded-r-2xl bg-gradient-to-r from-gray-900 via-primary to-primary/90 backdrop-blur-lg origin-left hover:scale-105 duration-200"
      >
        <h3 className="font-semibold text-center text-lg text-white">{item}</h3>
      </motion.div>
    </div>
  ))}
</div>



  {/* Vertical Line */}


          {/* Right Column - Description */}
          <div 
          className="lg:w-full mt-10 lg:mt-0  p-6 shadow-md shadow-gray-300 bg-gradient-to-br from-green-200/20 via-transparent to-green-200/10 rounded-2xl relative">
            {/* vertical line */}
          <div className="absolute  left-0 transform -translate-x-1/2 w-1 h-full top-0 bg-gradient-to-r from-primary to-secondary"></div>

            <div className="absolute left-0 transform -translate-x-1/2 bg-gradient-to-r from-gray-900 to-secondary   w-4 h-4 rounded-full shadow-2xl shadow-secondary z-10"></div>
           
            <div className="text-gray-700 text-lg">
              Traditional systems like Google Forms, Facebook groups, and spreadsheets often result in scattered information, inconsistent communication, and increased administrative workload for both students and club coordinators. Important announcements may get lost, attendance tracking becomes cumbersome, and event registrations require repetitive manual handling.<br/><br />
              
              <div className="absolute left-0 transform -translate-x-1/2 bg-gradient-to-r from-gray-900 to-secondary   w-4 h-4 rounded-full shadow-2xl shadow-secondary z-10"></div>
              
              Uni-Clubs solves these challenges by centralizing all club-related activities into a single, intuitive platform. With features like automated notifications, event scheduling, membership management, and real-time updates, students and coordinators can stay connected effortlessly. The platform also provides interactive dashboards for tracking participation, managing approvals, and monitoring event performance, significantly reducing manual errors.<br/><br />
              
              <div className="absolute left-0 transform -translate-x-1/2 bg-gradient-to-r from-gray-900 to-secondary   w-4 h-4 rounded-full shadow-2xl shadow-secondary z-10"></div>
              
              By streamlining operations and improving communication, Uni-Clubs not only saves time but also enhances student engagement and collaboration across campus. Clubs can run more efficiently, events reach a wider audience, and students experience a more organized and enjoyable extracurricular environment. Overall, Uni-Clubs transforms university club management into a modern, digital-first experience, eliminating the inefficiencies and limitations of traditional manual systems.
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
