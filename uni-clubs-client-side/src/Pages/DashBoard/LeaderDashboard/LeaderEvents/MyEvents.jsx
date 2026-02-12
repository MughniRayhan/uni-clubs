import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";

const MyEvents = () => {
    const axiosSecure = UseAxiosSecure();
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        const res = await axiosSecure.get("/events/my-events");
        setEvents(res.data.data);
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this event?")) return;

        await axiosSecure.delete(`/events/my-events/${id}`);
        toast.success("Event deleted");
        setEvents(events.filter(e => e._id !== id));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        await axiosSecure.put(
            `/events/my-events/${selectedEvent._id}`,
            selectedEvent
        );

        toast.success("Event updated");
        setSelectedEvent(null);
        fetchEvents();
    };

    return (
        <div className="p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">My Events</h2>

            <table className="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Club</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {events.length === 0 && (
                        <tr>
                            <td colSpan="6" className="text-center py-6 text-gray-500">
                                No events found
                            </td>
                        </tr>
                    )}
                    {events.map(event => (
                        <tr key={event._id}>
                            <td>{event.title}</td>
                            <td>{event.club?.name}</td>
                            <td>
                                <span className={`badge badge-outline ${event.status === "approved"
                                    ? "badge-success"
                                    : event.status === "rejected"
                                        ? "badge-error"
                                        : "badge-warning"
                                    }`}>
                                    {event.status}
                                </span>
                            </td>
                            <td className="space-x-2">
                                <button
                                    className="btn btn-outline btn-sm btn-info"
                                    onClick={() => setSelectedEvent(event)}
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    className="btn btn-outline btn-sm btn-error"
                                    onClick={() => handleDelete(event._id)}
                                >
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* EDIT MODAL */}
            {selectedEvent && (
                <dialog open className="modal">
                    <form className="modal-box" onSubmit={handleUpdate}>
                        <h3 className="font-bold text-lg mb-4">Edit Event</h3>

                        <input
                            className="input input-bordered w-full mb-3"
                            value={selectedEvent.title}
                            onChange={(e) =>
                                setSelectedEvent({ ...selectedEvent, title: e.target.value })
                            }
                        />

                        <textarea
                            className="textarea textarea-bordered w-full mb-3"
                            value={selectedEvent.shortDescription}
                            onChange={(e) =>
                                setSelectedEvent({
                                    ...selectedEvent,
                                    shortDescription: e.target.value
                                })
                            }
                        />

                        <div className="modal-action">
                            <button type="submit" className="btn btn-success">
                                Save
                            </button>
                            <button
                                type="button"
                                className="btn"
                                onClick={() => setSelectedEvent(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </dialog>
            )}
        </div>
    );
};

export default MyEvents;
