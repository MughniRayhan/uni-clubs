import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import UseAuth from "../../Hooks/UseAuth";
import Loader from "../../Components/Loader";
import EventRegisterModal from "./EventRegisterModal";
import jsPDF from "jspdf";

const EventDetails = () => {
    const { eventId } = useParams();
    const axiosSecure = UseAxiosSecure();
    const { user } = UseAuth();
    const navigate = useNavigate();

    const [event, setEvent] = useState(null);
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);

    const [openModal, setOpenModal] = useState(false);

    const [now, setNow] = useState(Date.now());

    useEffect(() => {
        const timer = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await axiosSecure.get(`/events/${eventId}`);
                setEvent(res.data.data);

                if (user) {
                    const regRes = await axiosSecure.get(
                        "/event-registration/my-registrations"
                    );
                    console.log("Registrations:", regRes.data.data);

                    const registrations = regRes.data.data;

                    const registration = registrations.find(
                        (r) => String(r.event?._id || r.event) === String(eventId)
                    );
                    const res = await axiosSecure.get(`/event-registration/status/${eventId}`);
                    setStatus(res.data.status);


                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [eventId, axiosSecure, user]);

    const formatDate = (date) =>
        new Date(date).toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });

    const formatCountdown = (end) => {

        if (!end) {
            return { text: "Registration date not set", closed: true };
        }

        const diff = new Date(end) - now;

        if (diff <= 0) {
            return { text: "Registration closed", closed: true };
        }

        const totalSeconds = Math.floor(diff / 1000);

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const pad = (n) => n.toString().padStart(2, "0");

        return {
            text: `Registration closes in ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`,
            closed: false,
        };
    };

    const handleRegister = () => {
        if (!user) {
            navigate("/login");
            return;
        }

        setOpenModal(true);
    };

    const downloadTicket = () => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("Event Registration Confirmation", 20, 20);

        doc.setFontSize(12);
        doc.text("Successfully Registered!", 20, 40);

        doc.text(`Event: ${event.title}`, 20, 60);
        doc.text(`Date: ${formatDate(event.eventDate)}`, 20, 70);
        doc.text(`Time: ${event.time}`, 20, 80);
        doc.text(`Venue: ${event.venue}`, 20, 90);

        doc.text(`Participant: ${user.displayName}`, 20, 110);

        doc.save(`${event.title}-ticket.pdf`);
    };

    if (loading) return <Loader />;

    const countdown = formatCountdown(event.registrationEnd);

    const renderButton = () => {
        console.log("status", status)

        if (status === "pending") {
            return <button className="btn " disabled>Request Sent</button>;
        }

        if (status === "approved") {
            return (
                <div className="flex gap-3">
                    <button className="btn btn-success" disabled>
                        Registered
                    </button>

                    <button
                        className="btn btn-outline btn-primary"
                        onClick={downloadTicket}
                    >
                        Download Ticket
                    </button>
                </div>
            );
        }

        return (
            <button className="btn btn-primary" onClick={handleRegister}>
                Register Now
            </button>
        );
    };

    return (
        <div className="min-h-screen bg-base-200 py-16">

            <div className="max-w-6xl mx-auto px-6">

                {/* Banner */}
                {/* <div className="rounded-3xl overflow-hidden shadow-xl mb-10">
                    <img
                        src={event.banner}
                        alt={event.title}
                        className="w-full h-[400px] object-cover"
                    />
                </div> */}

                {/* Content */}
                <div className="bg-white shadow-xl rounded-3xl p-10 space-y-6">

                    <h1 className="text-4xl font-bold">{event.title}</h1>

                    <p className="text-gray-600 text-lg">
                        {event.shortDescription}
                    </p>


                    <div className="grid md:grid-cols-2 gap-6 text-gray-700">

                        <p>
                            📅 <span className="font-semibold">Date:</span>{" "}
                            {formatDate(event.eventDate)}
                        </p>

                        <p>
                            ⏰ <span className="font-semibold">Time:</span> {event.time}
                        </p>

                        <p>
                            📍 <span className="font-semibold">Venue:</span> {event.venue}
                        </p>

                        <p>
                            🏷 <span className="font-semibold">Category:</span>{" "}
                            {event.category}
                        </p>

                        <p>
                            🏫 <span className="font-semibold">Organized By:</span>{" "}
                            {event.club?.name}
                        </p>

                    </div>

                    <p
                        className={`font-semibold text-lg ${countdown.closed ? "text-red-500" : "text-green-600"
                            }`}
                    >
                        {countdown.text}
                    </p>

                    <div className="pt-6">
                        {renderButton()}
                    </div>
                </div>
            </div>

            {openModal && (
                <EventRegisterModal
                    event={event}
                    close={() => setOpenModal(false)}
                />
            )}
        </div>
    );
};

export default EventDetails;