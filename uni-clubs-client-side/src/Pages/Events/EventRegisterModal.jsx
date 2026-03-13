import { useState } from "react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import UseAuth from "../../Hooks/UseAuth";
import { toast } from "react-toastify";

export default function EventRegisterModal({ event, close }) {
    const axiosSecure = UseAxiosSecure();
    const { user } = UseAuth();
    const [registrations, setRegistrations] = useState({});
    const [form, setForm] = useState({
        name: user?.displayName || "",
        studentId: "",
        department: "",
        phone: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axiosSecure.post(`/event-registration/register/${event._id}`, form);
            toast.success(res.data.message);
            close();
        } catch (err) {
            alert(err.response?.data?.message);
        }

    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 cursor-pointer" onClick={close}>
            <div className="bg-white w-full mt-5 max-w-2xl rounded-2xl p-6 relative" onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={close}
                    className="absolute top-3 right-3 btn btn-sm btn-circle"
                >
                    ✕
                </button>


                <h3 className="text-2xl text-center font-bold mb-4">
                    Register for {event.title}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-3">

                    <input
                        placeholder="Name"
                        value={form.name || user?.displayName || ""}
                        required
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="input input-bordered w-full"
                    />

                    <input
                        placeholder="Student ID"
                        required
                        onChange={(e) => setForm({ ...form, studentId: e.target.value })}
                        className="input input-bordered w-full"
                    />

                    <input
                        placeholder="Department"
                        required
                        onChange={(e) => setForm({ ...form, department: e.target.value })}
                        className="input input-bordered w-full"
                    />

                    <input
                        placeholder="Phone"
                        required
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="input input-bordered w-full"
                    />

                    <button className="btn btn-primary w-full">
                        Submit Registration
                    </button>

                </form>

            </div>

        </div>
    );
};