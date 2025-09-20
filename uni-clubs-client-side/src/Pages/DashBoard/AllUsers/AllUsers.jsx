import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaSearch, FaTrash, FaEdit } from 'react-icons/fa';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import Loader from '../../../Components/Loader';
import UseAuth from '../../../Hooks/UseAuth';

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

 

  
  if (isLoading) return <Loader />;

  return (
    <div className="px-12 py-10 bg-white shadow-md min-h-screen">
      <h2 className="text-3xl font-extrabold text-accent mb-4">All Users</h2>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6 flex items-center gap-2">
        <input
          type="text"
          placeholder="Search by name or email"
          className="input input-bordered w-full max-w-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          <FaSearch /> Search
        </button>
      </form>

      {/* Users Table */}
      <div className="overflow-x-auto border bg-white border-gray-300 rounded-lg mt-6">
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
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.displayName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{new Date(user.creation_date).toLocaleDateString()}</td>
                <td className="flex gap-4">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
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
