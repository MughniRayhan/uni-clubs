import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const LeaderClubs = () => {
    const axiosSecure = UseAxiosSecure();

    const [clubs, setClubs] = useState([]);
    const [selectedClub, setSelectedClub] = useState(null);

    useEffect(() => {
        fetchClubs();
    }, []);

    const fetchClubs = async () => {
        try {
            const res = await axiosSecure.get("/leader/clubs");
            setClubs(res.data.clubs);
        } catch (err) {
            console.log(err);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            await axiosSecure.patch(
                `/${selectedClub._id}/details`,
                selectedClub
            );

            toast.success("Club updated");
            setSelectedClub(null);
            fetchClubs();
        } catch (err) {
            toast.error("Update failed");
        }
    };

    return (
        <div className="p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">My Clubs</h2>

            <table className="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Contact</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {clubs.length === 0 && (
                        <tr>
                            <td colSpan="6" className="text-center py-6 text-gray-500">
                                No clubs found
                            </td>
                        </tr>
                    )}
                    {clubs.map((club) => (
                        <tr key={club._id}>
                            <td>{club.name}</td>
                            <td>{club.category}</td>
                            <td>{club.contactPhone}</td>

                            <td>
                                <button
                                    className="btn btn-sm btn-info"
                                    onClick={() => setSelectedClub(club)}
                                >
                                    <FaEdit />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* EDIT MODAL */}
            {selectedClub && (
                <dialog open className="modal">
                    <form className="modal-box" onSubmit={handleUpdate}>
                        <h3 className="font-bold text-lg mb-4">Edit Club</h3>

                        <input
                            className="input input-bordered w-full mb-3"
                            value={selectedClub.name}
                            onChange={(e) =>
                                setSelectedClub({ ...selectedClub, name: e.target.value })
                            }
                            placeholder="Club Name"
                        />

                        <input
                            className="input input-bordered w-full mb-3"
                            value={selectedClub.category || ""}
                            onChange={(e) =>
                                setSelectedClub({
                                    ...selectedClub,
                                    category: e.target.value,
                                })
                            }
                            placeholder="Category"
                        />

                        <input
                            className="input input-bordered w-full mb-3"
                            value={selectedClub.contactPhone || ""}
                            onChange={(e) =>
                                setSelectedClub({
                                    ...selectedClub,
                                    contactPhone: e.target.value,
                                })
                            }
                            placeholder="Contact Phone"
                        />

                        <textarea
                            className="textarea textarea-bordered w-full mb-3"
                            value={selectedClub.description || ""}
                            onChange={(e) =>
                                setSelectedClub({
                                    ...selectedClub,
                                    description: e.target.value,
                                })
                            }
                            placeholder="Description"
                        />

                        <div className="modal-action">
                            <button className="btn btn-success" type="submit">
                                Save
                            </button>

                            <button
                                type="button"
                                className="btn"
                                onClick={() => setSelectedClub(null)}
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

export default LeaderClubs;
