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
                { name: "Manage Club Details", path: "/dashboard/club-details" },
            ],
        },
        {
            title: "Club Members",
            icon: FaClock,
            children: [
                { name: "Pending Members", path: "/dashboard/pending-members" },
                { name: "Manage Members", path: "/dashboard/manage-members" },
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
                { name: "My Clubs", path: "/dashboard/myClubs" },
                // { name: "Join Clubs", path: "/dashboard/joinClub" },
            ],
        },
    ],
};