import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Loader from "../../../Components/Loader";

export default function Profile() {
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = UseAxiosSecure();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [uploading, setUploading] = useState(false);

  const { data: profileData, isLoading, refetch } = useQuery({
    queryKey: ["profile", user?.email],
    enabled: !!user,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (profileData) setFormData(profileData);
  }, [profileData]);

  if (isLoading || !profileData) return <Loader />;

  const requiredFields = ["displayName", "studentId", "department", "phone", "bio"];
  const completed = requiredFields.filter(
    (f) => formData[f] && formData[f].trim() !== ""
  ).length;
  const progressPercent = Math.round((completed / requiredFields.length) * 100);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Upload to imgbb
  const handleUploadImage = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    setUploading(true);
    const formDataImg = new FormData();
    formDataImg.append("image", image);
    const uploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_key
    }`;

    try {
      const res = await axios.post(uploadUrl, formDataImg, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFormData((prev) => ({ ...prev, photoURL: res.data.data.url }));
      Swal.fire("Uploaded!", "Image uploaded successfully. Click Save to confirm.", "success");
    } catch (error) {
      console.error("Image upload error:", error);
      Swal.fire("Error", "Failed to upload image", "error");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Save to MongoDB + Firebase
  const handleSave = async () => {
    try {
      const updateData = { ...formData };
      delete updateData.email;
      delete updateData.role;

      const res = await axiosSecure.patch(`/user/profile/${user?.email}`, updateData);
      if (res.data) {
        if (updateData.displayName || updateData.photoURL) {
          await updateUserProfile(user, {
            displayName: updateData.displayName || user.displayName,
            photoURL: updateData.photoURL || user.photoURL,
          });
        }

        Swal.fire("Saved!", "Your profile has been updated.", "success");
        setIsEditing(false);
        refetch();
      }
    } catch (error) {
      console.error("Profile update failed:", error);
      Swal.fire("Error", "Failed to update profile", "error");
    }
  };

  // 🔖 Field config with better labels & placeholders
  const fieldConfig = [
    { name: "displayName", label: "Name", placeholder: "Enter your name" },
    { name: "studentId", label: "Student ID", placeholder: "e.g. 221-115-001" },
    { name: "department", label: "Department", placeholder: "e.g. CSE" },
    { name: "phone", label: "Phone Number", placeholder: "e.g. +8801XXXXXXXXX" },
    { name: "batch", label: "Batch / Year", placeholder: "e.g. 56th" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-primary">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* ===== Left Column ===== */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="md:col-span-1 bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center relative"
        >
          <div className="relative w-32 h-32 mb-4">
            <img
              src={formData.photoURL || user.photoURL}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-primary"
            />
            {isEditing && (
              <>
                <label
                  htmlFor="imageUpload"
                  className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center cursor-pointer group"
                >
                  <Camera className="text-white w-8 h-8 group-hover:scale-110 transition" />
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  onChange={handleUploadImage}
                  className="hidden"
                  accept="image/*"
                />
              </>
            )}
          </div>

          <h2 className="text-2xl font-semibold">
            {formData.displayName || user.displayName || "Unnamed User"}
          </h2>
          <p className="text-gray-600 mt-1">{user.email}</p>
          <span className="mt-3 inline-block bg-primary/10 text-primary px-4 py-1 rounded-full font-medium">
            Role: {formData.role || "user"}
          </span>

          <div className="mt-5 w-full">
            <p className="text-lg font-medium mb-2">
              Profile Completion: {progressPercent}%
            </p>
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
          {uploading && <p className="text-sm mt-2 text-primary">Uploading...</p>}
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
            {fieldConfig.map(({ name, label, placeholder }) => (
              <Detail
                key={name}
                label={label}
                value={formData[name]}
                editable={isEditing}
                name={name}
                placeholder={placeholder}
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
                placeholder="Write a short bio about yourself..."
                className="w-full p-3 border rounded-xl"
                rows={5}
              />
            ) : (
              <p className="text-gray-700 bg-gray-50 p-2 rounded-xl">
                {formData.bio || "No bio added yet."}
              </p>
            )}
          </div>

          <div className="flex gap-4">
            {isEditing ? (
              <>
                <button
                  className="btn btn-success"
                  onClick={handleSave}
                  disabled={uploading}
                >
                  {uploading ? "Saving..." : "Save"}
                </button>
                <button
                  className="btn btn-error"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Detail({ label, value, editable, name, onChange, placeholder }) {
  return (
    <div className="flex flex-col">
      <span className="text-sm font-medium text-gray-600 mb-1">{label}</span>
      {editable ? (
        <input
          type="text"
          name={name}
          value={value || ""}
          onChange={onChange}
          placeholder={placeholder}
          className="text-base text-gray-800 border-b border-gray-300 pb-1 focus:outline-none placeholder-gray-400"
        />
      ) : (
        <span className="text-base text-gray-800 border-b border-gray-200 pb-1">
          {value || <span className="text-gray-400">Not set</span>}
        </span>
      )}
    </div>
  );
}
