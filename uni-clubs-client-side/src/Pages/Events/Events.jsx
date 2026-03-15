import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import UseAuth from "../../Hooks/UseAuth";
import Loader from "../../Components/Loader";
import eventsBg from "../../assets/bg.jpg";
import EventRegisterModal from "./EventRegisterModal";
import jsPDF from "jspdf";



const EventCard = ({
    event,
    status,
    formatDate,
    formatCountdown,
    handleRegister,
    downloadTicket,
    navigate
}) => {
    const countdown = formatCountdown(event.registrationEnd);
    const renderButton = () => {
        // if (countdown.closed) return null;

        if (status === "pending") {
            return (
                <button className="btn btn-warning " disabled>
                    Request Sent
                </button>
            );
        }

        if (status === "approved") {
            return (
                <div className="flex gap-2 ">
                    {/* <button className="btn btn-primary " disabled >
                        Registered
                    </button> */}
                    <button
                        className="btn btn-outline btn-primary"
                        onClick={() => downloadTicket(event)}
                    >
                        Download Ticket
                    </button>
                </div>
            );
        }

        return (
            <button
                className="btn btn-primary "
                onClick={() => handleRegister(event)}
            >
                Register
            </button>
        );
    };

    return (

        <div className="card bg-white shadow-md rounded-2xl h-full border-t-2 border-primary">
            {/* <img src={event.banner} className="h-40 object-cover" /> */}

            <div className="p-4 space-y-2">
                <h3 className="font-bold text-lg py-2 border-b border-gray-200">{event.title}</h3>

                <p className="text-sm text-gray-600">{event.shortDescription}</p>

                <p className="text-sm font-medium text-gray-700">
                    📅 Event Date: {formatDate(event.eventDate)} at {event.time}
                </p>

                {status !== "approved" && <p
                    className={`font-semibold ${countdown.closed ? "text-red-500" : "text-green-600"
                        }`}
                >
                    {countdown.text}
                </p>}


                <div className="flex items-center  gap-2 mt-4">
                    <button
                        className="btn btn-outline btn-primary"
                        onClick={() => navigate(`/events/${event._id}`)}
                    >
                        View
                    </button>

                    <div>
                        {renderButton()}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Events = () => {
    const axiosSecure = UseAxiosSecure();
    const { user } = UseAuth();
    const navigate = useNavigate();

    const [upcoming, setUpcoming] = useState([]);
    const [past, setPast] = useState([]);
    const [registrations, setRegistrations] = useState({});
    const [loading, setLoading] = useState(true);

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    const [now, setNow] = useState(Date.now());

    // countdown timer
    useEffect(() => {
        const timer = setInterval(() => {
            setNow(Date.now());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axiosSecure.get("/clubs/categories");
                setCategories(res.data.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchCategories();
    }, []);

    // fetch events
    useEffect(() => {
        const fetchData = async () => {
            try {
                const eventsRes = await axiosSecure.get(
                    `/events/approved${selectedCategory ? `?category=${selectedCategory}` : ""}`
                );

                setUpcoming(eventsRes.data.upcoming);
                setPast(eventsRes.data.past);

                if (user) {
                    // Fetch status for each upcoming event
                    const statusMap = {};

                    await Promise.all(
                        eventsRes.data.upcoming.map(async (event) => {
                            const res = await axiosSecure.get(
                                `/event-registration/status/${event._id}`
                            );
                            statusMap[event._id] = res.data.status;
                        })
                    );

                    setRegistrations(statusMap);
                }
            } catch (err) {
                console.error("Error fetching events:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user, axiosSecure, selectedCategory]);



    const handleRegister = (event) => {
        if (!user) {
            navigate("/login", { state: { from: location.pathname } });
            return;
        }

        setSelectedEvent(event);
        setOpenModal(true);
    };

    const formatDate = (date) =>
        new Date(date).toLocaleDateString(undefined, {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
        });

    const formatCountdown = (end) => {
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

        doc.text(`Participant: ${user.displayName}`, 20, 110);

        doc.save(`${event.title}-ticket.pdf`);
    };

    if (loading) return <Loader />;

    return (

        <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100">

            <div className="max-w-7xl mx-auto px-6 py-16 ">

                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-2xl font-bold">Upcoming Events</h2>

                    {/* filter */}
                    <div>
                        <select
                            className="select select-bordered"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="">Select category</option>

                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {upcoming.map((event) => (
                        <EventCard
                            key={event._id}
                            event={event}
                            status={registrations[event._id]}
                            formatDate={formatDate}
                            formatCountdown={formatCountdown}
                            handleRegister={handleRegister}
                            downloadTicket={downloadTicket}
                            navigate={navigate}
                        />
                    ))}
                </div>

                {past.length > 0 && (
                    <>
                        <h2 className="text-2xl font-bold my-12">Past Events</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 opacity-70">
                            {past.map((event) => (
                                <EventCard
                                    key={event._id}
                                    event={event}
                                    status={registrations[event._id]}
                                    formatDate={formatDate}
                                    formatCountdown={formatCountdown}
                                    handleRegister={handleRegister}
                                    downloadTicket={downloadTicket}
                                    navigate={navigate}
                                />
                            ))}
                        </div>
                    </>
                )}

                {openModal && selectedEvent && (
                    <EventRegisterModal
                        event={selectedEvent}
                        close={() => setOpenModal(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default Events;