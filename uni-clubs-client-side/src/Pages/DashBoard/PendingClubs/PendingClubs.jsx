import React from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Loader from "../../../Components/Loader";
  import Swal from "sweetalert2";

export default function PendingClubs() {
  const axiosSecure = UseAxiosSecure();

  // Fetch pending clubs
  const { data: clubs = [], isLoading, refetch } = useQuery({
    queryKey: ["pendingClubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/pending-clubs");
      return res.data;
    },
  });

  if (isLoading) return <Loader />;


const handleAction = async (clubId, action) => {
  const confirmResult = await Swal.fire({
    title: `Are you sure you want to ${action} this club?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: action === "approve" ? "#4ade80" : "#f87171",
    cancelButtonColor: "#6b7280",
    confirmButtonText: `Yes, ${action} it!`,
    cancelButtonText: "Cancel",
  });

  if (confirmResult.isConfirmed) {
    try {
      const res = await axiosSecure.patch(`/clubs/${clubId}`, { action });
      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: `Club ${action}d successfully!`,
          timer: 1500,
          showConfirmButton: false,
        });
        refetch();
      } else {
        Swal.fire({
          icon: "error",
          title: "Action failed",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: err.message,
      });
    }
  }
};

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Pending Club Requests</h1>

      {clubs.length === 0 ? (
        <p className="text-gray-600">No pending club requests.</p>
      ) : (
        <div className="overflow-x-auto border bg-white border-gray-300 rounded-lg mt-6 shadow-md">
        <table className="table w-full">
          <thead className="bg-secondary font-bold text-gray-100">
              <tr >
                <th>Club Name</th>
                <th>Category</th>
                <th>Requested By</th>
                <th>Student ID</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {clubs.map((club) => (
                <tr key={club._id}>
                  <td>{club.clubName}</td>
                  <td>{club.category}</td>
                  <td>{club.creatorName} ({club.creatorEmail})</td>
                  <td>{club.studentId}</td>
                  <td>{new Date(club.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => handleAction(club._id, "approve")}
                      className="btn btn-success text-white btn-sm mr-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(club._id, "reject")}
                      className="btn btn-error text-white btn-sm"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
