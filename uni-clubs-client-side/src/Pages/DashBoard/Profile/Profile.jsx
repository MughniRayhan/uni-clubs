import React, { useState } from "react";
import { motion } from "framer-motion";
import useAuth from "../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from '../../../Components/Loader';
import Swal from "sweetalert2";

export default function Profile() {
  const { user } = useAuth();
  const axiosSecure = UseAxiosSecure();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  // Fetch user profile details
  const { data: profileData, isLoading, refetch } = useQuery({
    queryKey: ["profile", user?.email],
    enabled: !!user,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    }
  });

  // Update formData when profileData loads
  React.useEffect(() => {
    if (profileData) setFormData(profileData);
  }, [profileData]);

  if (isLoading || !profileData) return <Loader />;

  // Profile completion calculation
  const requiredFields = ["displayName", "studentId", "department", "phone", "bio"];
  const completed = requiredFields.filter(
    (field) => formData[field] && formData[field].trim() !== ""
  ).length;
  const progressPercent = Math.round((completed / requiredFields.length) * 100);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Save updated profile
  const handleSave = async () => {
    try {
      const res = await axiosSecure.patch(`/user/profile/${user?.email}`, formData);
      if (res.data) {
        Swal.fire("Saved!", "Your profile has been updated.", "success");
        setIsEditing(false);
        refetch(); // reload updated profile
      }
    } catch (error) {
        console.log(error)
      console.error(error);
      Swal.fire("Error", "Failed to update profile", "error");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-primary">My Profile</h1>

      {/* 2 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* ===== Left Column ===== */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="md:col-span-1 bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center"
        >
          <img
            src={formData.photoURL || user.photoURL }
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-primary mb-4"
          />
          <h2 className="text-2xl font-semibold">{formData.displayName || "Unnamed User"}</h2>
          <p className="text-gray-600 mt-1">{user.email}</p>
          <span className="mt-3 inline-block bg-primary/10 text-primary px-4 py-1 rounded-full font-medium">
            Role: {formData.role || "user"}
          </span>

             {/* Progress Bar */}
      <div className="mt-5">
        <p className="text-lg font-medium mb-2">Profile Completion: {progressPercent}%</p>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-primary via-secondary to-green-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1 }}
          />
        </div>
        {progressPercent < 100 && (
          <p className="text-sm text-gray-500 mt-2">
            Complete your profile to get the best experience!
          </p>
        )}
      </div>
        </motion.div>

        {/* ===== Right Column ===== */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="md:col-span-2 bg-white shadow-lg rounded-xl p-6 space-y-6"
        >
          <h3 className="text-2xl font-semibold mb-4 text-primary">Profile Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["studentId", "department", "phone", "batch"].map((field) => (
              <Detail
                key={field}
                label={field === "batch" ? "Batch/Year" : field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field]}
                editable={isEditing}
                name={field}
                onChange={handleChange}
              />
            ))}
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-2">About Me</h4>
            {isEditing ? (
              <textarea
                name="bio"
                value={formData.bio || ""}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl"
                rows={5}
              />
            ) : (
              <p className="text-gray-700 bg-gray-50 p-2 rounded-xl ">
                {formData.bio || "No bio added yet."}
              </p>
            )}
          </div>

          <div className="flex gap-4">
            {isEditing ? (
              <>
                <button className="btn btn-success" onClick={handleSave}>Save</button>
                <button className="btn btn-error" onClick={() => setIsEditing(false)}>Cancel</button>
              </>
            ) : (
              <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Edit Profile</button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Detail component for input or read-only
function Detail({ label, value, editable, name, onChange }) {
  return (
    <div className="flex flex-col">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      {editable ? (
        <input
          type="text"
          name={name}
          value={value || ""}
          onChange={onChange}
          className="text-base text-gray-800 border-b border-gray-300 pb-1 focus:outline-none"
        />
      ) : (
        <span className="text-base text-gray-800 border-b border-gray-200 pb-1">
          {value || <span className="text-gray-400">Not set</span>}
        </span>
      )}
    </div>
  );
}
