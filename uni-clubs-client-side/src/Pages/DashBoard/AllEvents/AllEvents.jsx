import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Loader from "../../../Components/Loader";
import { FaEdit, FaTrash } from "react-icons/fa";

const AllEvents = () => {
    const axiosSecure = UseAxiosSecure();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});

    const fetchEvents = async () => {
        try {
            const res = await axiosSecure.get("/events/all-events");
            setEvents(res.data?.data || []);
        } catch (err) {
            console.error(err);
            setEvents([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    // Approve / Reject / Delete functions
    const handleApprove = async (id) => {
        const confirm = await Swal.fire({
            title: "Approve event?",
            icon: "question",
            showCancelButton: true,
        });
        if (!confirm.isConfirmed) return;

        await axiosSecure.patch(`/events/id/${id}/approve`);
        fetchEvents();
    };

    const handleReject = async (id) => {
        const confirm = await Swal.fire({
            title: "Reject event?",
            icon: "warning",
            showCancelButton: true,
        });
        if (!confirm.isConfirmed) return;

        await axiosSecure.patch(`/events/id/${id}/reject`);
        fetchEvents();
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Delete event?",
            text: "This action cannot be undone",
            icon: "error",
            showCancelButton: true,
        });
        if (!confirm.isConfirmed) return;

        await axiosSecure.delete(`/events/id/${id}`);
        fetchEvents();
    };

    // Open modal
    const handleView = (event) => {
        setSelectedEvent(event);
        setFormData({
            title: event.title || "",
            date: event.date || "",
            time: event.time || "",
            venue: event.venue || "",
            category: event.category || "",
            capacity: event.capacity || "",
            registrationDeadline: event.registrationDeadline || "",
            ticketAmount: event.ticketPrice?.amount || 0,
            ticketCurrency: event.ticketPrice?.currency || "BDT",
            shortDescription: event.shortDescription || "",
        });
        setEditMode(false);
        setModalOpen(true);
    };



    const handleEdit = (event) => {
        setSelectedEvent(event);
        setFormData({
            title: event.title || "",
            eventDate: event.eventDate?.split("T")[0] || "",
            time: event.time || "",
            venue: event.venue || "",
            category: event.category || "",
            capacity: event.capacity || "",
            registrationStart: event.registrationStart?.split("T")[0] || "",
            registrationEnd: event.registrationEnd?.split("T")[0] || "",
            ticketAmount: event.ticketPrice?.amount || 0,
            ticketCurrency: event.ticketPrice?.currency || "BDT",
            shortDescription: event.shortDescription || "",
            description: event.description || "",
        });

        setEditMode(true);
        setModalOpen(true);
    };




    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const updatedData = {
                ...formData,
                ticketPrice: {
                    amount: formData.ticketAmount,
                    currency: formData.ticketCurrency,
                },
            };
            console.log("updated", updatedData)

            await axiosSecure.put(`/events/${selectedEvent._id}`, updatedData);

            Swal.fire("Success", "Event updated successfully", "success");
            setModalOpen(false);
            fetchEvents();
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Failed to update event", "error");
        }
    };


    if (loading) return <Loader />;

    return (
        <div className="p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4">All Events</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Club</th>
                            <th>Created By</th>
                            <th>Status</th>
                            <th className="text-center" >Actions</th>
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
                        {events.map((event, index) => (
                            <tr key={event._id}>
                                <td>{index + 1}</td>
                                <td>{event.title}</td>
                                <td>{event.club?.name}</td>
                                <td>{event.createdBy?.displayName}</td>

                                <td>
                                    <span
                                        className={`badge-outline badge ${event.status === "approved"
                                            ? "badge-success"
                                            : event.status === "rejected"
                                                ? "badge-error"
                                                : "badge-warning"
                                            }`}
                                    >
                                        {event.status}
                                    </span>
                                </td>

                                <td className="flex gap-2 items-center">
                                    <button onClick={() => handleView(event)} className="btn btn-xs btn-info text-white">
                                        View
                                    </button>

                                    {event.status === "pending" && (
                                        <>
                                            <button onClick={() => handleApprove(event._id)} className="btn btn-xs btn-success text-white">
                                                Approve
                                            </button>
                                            <button onClick={() => handleReject(event._id)} className="btn btn-xs btn-error text-white">
                                                Reject
                                            </button>
                                        </>
                                    )}

                                    {event.status === "approved" && (
                                        <>
                                            <button onClick={() => handleEdit(event)} className="btn btn-xs btn-warning text-white">
                                                <FaEdit />
                                            </button>
                                            <button onClick={() => handleDelete(event._id)} className="btn btn-xs btn-error text-white">
                                                <FaTrash />
                                            </button>
                                        </>
                                    )}

                                    {event.status === "rejected" && <span className="text-gray-400 text-sm">No actions</span>}
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {modalOpen && selectedEvent && (
                <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg max-w-2xl w-full relative overflow-y-auto max-h-[90vh]">
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute top-2 right-2 btn btn-sm btn-circle"
                        >
                            ✕
                        </button>

                        {!editMode ? (
                            <>
                                <h3 className="text-xl font-bold mb-4">{selectedEvent.title}</h3>
                                <p><strong>Club:</strong> {selectedEvent.club?.name}</p>
                                <p><strong>Created By:</strong> {selectedEvent.createdBy?.displayName} ({selectedEvent.createdBy?.email})</p>
                                <p><strong>Status:</strong> {selectedEvent.status}</p>
                                <p>
                                    <strong>Date & Time:</strong>
                                    {new Date(selectedEvent.eventDate).toLocaleDateString()}
                                    {" "}at {selectedEvent.time}
                                </p>

                                <p><strong>Venue:</strong> {selectedEvent.venue}</p>
                                <p><strong>Category:</strong> {selectedEvent.category}</p>
                                <p><strong>Capacity:</strong> {selectedEvent.capacity}</p>
                                <p><strong>Registration:</strong> {selectedEvent.registrationStart} → {selectedEvent.registrationEnd}</p>

                                <p><strong>Ticket Price:</strong> {selectedEvent.ticketPrice?.amount} {selectedEvent.ticketPrice?.currency}</p>
                                <p><strong>Short Description:</strong> {selectedEvent.shortDescription}</p>
                            </>
                        ) : (
                            <>
                                <h3 className="text-xl font-bold mb-4">Edit Event</h3>
                                <div className="flex flex-col gap-2">
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="Title"
                                        className="input input-bordered w-full"
                                    />
                                    <input
                                        type="date"
                                        name="eventDate"
                                        value={formData.eventDate}
                                        onChange={handleInputChange}
                                        placeholder="Date"
                                        className="input input-bordered w-full"
                                    />
                                    <input
                                        type="text"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleInputChange}
                                        placeholder="Time"
                                        className="input input-bordered w-full"
                                    />
                                    <input
                                        type="text"
                                        name="venue"
                                        value={formData.venue}
                                        onChange={handleInputChange}
                                        placeholder="Venue"
                                        className="input input-bordered w-full"
                                    />
                                    <input
                                        type="text"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        placeholder="Category"
                                        className="input input-bordered w-full"
                                    />
                                    <input
                                        type="number"
                                        name="capacity"
                                        value={formData.capacity}
                                        onChange={handleInputChange}
                                        placeholder="Capacity"
                                        className="input input-bordered w-full"
                                    />
                                    <label className="font-medium">Registration Start</label>
                                    <input
                                        type="date"
                                        name="registrationStart"
                                        value={formData.registrationStart}
                                        onChange={handleInputChange}
                                        className="input input-bordered w-full"
                                    />

                                    <label className="font-medium">Registration End</label>
                                    <input
                                        type="date"
                                        name="registrationEnd"
                                        value={formData.registrationEnd}
                                        onChange={handleInputChange}
                                        className="input input-bordered w-full"
                                    />

                                    <div className="flex gap-2">
                                        <input
                                            type="number"
                                            name="ticketAmount"
                                            value={formData.ticketAmount}
                                            onChange={handleInputChange}
                                            placeholder="Ticket Amount"
                                            className="input input-bordered w-full"
                                        />
                                        <input
                                            type="text"
                                            name="ticketCurrency"
                                            value={formData.ticketCurrency}
                                            onChange={handleInputChange}
                                            placeholder="Currency"
                                            className="input input-bordered w-full"
                                        />
                                    </div>
                                    <textarea
                                        name="shortDescription"
                                        value={formData.shortDescription}
                                        onChange={handleInputChange}
                                        placeholder="Short Description"
                                        className="textarea textarea-bordered w-full"
                                    />
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Description"
                                        className="textarea textarea-bordered w-full"
                                    />
                                    <button
                                        onClick={handleSave}
                                        className="btn btn-success mt-2"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllEvents;
