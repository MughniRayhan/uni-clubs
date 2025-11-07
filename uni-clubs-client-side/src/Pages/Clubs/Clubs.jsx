import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Loader from "../../Components/Loader";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

export default function Clubs() {
  const axiosSecure = UseAxiosSecure();

  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["approvedClubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/clubs/approved");
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-4xl font-bold text-center mb-4">
        Explore Our Official University Clubs
      </h2>
      <p className="text-center text-gray-500 max-w-2xl mx-auto mb-12 ">
        Discover communities that match your passion and field of interest.
        Take part in innovation, leadership, competition, research and cultural
        activities inside the campus — join a club and be part of something impactful.
      </p>

      {clubs.length === 0 && (
        <p className="text-center text-gray-500 text-lg">No approved clubs yet.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {clubs.map((club) => (
          <div
            key={club._id}
            className="group bg-white shadow-xl rounded-2xl border-t-2 border-secondary hover:shadow-2xl transition duration-300"
          >
            <div className="overflow-hidden rounded-t-2xl">
              <img
                src={club.coverImage}
                alt={club.name}
                className="h-48 w-full object-cover group-hover:scale-105 transition-all duration-300"
              />
            </div>

            <div className="p-6 space-y-3">
              <h3 className="text-2xl font-bold text-gray-800">{club.name}</h3>
              <p className=" text-gray-600 line-clamp-2">{club.description}</p>
              <p className=" font-medium text-primary">
                Category: {club.category}
              </p>

              <div className="pt-4 grid grid-cols-2 gap-3">
                <Link
                  to={`/clubs/${club._id}`}
                  className="btn btn-outline w-full"
                >
                  View Details
                </Link>

                <Link
                  to={`/payment/${club._id}`}
                  className="btn btn-primary w-full"
                >
                  Join
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
