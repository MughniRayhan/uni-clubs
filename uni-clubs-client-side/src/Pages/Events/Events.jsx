import { useEffect, useState } from "react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import UseAuth from "../../Hooks/UseAuth";

const Events = () => {
    const axiosSecure = UseAxiosSecure();
    const [upcoming, setUpcoming] = useState([]);
    const [past, setPast] = useState([]);
    const [now, setNow] = useState(Date.now());
    const { user } = UseAuth();


    useEffect(() => {
        fetchEvents();
        const timer = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(timer);
    }, []);

    const fetchEvents = async () => {
        const res = await axiosSecure.get("/events/approved");
        setUpcoming(res.data.upcoming);
        setPast(res.data.past);
    };

    const formatCountdown = (end) => {
        const diff = new Date(end) - now;

        if (diff <= 0) return { text: "Registration closed", closed: true };

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

    const formatDate = (date) =>
        new Date(date).toLocaleDateString(undefined, {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
        });


    const EventCard = ({ e }) => {
        const countdown = formatCountdown(e.registrationEnd);

        return (
            <div className="card bg-white shadow-md rounded-2xl h-full">
                <img src={e.banner} className="h-40 object-cover" />

                <div className="p-4 space-y-2">
                    <h3 className="font-bold text-lg">{e.title}</h3>

                    <p className="text-sm text-gray-600">{e.shortDescription}</p>

                    {/* Event date */}
                    <p className="text-sm font-medium text-gray-700">
                        📅 Event Date: {formatDate(e.eventDate)} at {e.time}
                    </p>

                    {
                        user && (
                            <>
                                {/* Countdown */}
                                <p
                                    className={`font-semibold ${countdown.closed
                                        ? "text-red-500"
                                        : "text-green-600"
                                        }`}
                                >
                                    {countdown.text}
                                </p>

                                {
                                    !countdown.closed && (
                                        <button
                                            disabled={countdown.closed}
                                            className={`btn mt-2  ${countdown.closed
                                                ? "btn-disabled"
                                                : "btn-primary"
                                                }`}
                                        >
                                            Register
                                        </button>
                                    )
                                }
                            </>
                        )
                    }
                </div>
            </div>
        );
    };


    return (
        <div className="max-w-7xl mx-auto px-6 py-16">
            <h2 className="text-2xl font-bold mb-12">Upcoming Events</h2>
            <div className="grid md:grid-cols-3 gap-10 ">
                {upcoming.map(e => <EventCard key={e._id} e={e} />)}
            </div>

            {
                past.length !== 0 && (
                    <div>
                        <h2 className="text-2xl font-bold my-12">Past Events</h2>
                        <div className="grid md:grid-cols-3 gap-10 opacity-70">
                            {past.map(e => <EventCard key={e._id} e={e} />)}
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Events;
