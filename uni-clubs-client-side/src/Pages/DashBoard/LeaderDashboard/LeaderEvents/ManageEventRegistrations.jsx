import { useEffect, useState } from "react";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import Loader from "../../../../Components/Loader";
import { useNavigate } from "react-router";
import jsPDF from "jspdf";

const ManageEventRegistrations = () => {

    const axiosSecure = UseAxiosSecure();

    const [upcoming, setUpcoming] = useState([]);
    const [past, setPast] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {

            const res = await axiosSecure.get("/event-registration/leader/events");

            setUpcoming(res.data.upcoming);
            setPast(res.data.past);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleOpen = (eventId) => {
        navigate(`/dashboard/event-participants/${eventId}`);
    };

    const handleDownload = async (event) => {
        try {

            const res = await axiosSecure.get(
                `/event-registration/event-participants/${event._id}`
            );

            const users = res.data.data;

            const doc = new jsPDF();

            // Title
            doc.setFontSize(16);
            doc.text(`Event: ${event.title}`, 20, 20);

            doc.setFontSize(12);
            doc.text(
                `Date: ${new Date(event.eventDate).toLocaleDateString()}`,
                20,
                30
            );

            doc.text("Participants:", 20, 45);

            let y = 55;

            users.forEach((u, index) => {
                const name = u.user.displayName;
                const studentId = u.user.studentId || "-";

                doc.text(
                    `${index + 1}. ${name}   ID: ${studentId}`,
                    20,
                    y
                );

                y += 10;
            });

            doc.save(`${event.title}-participants.pdf`);

        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <Loader />;

    const EventCard = ({ event }) => (
        <div className="card bg-white shadow-md p-6 rounded-xl">

            <h3 className="font-bold text-lg">{event.title}</h3>

            <p className="text-sm text-gray-500 mb-4">
                {new Date(event.eventDate).toLocaleDateString()}
            </p>

            <div className="flex gap-3">

                <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleOpen(event._id)}
                >
                    View Participants
                </button>

                <button
                    className="btn btn-outline btn-sm"
                    onClick={() => handleDownload(event)}
                >
                    Download
                </button>

            </div>

        </div>
    );

    return (
        <div className="max-w-7xl mx-auto p-6 ">

            <h2 className="text-2xl font-bold mb-8">
                Manage Event Registrations
            </h2>

            <div className="mt-5 bg-white rounded  p-4 shadow">
                <h3 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2">Upcoming Events</h3>

                {upcoming.length > 0 ? <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {upcoming.map(e => <EventCard key={e._id} event={e} />)}
                </div>
                    :
                    <p className="text-center ">No Upcoming Events </p>
                }
            </div>
            {past.length > 0 &&
                <div className="mt-5 bg-white rounded  p-4 shadow">
                    <h3 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2">Past Events</h3>


                    <div className="grid md:grid-cols-3 gap-6">
                        {past.map(e => <EventCard key={e._id} event={e} />)}
                    </div>
                </div>
            }

        </div>
    );
};

export default ManageEventRegistrations;