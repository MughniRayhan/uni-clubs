import React from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { NavLink } from "react-router";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import Loader from "../../Components/Loader";

export default function Clubs() {
  const axiosSecure = UseAxiosSecure();

  // Fetch approved clubs
  const { data: clubs = [], isLoading, refetch } = useQuery({
    queryKey: ["approvedClubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/approved-clubs");
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl md:text-5xl text-center font-bold mb-8">Explore Our Clubs</h1>

      {clubs.length === 0 ? (
        <p className="text-gray-600">No approved clubs available at the moment.</p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club) => (
            <div
              key={club._id}
              className="bg-white shadow-lg rounded-2xl flex flex-col hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Cover Image */}
              {club.coverImage && (
                <img
                  src={club.coverImage}
                  alt={club.clubName}
                  className="w-full h-40 object-cover rounded-t-2xl"
                />
              )}

              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{club.clubName}</h2>
                  <p className="text-sm text-gray-500 mb-4">{club.category}</p>
                </div>
                <div className="flex gap-4 mt-4">
                  <NavLink
                    to={`/clubs/${club._id}`}
                    className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    View Club
                  </NavLink>
                  <button
                    className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Join Club
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
