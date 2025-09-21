import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaSearch, FaTrash, FaEdit, FaUserShield, FaUserTimes } from 'react-icons/fa';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import Loader from '../../../Components/Loader';
import UseAuth from '../../../Hooks/UseAuth';
import Swal from 'sweetalert2';

const AllUsers = () => {
  const axiosSecure = UseAxiosSecure();
  const [search, setSearch] = useState("");
  const { user } = UseAuth();

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ['allUsers', search],
    enabled: !!user,  
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${search}`);
      return res.data;
    }
  });

  const handleSearch = (e) => {
    e.preventDefault();
    refetch();
  };

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
      <form onSubmit={handleSearch} className="mb-6 flex flex-col sm:flex-row items-center gap-2">
        <input
          type="text"
          placeholder="Search by name or email"
          className="input input-bordered w-full max-w-xs bg-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          <FaSearch /> Search
        </button>
      </form>

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
