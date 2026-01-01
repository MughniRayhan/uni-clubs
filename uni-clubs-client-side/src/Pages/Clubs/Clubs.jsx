import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Loader from "../../Components/Loader";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import JoinClubModal from "./JoinClubModal";

export default function Clubs() {
  const axiosSecure = UseAxiosSecure();
  const [openModal, setOpenModal] = useState(false);
  const [selectedClub, setSelectedClub] = useState(null);

  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["approvedClubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/clubs/approved");
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  const handleJoinClick = (club) => {
    setSelectedClub(club);
    setOpenModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-4xl font-bold text-center mb-4">
        Explore Our Official University Clubs
      </h2>

      <p className="text-center text-gray-500 max-w-2xl mx-auto mb-12">
        Discover communities that match your passion and field of interest.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {clubs.map((club) => (
          <div
            key={club._id}
            className="bg-white shadow-xl rounded-2xl border-t-2 border-secondary"
          >
            <img
              src={club.coverImage}
              alt={club.name}
              className="h-48 w-full object-cover rounded-t-2xl"
            />

            <div className="p-6 space-y-3">
              <h3 className="text-2xl font-bold">{club.name}</h3>
              <p className="text-gray-600 line-clamp-2">
                {club.description}
              </p>

              <div className="pt-4 grid grid-cols-2 gap-3">
                <Link
                  to={`/clubs/${club._id}`}
                  className="btn btn-outline w-full"
                >
                  View Details
                </Link>

                <button
                  className="btn btn-primary w-full"
                  onClick={() => handleJoinClick(club)}
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        ))}
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
