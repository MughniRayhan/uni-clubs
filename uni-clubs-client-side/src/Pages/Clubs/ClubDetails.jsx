import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import Loader from "../../Components/Loader";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import useUserRole from "../../Hooks/useUserRole";
import UseAuth from "../../Hooks/UseAuth";
import axios from "axios";
import { motion } from "framer-motion";
import JoinClubModal from "./JoinClubModal";
import UserAvatar from "../../assets/user_avatar.png";

export default function ClubDetails() {
  const { clubId } = useParams();
  const axiosSecure = UseAxiosSecure();
  const { role } = useUserRole();
  const { user } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [club, setClub] = useState(null);
  console.log("club", club)
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClub, setSelectedClub] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {

    const loadData = async () => {

      try {

        const clubRes = await axiosSecure.get(`/clubs/${clubId}`);
        setClub(clubRes.data);

        const membersRes = await axiosSecure.get(`/club-members/club/${clubId}`);
        setMembers(membersRes.data);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }

    };

    loadData();

  }, [clubId]);

  const handleJoinClick = (club) => {

    if (!user) {
      navigate("/auth/login", {
        state: { from: location.pathname }
      });
      return;
    }

    setSelectedClub(club);
    setOpenModal(true);
  };

  if (loading) return <Loader />;
  if (!club) return <p>Club not found</p>;

  return (
    <div className=" w-full">


      {/* Cover */}
      {/* Banner Cover */}
      {club.coverImage && (
        <motion.div
          className="w-full h-[260px] md:h-[400px] relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.img
            src={club.coverImage}
            alt={club.name}
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          />

          {/* slight dark overlay */}
          <div className="absolute inset-0 bg-black/70"></div>

          {/* title inside banner on bottom center */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 text-center px-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold  text-white drop-shadow-lg">
              {club.name}
            </h1>
          </motion.div>
        </motion.div>
      )}


      {/* Main content area */}
      <div className="mt-10 max-w-7xl mx-auto py-8 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: main column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic details card */}
            <motion.div className="bg-white rounded-xl shadow p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-semibold">About this club</h2>

              </div>


              <div className="mt-4 space-y-2 text-gray-700">
                {club.description && <p className="leading-relaxed">{club.description}</p>}



              </div>

            </motion.div>



          </div>

          {/* Right: sidebar */}
          <aside className="space-y-6">
            <div className="bg-white rounded-xl shadow p-4">
              <p><strong>Leader: </strong>{club?.leader?.displayName || "-"}</p>
              <p><strong>Members:</strong> {members?.length}</p>
              <p className="mt-2"><strong>Contact:</strong> {club.contactPhone || club.contactEmail || "—"}</p>
            </div>
            <button
              className="btn btn-primary w-full"
              onClick={() => handleJoinClick(club)}
            >
              Join
            </button>
          </aside>
        </div>

        {club.leaderCards?.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Club Leaders</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {club.leaderCards.map((leader, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 text-center"
                >
                  <img
                    src={leader.image ? leader.image : UserAvatar}
                    alt={leader.name}
                    className="w-32 h-32 object-cover rounded-full mx-auto"
                  />

                  <h4 className="mt-4 text-lg font-semibold">
                    {leader.name}
                  </h4>

                  <p className="text-gray-500 text-sm">
                    {leader.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}


        {club.sections?.map((section, index) => (
          <div
            key={index}
            className="mt-12 bg-white rounded-xl shadow p-6"
          >
            {section.title && (
              <h2 className="text-2xl font-bold mb-4">
                {section.title}
              </h2>
            )}

            {section.image && (
              <img
                src={section.image}
                alt={section.title}
                className="w-full h-72 object-cover rounded mb-4"
              />
            )}

            <p className="text-gray-700 leading-relaxed">
              {section.description}
            </p>
          </div>
        ))}

        <div className="mt-16">

          {members.length > 0 &&
            <>
              <h2 className="text-2xl font-bold mb-8">
                Club Members
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                {members.map(member => (

                  <div
                    key={member._id}
                    className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 text-center"
                  >

                    <img
                      src={member.userId?.photoURL ? member.userId?.photoURL : UserAvatar}
                      alt={member.userId?.displayName}
                      className="w-24 h-24 object-cover rounded-full mx-auto"
                    />

                    <h4 className="mt-3 font-semibold">
                      {member.userId?.displayName}
                    </h4>

                    <p className="text-sm text-gray-500 capitalize">
                      {member.role}
                    </p>

                  </div>

                ))}

              </div>
            </>
          }

        </div>

      </div>
      {/* JOIN MODAL */}
      {openModal && selectedClub && (
        <JoinClubModal
          club={selectedClub}
          closeModal={() => setOpenModal(false)}
        />
      )}
    </div>
  );
}
