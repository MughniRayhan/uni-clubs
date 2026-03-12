import { FaUsers, FaCalendarAlt, FaTrophy } from "react-icons/fa";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";
import Loader from "../../../Components/Loader";


// Month mapping
const months = [
    "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];


// Stat Card Component
const StatCard = ({ title, value, icon, color }) => {
    return (
        <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-5 flex items-center justify-between hover:shadow-md transition-all">
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


// Chart Component
const EventsChart = ({ data = [] }) => {

    const formatted = data.map((item) => ({
        month: months[item._id],
        events: item.events
    }));

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">
                Events Created Per Month
            </h3>

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


const LeaderDashboard = () => {

    const axiosSecure = UseAxiosSecure();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["leader-dashboard"],
        queryFn: async () => {
            const res = await axiosSecure.get("/dashboard/leader");
            return res.data;
        }
    });


    if (isLoading) {
        return (
            <Loader />
        );
    }

    if (isError) {
        return (
            <div className="p-6 text-red-500">
                Failed to load dashboard data
            </div>
        );
    }

    const cards = data?.cards || {};
    const monthlyEvents = data?.monthlyEvents || [];

    return (
        <div className="p-6 space-y-8 bg-white rounded">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-800">
                    Leader Dashboard
                </h1>
                <p className="text-gray-500">
                    Overview of your clubs and events
                </p>
            </div>


            {/* Stat Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                <StatCard
                    title="Clubs You Lead"
                    value={cards.totalClubs}
                    icon={<FaUsers />}
                    color="text-pink-600 bg-pink-100"
                />

                <StatCard
                    title="Events Created"
                    value={cards.totalEvents}
                    icon={<FaCalendarAlt />}
                    color="text-emerald-600 bg-emerald-100"
                />

                <StatCard
                    title="Highest Participants"
                    value={cards.highestParticipants}
                    icon={<FaTrophy />}
                    color="text-amber-600 bg-amber-100"
                />

            </div>


            {/* Charts */}
            <div >

                <EventsChart data={monthlyEvents} />

            </div>

        </div>
    );
};

export default LeaderDashboard;