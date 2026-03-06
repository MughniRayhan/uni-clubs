import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

export default function MyClubs() {
    const [clubs, setClubs] = useState([]);
    const axiosSecure = UseAxiosSecure();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClubs = async () => {
            try {
                const res = await axiosSecure.get("/club-members/my-clubs");
                setClubs(res.data);
            } catch (error) {
                console.error(error.response?.data);
            }
        };

        fetchClubs();
    }, []);

    return (
        <div className="p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-6">My Clubs</h2>

            {clubs.length === 0 && (
                <div className="flex flex-col items-center bg-white shadow-md rounded-lg max-w-4xl mx-auto p-4 py-6">
                    <h3 className="text-xl font-medium">You are not a member of any club yet.</h3>
                    <Link to='/Clubs' className="mt-3 btn btn-primary cursor-pointer">Explore Clubs</Link>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clubs.map((item) => (
                    <div
                        key={item._id}
                        className="bg-white shadow-md rounded-lg overflow-hidden border-t-2 border-primary"
                    >
                        <img
                            src={item.clubId?.coverImage || "/placeholder.jpg"}
                            alt={item.clubId?.name}
                            className="w-full h-48 object-cover"
                        />

                        <div className="p-4 flex  justify-between ">
                            <div>
                                <h3 className="text-xl font-semibold">
                                    {item.clubId?.name}
                                </h3>

                                <p className="text-gray-500 text-sm mt-1">
                                    Joined on:{" "}
                                    {item.joinedAt
                                        ? new Date(item.joinedAt).toLocaleDateString()
                                        : "N/A"}
                                </p>
                            </div>

                            <button
                                onClick={() =>
                                    navigate(`/clubs/${item.clubId?._id}`)
                                }
                                className="mt-4 btn btn-primary btn-sm"
                            >
                                View
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}