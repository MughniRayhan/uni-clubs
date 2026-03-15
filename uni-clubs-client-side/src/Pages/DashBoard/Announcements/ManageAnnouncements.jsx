import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import AnnouncementModal from "./AnnouncementModal";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const ManageAnnouncements = () => {

    const axiosSecure = UseAxiosSecure();

    const [openModal, setOpenModal] = useState(false);
    const [editing, setEditing] = useState(null);

    const { data: announcements = [], refetch } = useQuery({
        queryKey: ["announcements"],
        queryFn: async () => {
            const res = await axiosSecure.get("/announcements");
            return res.data.data;
        }
    });


    const handleDelete = async (id) => {

        const confirm = await Swal.fire({
            title: "Delete announcement?",
            icon: "warning",
            showCancelButton: true
        });

        if (!confirm.isConfirmed) return;

        await axiosSecure.delete(`/announcements/${id}`);

        Swal.fire("Deleted", "", "success");

        refetch();
    };


    return (

        <div className="p-6 bg-white rounded-lg shadow">

            <div className="flex justify-between mb-6">

                <h2 className="text-2xl font-bold">
                    Announcements
                </h2>

                <button
                    className="btn btn-secondary"
                    onClick={() => { setEditing(null); setOpenModal(true) }}
                >
                    Create Announcement
                </button>

            </div>


            <div className="overflow-x-auto bg-white shadow">

                <table className="table">

                    <thead>

                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>

                    </thead>

                    <tbody>

                        {announcements.map((a, i) => (
                            <tr key={a._id}>

                                <td>{i + 1}</td>

                                <td>{a.title}</td>

                                <td>{a.type}</td>

                                <td>
                                    {new Date(a.createdAt).toLocaleDateString()}
                                </td>

                                <td className="flex flex-col md:flex-row gap-2 items-center">

                                    <button
                                        className="btn btn-sm btn-warning text-white"
                                        onClick={() => {
                                            setEditing(a);
                                            setOpenModal(true);
                                        }}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-sm btn-error text-white"
                                        onClick={() => handleDelete(a._id)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>


            {openModal &&

                <AnnouncementModal
                    editing={editing}
                    close={() => setOpenModal(false)}
                    refetch={refetch}
                />

            }

        </div>
    );
};

export default ManageAnnouncements;