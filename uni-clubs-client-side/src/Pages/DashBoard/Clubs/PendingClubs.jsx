import React from "react";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Loader from "../../../Components/Loader";

export default function PendingClubs() {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  // get pending clubs
  const { data: pendingClubs = [], isLoading } = useQuery({
    queryKey: ["pendingClubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/pending");
      return res.data;
    },
  });

  // mutation approve / reject
  const mutation = useMutation({
    mutationFn: async ({ id, action }) => {
      const res = await axiosSecure.patch(`/admin/status/${id}`, { action });
      return res.data;
    },
    onSuccess: (data) => {
      Swal.fire({
        icon: "success",
        title: data.message,
        timer: 1400,
      });
      queryClient.invalidateQueries(["pendingClubs"]);
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
      });
    },
  });

  const handleAction = (id, action) => {
    Swal.fire({
      title: `Are you sure to ${action}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate({ id, action });
      }
    });
  };

  if (isLoading) return <Loader/>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Pending Club Requests</h2>

       <div className="overflow-x-auto border bg-white border-gray-300 rounded-lg mt-6 shadow-md">
        <table className="table w-full">
          <thead className="bg-secondary font-bold text-gray-100">
            <tr >
              <th>#</th>
              <th>Club Name</th>
              <th>Description</th>
              <th>Created By</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {pendingClubs.length > 0 ? (
              pendingClubs.map((club, i) => (
                <tr key={club._id}>
                  <td>{i + 1}</td>
                  <td>{club.name}</td>
                  <td>{club.description.slice(0, 50)}...</td>
                  <td>{club.createdBy?.displayName || club.createdBy?.name}</td>
                  <td>{club.createdBy?.email}</td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => handleAction(club._id, "approve")}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded cursor-pointer"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => handleAction(club._id, "reject")}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded cursor-pointer"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-5 text-gray-500">
                  No pending club requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
