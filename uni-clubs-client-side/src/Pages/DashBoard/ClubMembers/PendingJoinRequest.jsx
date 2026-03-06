import React, { useEffect, useState } from "react";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { toast } from "react-toastify";

export default function PendingJoinRequest() {
    const [requests, setRequests] = useState([]);
    const axiosSecure = UseAxiosSecure();

    const fetchRequests = async () => {
        try {
            const res = await axiosSecure.get(`/club-members/pending`);
            setRequests(res.data);
        } catch (error) {
            console.error(error.response?.data);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const approve = async (id) => {
        try {
            await axiosSecure.patch(`/club-members/approve/${id}`);
            toast.success("Approved");
            fetchRequests();
        } catch {
            toast.error("Failed");
        }
    };

    const reject = async (id) => {
        try {
            await axiosSecure.patch(`/club-members/reject/${id}`);
            toast.success("Rejected");
            fetchRequests();
        } catch {
            toast.error("Failed");
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Pending Join Requests</h2>

            <div className="overflow-x-auto border bg-white border-gray-300 rounded-lg mt-6 shadow-md">
                <table className="table w-full">
                    <thead className="bg-secondary font-bold text-gray-100">
                        <tr>
                            <th>Club</th>
                            <th>Name</th>
                            <th>Student ID</th>
                            <th>Department</th>
                            <th>Batch</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {requests.length === 0 && (
                            <tr>
                                <td colSpan="7" className="text-center py-6">
                                    No pending requests
                                </td>
                            </tr>
                        )}

                        {requests.map((req) => (
                            <tr key={req._id} className="hover">
                                <td>{req.clubId?.name}</td>
                                <td>{req.fullName}</td>
                                <td>{req.studentId}</td>
                                <td>{req.department}</td>
                                <td>{req.batch}</td>
                                <td>{req.phone}</td>
                                <td className="space-x-2">
                                    <button
                                        onClick={() => approve(req._id)}
                                        className="btn btn-sm btn-success"
                                    >
                                        Approve
                                    </button>

                                    <button
                                        onClick={() => reject(req._id)}
                                        className="btn btn-sm btn-error"
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
}