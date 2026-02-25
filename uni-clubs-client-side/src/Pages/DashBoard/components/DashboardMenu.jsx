import { MdDashboard, MdAddCircleOutline, MdJoinInner } from "react-icons/md";
import { FaUsers, FaClock } from "react-icons/fa";
import { VscDiffAdded } from "react-icons/vsc";

export const dashboardMenu = {
    admin: [
        {
            title: "Users",
            icon: FaUsers,
            children: [
                { name: "All Users", path: "/dashboard/allUsers" },
            ],
        },
        {
            title: "Clubs",
            icon: FaClock,
            children: [
                { name: "Pending Clubs", path: "/dashboard/pending-clubs" },
                { name: "All Clubs", path: "/dashboard/all-clubs" },
            ],
        },
        {
            title: "Events",
            icon: VscDiffAdded,
            children: [
                { name: "All Events", path: "/dashboard/all-events" },
            ],
        },
    ],
    leader: [
        {
            title: "My Clubs",
            icon: VscDiffAdded,
            children: [
                { name: "Leader Clubs", path: "/dashboard/leaderClubs" },
            ],
        },
        {
            title: "Events",
            icon: VscDiffAdded,
            children: [
                { name: "Add Event", path: "/dashboard/addEvent" },
                { name: "My Events", path: "/dashboard/myEvents" },
            ],
        },
    ],
    user: [
        {
            title: "Clubs",
            icon: MdAddCircleOutline,
            children: [
                { name: "Create Club", path: "/dashboard/createClub" },
                // { name: "Join Clubs", path: "/dashboard/joinClub" },
            ],
        },
    ],
};