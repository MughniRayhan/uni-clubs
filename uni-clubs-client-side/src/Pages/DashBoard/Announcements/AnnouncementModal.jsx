import { useState } from "react";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const AnnouncementModal = ({ editing, close, refetch }) => {

    const axiosSecure = UseAxiosSecure();

    const [title, setTitle] = useState(editing?.title || "");
    const [message, setMessage] = useState(editing?.message || "");
    const [type, setType] = useState(editing?.type || "general");
    const [file, setFile] = useState(null);


    const handleSubmit = async (e) => {

        e.preventDefault();

        const formData = new FormData();

        formData.append("title", title);
        formData.append("message", message);
        formData.append("type", type);

        if (file) {
            formData.append("file", file);
        }

        if (editing) {

            await axiosSecure.patch(
                `/announcements/${editing._id}`,
                formData
            );

            Swal.fire("Updated", "", "success");

        } else {

            await axiosSecure.post(
                "/announcements",
                formData
            );

            Swal.fire("Created", "", "success");
        }

        refetch();
        close();
    };


    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

            <div className="bg-white p-6 rounded-lg w-96">

                <h3 className="text-xl font-bold mb-4">
                    {editing ? "Edit Announcement" : "Create Announcement"}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-3">

                    <input
                        type="text"
                        placeholder="Title"
                        className="input input-bordered w-full"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />

                    <textarea
                        placeholder="Message"
                        className="textarea textarea-bordered w-full"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        required
                    />

                    <select
                        className="select select-bordered w-full"
                        value={type}
                        onChange={e => setType(e.target.value)}
                    >
                        <option value="general">General</option>
                        <option value="event">Event</option>
                        <option value="urgent">Urgent</option>
                    </select>


                    {/* File Upload */}
                    <input
                        type="file"
                        className="file-input file-input-bordered w-full"
                        onChange={(e) => setFile(e.target.files[0])}
                    />


                    <div className="flex justify-end gap-2">

                        <button
                            type="button"
                            className="btn"
                            onClick={close}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            Save
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default AnnouncementModal;