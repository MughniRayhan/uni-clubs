import { FaUsers, FaCalendarCheck } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

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
    "",
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];


// ---------------------
// Stat Card Component
// ---------------------
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


// ---------------------
// Events Chart
// ---------------------
const ParticipationChart = ({ data }) => {

    const formatted = data.map(item => ({
        month: months[item._id],
        events: item.events
    }));

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">

            <h3 className="text-lg font-semibold mb-4">
                Events Participated Per Month
            </h3>

            <ResponsiveContainer width="100%" height={320}>
                <BarChart data={formatted}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis allowDecimals={false} />

                    <Tooltip />

                    <Bar
                        dataKey="events"
                        fill="#6366F1"
                        radius={[6, 6, 0, 0]}
                    />

                </BarChart>
            </ResponsiveContainer>

        </div>
    );
};


// ---------------------
// User Dashboard
// ---------------------
const UserDashboard = () => {

    const axiosSecure = UseAxiosSecure();

    const { data, isLoading } = useQuery({
        queryKey: ["user-dashboard"],
        queryFn: async () => {
            const res = await axiosSecure.get("/dashboard/user");
            return res.data;
        }
    });

    if (isLoading) {
        return <Loader />;
    }

    const { cards, monthlyParticipations } = data;

    return (
        <div className="p-6 space-y-8 bg-white rounded">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-800">
                    User Dashboard
                </h1>

                <p className="text-gray-500">
                    Overview of your clubs and events
                </p>
            </div>


            {/* Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                <StatCard
                    title="My Clubs"
                    value={cards.myClubs}
                    icon={<FaUsers />}
                    color="text-blue-600 bg-blue-100"
                />

                <StatCard
                    title="Events Participated"
                    value={cards.participatedEvents}
                    icon={<FaCalendarCheck />}
                    color="text-emerald-600 bg-emerald-100"
                />

            </div>


            {/* Chart */}
            <div >

                <ParticipationChart
                    data={monthlyParticipations}
                />

            </div>

        </div>
    );
};

export default UserDashboard;