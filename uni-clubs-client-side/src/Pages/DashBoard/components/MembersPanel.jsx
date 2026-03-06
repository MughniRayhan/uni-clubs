import { useEffect, useState } from "react";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

export default function MembersPanel({ club }) {
    const axiosSecure = UseAxiosSecure();
    const [members, setMembers] = useState([]);

    const fetchMembers = async () => {
        const res = await axiosSecure.get(
            `/club-members/club/${club._id}`
        );
        setMembers(res.data);
    };

    useEffect(() => {
        fetchMembers();
    }, [club]);

    const updateRole = async (id, role) => {
        await axiosSecure.patch(`/club-members/role/${id}`, { role });
        fetchMembers();
    };

    const removeMember = async (id) => {
        await axiosSecure.delete(`/club-members/${id}`);
        fetchMembers();
    };

    return (
        <div className="flex-1 p-6   rounded overflow-auto">
            <h2 className="text-2xl font-bold mb-4">
                {club.name} Members
            </h2>
            <div className="overflow-x-auto border bg-white border-gray-300 rounded-lg mt-6 shadow-md">
                <table className="table w-full">
                    <thead className="bg-secondary font-bold text-gray-100">
                        <tr>
                            <th>Name</th>
                            <th>Student ID</th>
                            <th>Role</th>
                            <th>Joined</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {members.map((m) => (
                            <tr key={m._id}>
                                <td>{m.userId.displayName}</td>
                                <td>{m.userId.studentId}</td>

                                <td>
                                    <select
                                        value={m.role}
                                        onChange={(e) =>
                                            updateRole(m._id, e.target.value)
                                        }
                                        className="border rounded px-2 py-1"
                                    >
                                        <option value="member">Member</option>
                                        <option value="executive">Executive</option>
                                        <option value="leader">Leader</option>
                                    </select>
                                </td>

                                <td>
                                    {new Date(m.joinedAt).toLocaleDateString()}
                                </td>

                                <td>
                                    <button
                                        onClick={() => removeMember(m._id)}
                                        className="text-red-500"
                                    >
                                        Remove
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