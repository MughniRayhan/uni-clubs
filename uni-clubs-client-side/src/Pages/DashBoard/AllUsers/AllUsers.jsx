import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from "react-router";
import { FaSearch, FaTrash, FaEdit, FaUserShield, FaUserTimes } from 'react-icons/fa';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import Loader from '../../../Components/Loader';
import UseAuth from '../../../Hooks/UseAuth';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

const AllUsers = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();

  const [searchParams, setSearchParams] = useSearchParams();


  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const [role, setRole] = useState(
    searchParams.get("role") || "all"
  );

  //  Debounced Value
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  // Debounce Search (500ms)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  // Sync URL WITHOUT breaking focus
  useEffect(() => {
    const params = new URLSearchParams();

    if (debouncedSearch) params.set("search", debouncedSearch);
    if (role !== "all") params.set("role", role);

    // replace: true prevents history stacking
    setSearchParams(params, { replace: true });

  }, [debouncedSearch, role]);

  // Fetch Users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["allUsers", debouncedSearch, role],
    enabled: !!user,
    queryFn: async () => {
      const res = await axiosSecure.get("/users", {
        params: {
          search: debouncedSearch,
          role,
        },
      });
      return res.data;
    },
    keepPreviousData: true,
  });




  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   refetch();
  // };

  const handleMakeAdmin = async (id) => {
    try {
      const res = await axiosSecure.patch(`/users/admin/${id}`);
      if (res.data) {
        // Show alert first
        await Swal.fire('Success!', 'User is now an admin.', 'success');

        // Update local users state immediately
        refetch(); // or optionally update the users array locally
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to make admin', 'error');
    }
  };

  const handleRemoveAdmin = async (id) => {
    try {
      const res = await axiosSecure.patch(`/users/remove-admin/${id}`);
      if (res.data) {
        await Swal.fire('Removed!', 'Admin role has been removed.', 'success');
        refetch(); // update UI
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to remove admin', 'error');
    }
  };



  if (isLoading) return <Loader />;

  return (
    <div className="sm:px-12 px-4 py-10  min-h-screen">

      {/* Search Bar */}
      {/* <form onSubmit={handleSearch} className="mb-6 flex flex-col sm:flex-row items-center gap-2"> */}
      {/* Search + Filter */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by name or email"
            className="input input-bordered w-full bg-white pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Role Filter */}
        <select
          className="select select-bordered bg-white w-full sm:w-48"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="leader">Leader</option>
          <option value="user">User</option>
        </select>

      </div>

      {/* </form> */}

      {/* Users Table */}
      <div className="overflow-x-auto border bg-white border-gray-300 rounded-lg mt-6 shadow-md">
        <table className="table w-full">
          <thead className="bg-secondary font-bold text-gray-100">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined On</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter(u => u.email !== user.email) // exclude current user
              .map((u, index) => (
                <tr key={u._id}>
                  <td>{index + 1}</td>
                  <td>{u.displayName}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>{new Date(u.creation_date).toLocaleDateString()}</td>
                  <td>
                    {u.role === 'admin' ? (
                      <button
                        onClick={() => handleRemoveAdmin(u._id)}
                        className="btn btn-error text-white btn-sm"
                      >
                        <FaUserTimes /> Remove Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(u._id)}
                        className="btn btn-secondary btn-sm"
                      >
                        <FaUserShield /> Make Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))
            }
            {users.filter(u => u.email !== user.email).length === 0 && (
              <tr>
                <td colSpan="6" className="text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default AllUsers;
