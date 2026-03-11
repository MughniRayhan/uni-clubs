import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Loader from "../../../Components/Loader";

const RegisteredEvents = () => {

    const axiosSecure = UseAxiosSecure();

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const fetchRegistrations = async () => {
        try {

            const res = await axiosSecure.get("/event-registration/my-registrations");

            setEvents(res.data.data);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date) =>
        new Date(date).toLocaleDateString(undefined, {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
        });

    const downloadTicket = (event) => {

        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("Event Registration Confirmation", 20, 20);

        doc.setFontSize(12);
        doc.text("Successfully Registered!", 20, 40);

        doc.text(`Event: ${event.title}`, 20, 60);
        doc.text(`Date: ${formatDate(event.eventDate)}`, 20, 70);
        doc.text(`Time: ${event.time}`, 20, 80);
        doc.text(`Venue: ${event.venue}`, 20, 90);

        doc.save(`${event.title}-ticket.pdf`);
    };

    if (loading) return <Loader />;

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded">

            <h2 className="text-2xl font-bold mb-8">
                My Registered Events
            </h2>

            {events.length === 0 ? (
                <p className="text-gray-500 text-center">
                    No registered events
                </p>
            ) : (

                <div className="overflow-x-auto">

                    <table className="table table-zebra">

                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Event</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Venue</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {events.map((reg, index) => {

                                const event = reg.event;

                                return (
                                    <tr key={reg._id}>

                                        <td>{index + 1}</td>

                                        <td className="font-medium">
                                            {event.title}
                                        </td>

                                        <td>
                                            {formatDate(event.eventDate)}
                                        </td>

                                        <td>
                                            {event.time}
                                        </td>

                                        <td>
                                            {event.venue}
                                        </td>

                                        <td>

                                            <button
                                                className="btn btn-sm btn-primary"
                                                onClick={() => downloadTicket(event)}
                                            >
                                                Download Ticket
                                            </button>

                                        </td>

                                    </tr>
                                );
                            })}

                        </tbody>

                    </table>

                </div>
            )}

        </div>
    );
};

export default RegisteredEvents;