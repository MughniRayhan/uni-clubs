import { useEffect, useState } from "react";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { FaEdit, FaTrash } from "react-icons/fa";

const AllClubs = () => {
    const [clubs, setClubs] = useState([]);
    const axios = UseAxiosSecure();
    const [selectedClub, setSelectedClub] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchClubs = async () => {
        try {
            const res = await axios.get("/admin/clubs");
            console.log(res.data); // should now show { success: true, clubs: [...] }
            setClubs(res.data.clubs || []);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchClubs();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure?");
        if (!confirmDelete) return;

        try {
            const res = await axios.delete(`/admin/clubs/${id}`);
            if (res.data.success) {
                fetchClubs();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleEditClick = (club) => {
        setSelectedClub(club);
        setIsModalOpen(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const res = await axios.patch(
            `/admin/clubs/${selectedClub._id}`,
            selectedClub
        );

        if (res.data.success) {
            setIsModalOpen(false);
            fetchClubs();
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedClub((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    console.log("c", clubs.leader?.displayName)
    return (
        <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">Approved Clubs</h2>


            <div className="overflow-x-auto border bg-white border-gray-300 rounded-lg mt-6 shadow-md">
                <table className="table w-full">
                    <thead className="bg-secondary font-bold text-gray-100">
                        <tr>
                            <th className="px-6 py-3">Club Name</th>
                            <th className="px-6 py-3">Category</th>
                            <th className="px-6 py-3">Leader</th>
                            <th className="px-6 py-3">Created At</th>
                            <th className="px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clubs.map((club) => (
                            <tr key={club._id} >
                                <td className="px-6 py-4 font-medium">{club.name}</td>
                                <td className="px-6 py-4">{club.category}</td>
                                <td className="px-6 py-4">
                                    {club.leader?.displayName || "N/A"}
                                </td>
                                <td className="px-6 py-4">
                                    {new Date(club.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-center space-x-4">
                                    <button
                                        onClick={() => handleEditClick(club)}
                                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                                    >
                                        <FaEdit />
                                    </button>

                                    <button
                                        onClick={() => handleDelete(club._id)}
                                        className="text-red-600 hover:text-red-800 cursor-pointer"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {clubs.length === 0 && (
                    <div className="p-6 text-center text-gray-500">
                        No clubs found.
                    </div>
                )}
            </div>
            {/* MODAL */}
            {isModalOpen && selectedClub && (
                <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white w-[500px] p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold mb-4">Edit Club</h3>

                        <form onSubmit={handleUpdate} className="space-y-3">

                            <div>
                                <label className="lebel font-medium">Club Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={selectedClub.name}
                                    onChange={handleChange}
                                    placeholder="Club Name"
                                    className="w-full border p-2 rounded"
                                />
                            </div>



                            <div>
                                <label className="lebel font-medium">Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={selectedClub.category}
                                    onChange={handleChange}
                                    placeholder="Category"
                                    className="w-full border p-2 rounded"
                                />
                            </div>

                            <div>
                                <label className="lebel font-medium">Description</label>
                                <textarea
                                    name="description"
                                    value={selectedClub.description || ""}
                                    onChange={handleChange}
                                    placeholder="Description"
                                    className="w-full border p-2 rounded"
                                />
                            </div>

                            <div className="flex justify-end space-x-3 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-400 text-white rounded cursor-pointer"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllClubs;