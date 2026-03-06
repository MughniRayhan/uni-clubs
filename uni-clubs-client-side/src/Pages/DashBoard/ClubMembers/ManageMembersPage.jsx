import React, { useEffect, useState } from "react";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import ClubSidebar from "../components/ClubSidebar";
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
        <div className="flex gap-3 h-screen">
            <ClubSidebar
                clubs={clubs}
                selectedClub={selectedClub}
                setSelectedClub={setSelectedClub}
            />

            {selectedClub && (
                <MembersPanel club={selectedClub} />
            )}
        </div>
    );
}