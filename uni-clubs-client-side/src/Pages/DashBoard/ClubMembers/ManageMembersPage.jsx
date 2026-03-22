import React, { useEffect, useState } from "react";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import MembersPanel from "../components/MembersPanel";

export default function ManageMembers() {
    const axiosSecure = UseAxiosSecure();
    const [clubs, setClubs] = useState([]);
    const [selectedClub, setSelectedClub] = useState(null);

    useEffect(() => {
        const fetchClubs = async () => {
            const res = await axiosSecure.get("/clubs/approved");
            setClubs(res.data);

            if (res.data.length > 0) {
                setSelectedClub(res.data[0]);
            }
        };

        fetchClubs();
    }, []);

    return (
        <div className="p-6 bg-white rounded-lg shadow">

            <h2 className="text-2xl font-bold mb-4">
                Manage Club Members
            </h2>
            <div className="flex flex-wrap gap-2 ">
                {clubs.map((club) => (
                    <button
                        key={club._id}
                        onClick={() => setSelectedClub(club)}
                        className={`p-2 rounded-lg border border-gray-400 transition cursor-pointer ${selectedClub?._id === club._id
                            ? "bg-blue-500 text-white"
                            : "bg-white hover:bg-gray-100"
                            }`}
                    >
                        {club.name}
                    </button>
                ))}
            </div>

            {/* 🔹 Members Table */}
            {selectedClub && (
                <MembersPanel club={selectedClub} />
            )}
        </div>
    );
}