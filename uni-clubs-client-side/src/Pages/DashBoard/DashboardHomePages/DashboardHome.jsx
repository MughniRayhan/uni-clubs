import React from "react";
import { FaUsers, FaUniversity, FaMoneyBillWave, FaChartLine } from "react-icons/fa";

function DashboardHome() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome to Your Dashboard 👋
        </h1>
        <p className="text-gray-500 mt-2">
          Manage your clubs, members, payments and activities from here.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 hover:shadow-xl transition">
          <div className="p-4 bg-blue-100 rounded-full">
            <FaUniversity className="text-blue-600 text-2xl" />
          </div>
          <div>
            <h2 className="text-gray-500 text-sm">Total Clubs</h2>
            <p className="text-2xl font-bold text-gray-800">12</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 hover:shadow-xl transition">
          <div className="p-4 bg-green-100 rounded-full">
            <FaUsers className="text-green-600 text-2xl" />
          </div>
          <div>
            <h2 className="text-gray-500 text-sm">Total Members</h2>
            <p className="text-2xl font-bold text-gray-800">320</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 hover:shadow-xl transition">
          <div className="p-4 bg-yellow-100 rounded-full">
            <FaMoneyBillWave className="text-yellow-600 text-2xl" />
          </div>
          <div>
            <h2 className="text-gray-500 text-sm">Total Revenue</h2>
            <p className="text-2xl font-bold text-gray-800">৳45,000</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 hover:shadow-xl transition">
          <div className="p-4 bg-purple-100 rounded-full">
            <FaChartLine className="text-purple-600 text-2xl" />
          </div>
          <div>
            <h2 className="text-gray-500 text-sm">Active Events</h2>
            <p className="text-2xl font-bold text-gray-800">5</p>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="mt-12 bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Recent Activities
        </h2>
        <ul className="space-y-3 text-gray-600">
          <li>✅ Robotics Club added a new event.</li>
          <li>💳 Payment received from John Doe.</li>
          <li>👥 5 new members joined Programming Club.</li>
          <li>📢 Debate Club posted a new announcement.</li>
        </ul>
      </div>
    </div>
  );
}

export default DashboardHome;
