import React from "react";
import UseAuth from "../../Hooks/UseAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function JoinClubModal({ club, closeModal }) {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (!user || !club?._id) return;

    const fetchStatus = async () => {
      try {
        const res = await axiosSecure.get(
          `/club-members/status/${club._id}`
        );
        setStatus(res.data.status);
      } catch (error) {
        setStatus(null);
      }
    };

    fetchStatus();
  }, [user, club?._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const joinData = {
      clubId: club._id,
      fullName: form.fullName.value,
      studentId: form.studentId.value,
      department: form.department.value,
      batch: form.batch.value,
      phone: form.phone.value,
      motivation: form.motivation.value,
    };

    try {
      const res = await axiosSecure.post("/club-members/join", joinData);

      toast.success(res.data.message);
      setStatus("pending");
      closeModal();

    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full mt-5 max-w-lg rounded-2xl p-6 relative">
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 btn btn-sm btn-circle"
        >
          ✕
        </button>

        <h3 className="text-2xl text-center font-bold mb-4">
          Join {club.name}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Grid inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="fullName"
              defaultValue={user?.displayName}
              className="input input-bordered w-full"
              placeholder="Full Name"
              required
            />

            <input
              name="studentId"
              className="input input-bordered w-full"
              placeholder="Student ID"
            />

            <input
              name="department"
              className="input input-bordered w-full"
              placeholder="Department"
            />

            <input
              name="batch"
              className="input input-bordered w-full"
              placeholder="Batch"
            />

            <input
              name="phone"
              className="input input-bordered w-full md:col-span-2"
              placeholder="Phone Number"
              required
            />

            <textarea
              name="motivation"
              className="textarea textarea-bordered w-full md:col-span-2"
              placeholder="Why do you want to join this club?"
              rows={4}
            />
          </div>

          {/* Button */}
          <button
            disabled={status === "pending" || status === "approved"}
            className="btn btn-primary w-full  disabled:cursor-not-allowed"
          >
            {status === "pending"
              ? "Request Sent"
              : status === "approved"
                ? "Already Member"
                : "Send"}
          </button>
        </form>

      </div>
    </div>
  );
}
