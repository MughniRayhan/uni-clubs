import {
    FaUsers,
    FaUniversity,
    FaCalendarAlt,
    FaUserFriends,
    FaTrophy
} from "react-icons/fa";

import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend
} from "recharts";
import Loader from "../../../Components/Loader";

const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444"];

const months = [
    "",
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];


// ---------- Stat Card ----------
const StatCard = ({ title, value, icon, color }) => {
    return (
        <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-5 flex items-center justify-between hover:shadow-md transition">

            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <h2 className="text-3xl font-bold text-gray-800">{value ?? 0}</h2>
            </div>

            <div className={`text-3xl p-3 rounded-lg ${color}`}>
                {icon}
            </div>

        </div>
    );
};


// ---------- Bar Chart ----------
const EventsChart = ({ data }) => {

    const formatted = data.map(item => ({
        month: months[item._id],
        events: item.events
    }));

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">

            <h3 className="font-semibold mb-4">Events Per Month</h3>

            <ResponsiveContainer width="100%" height={320}>
                <BarChart data={formatted}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis allowDecimals={false} />

                    <Tooltip />

                    <Bar
                        dataKey="events"
                        fill="#1565c0"
                        radius={[6, 6, 0, 0]}
                    />

                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};


// ---------- Pie Chart ----------
const PieChartCard = ({ title, data }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">

            <h3 className="font-semibold mb-4">{title}</h3>

            <ResponsiveContainer width="100%" height={300}>
                <PieChart>

                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={100}
                        label

                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={index}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>
            </ResponsiveContainer>

        </div>
    );
};



const AdminDashboard = () => {

    const axiosSecure = UseAxiosSecure();

    const { data, isLoading } = useQuery({
        queryKey: ["admin-dashboard"],
        queryFn: async () => {
            const res = await axiosSecure.get("/dashboard/admin");
            return res.data;
        }
    });

    if (isLoading) {
        return <Loader />;
    }

    const { cards, monthlyEvents, clubStatus, eventStatus } = data;

    return (
        <div className="p-6 space-y-8 bg-white rounded">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-800">
                    Admin Dashboard
                </h1>

                <p className="text-gray-500">
                    Platform analytics overview
                </p>
            </div>


            {/* KPI Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                <StatCard
                    title="Total Users"
                    value={cards.totalUsers}
                    icon={<FaUsers />}
                    color="text-blue-600 bg-blue-100"
                />

                <StatCard
                    title="Total Clubs"
                    value={cards.totalClubs}
                    icon={<FaUniversity />}
                    color="text-purple-600 bg-purple-100"
                />

                <StatCard
                    title="Total Events"
                    value={cards.totalEvents}
                    icon={<FaCalendarAlt />}
                    color="text-emerald-600 bg-emerald-100"
                />

                <StatCard
                    title="Highest Club Members"
                    value={cards.highestClubMembers}
                    icon={<FaUserFriends />}
                    color="text-amber-600 bg-amber-100"
                />

                <StatCard
                    title="Highest Event Participants"
                    value={cards.highestParticipants}
                    icon={<FaTrophy />}
                    color="text-rose-600 bg-rose-100"
                />

            </div>


            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6">

                <EventsChart data={monthlyEvents} />

                <PieChartCard
                    title="Club Status Distribution"
                    data={clubStatus}
                />

            </div>



        </div>
    );
};

export default AdminDashboard;