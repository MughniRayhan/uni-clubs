import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import Loader from "../../../../Components/Loader";

const PendingEventRegistration = () => {
    const axiosSecure = UseAxiosSecure();

    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPending();
    }, []);

    const fetchPending = async () => {
        try {
            const res = await axiosSecure.get("/event-registration/leader/pending");

            setRegistrations(res.data.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    };

    // APPROVE
    const handleApprove = async (id) => {
        const confirm = await Swal.fire({
            title: "Approve Registration?",
            text: "This user will be registered for the event.",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Approve",
            confirmButtonColor: "#16a34a"
        });

        if (!confirm.isConfirmed) return;

        try {
            await axiosSecure.patch(`/event-registration/approve/${id}`);

            Swal.fire("Approved!", "Registration approved.", "success");

            setRegistrations((prev) =>
                prev.filter((r) => r._id !== id)
            );

        } catch (err) {
            Swal.fire("Error", err.response?.data?.message, "error");
        }
    };

    // REJECT
    const handleReject = async (id) => {
        const confirm = await Swal.fire({
            title: "Reject Registration?",
            text: "This request will be rejected.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Reject",
            confirmButtonColor: "#dc2626"
        });

        if (!confirm.isConfirmed) return;

        try {
            await axiosSecure.patch(`/event-registration/reject/${id}`);

            Swal.fire("Rejected!", "Registration rejected.", "success");

            setRegistrations((prev) =>
                prev.filter((r) => r._id !== id)
            );

        } catch (err) {
            Swal.fire("Error", err.response?.data?.message, "error");
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white rounded">

            <h2 className="text-2xl font-bold mb-6">
                Pending Event Registrations
            </h2>

            <div className="overflow-x-auto bg-white shadow rounded-xl">

                <table className="table w-full">

                    <thead >
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Student ID</th>
                            <th>Department</th>
                            <th>Phone</th>
                            <th>Event</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {registrations.length === 0 && (
                            <tr>
                                <td colSpan="9" className="text-center py-6">
                                    No pending registrations
                                </td>
                            </tr>
                        )}

                        {registrations.map((r, index) => (

                            <tr key={r._id}>

                                <td>{index + 1}</td>

                                <td>{r.name}</td>

                                <td>{r.user?.email}</td>

                                <td>{r.studentId}</td>

                                <td>{r.department}</td>

                                <td>{r.phone}</td>

                                <td>{r.event?.title}</td>

                                <td>
                                    {new Date(r.registeredAt).toLocaleDateString()}
                                </td>

                                <td className="flex gap-2">

                                    <button
                                        onClick={() => handleApprove(r._id)}
                                        className="btn btn-success btn-sm"
                                    >
                                        Approve
                                    </button>

                                    <button
                                        onClick={() => handleReject(r._id)}
                                        className="btn btn-error btn-sm"
                                    >
                                        Reject
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default PendingEventRegistration;