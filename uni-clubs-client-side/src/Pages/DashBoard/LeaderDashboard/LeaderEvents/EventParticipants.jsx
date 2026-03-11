import { useEffect, useState } from "react";
import { useParams } from "react-router";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import Loader from "../../../../Components/Loader";

const EventParticipants = () => {

    const { eventId } = useParams();
    const axiosSecure = UseAxiosSecure();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log("user", users)
    useEffect(() => {
        fetchParticipants();
    }, []);

    const fetchParticipants = async () => {

        const res = await axiosSecure.get(
            `/event-registration/event-participants/${eventId}`
        );

        setUsers(res.data.data);
        setLoading(false);
    };

    if (loading) return <Loader />;

    return (
        <div className="max-w-5xl mx-auto p-10 bg-white rounded">

            <h2 className="text-2xl font-bold mb-6">
                Event Participants
            </h2>

            <table className="table w-full">

                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Student ID</th>
                        <th>Email</th>
                        <th>Registered Date</th>
                    </tr>
                </thead>

                <tbody>

                    {users.map((u, i) => (

                        <tr key={u._id}>
                            <td>{i + 1}</td>
                            <td>{u.name}</td>
                            <td>{u.studentId || "-"}</td>
                            <td>{u.user.email}</td>
                            <td>
                                {new Date(u.registeredAt).toLocaleDateString()}
                            </td>
                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
};

export default EventParticipants;