import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import useAuth from "../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import axios from "axios";

export default function CreateClub() {
  const { user } = useAuth();
  const axiosSecure = UseAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      creatorName: user?.displayName || "",
      studentId: user?.studentId || "", // ✅ Pre-fill if stored in DB or context
    },
  });

  const onSubmit = async (data) => {
  try {
    let imageUrl = "";

    // ✅ If cover image uploaded, first upload to imgbb
    if (data.coverImage && data.coverImage[0]) {
      const formData = new FormData();
      formData.append("image", data.coverImage[0]);

      const uploadRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_key
    }`,
        formData
      );

      imageUrl = uploadRes.data.data.url;
    }

    
    const newClub = {
      clubName: data.clubName,
      category: data.category,
      description: data.description,
      creatorName: data.creatorName,
      creatorEmail: user.email,
      studentId: data.studentId,
      coverImage: imageUrl || "cover image",
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    const res = await axiosSecure.post("/clubs", newClub);

    if (res.data.insertedId || res.data.success) {
      toast.success("Club request submitted! Waiting for admin approval.");
      reset({
        creatorName: user?.displayName || "",
        studentId: user?.studentId || "",
      });
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.message || "Failed to create club.");
  }
};


  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 mt-10">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-primary mb-6 text-center"
      >
        Create a New Club
      </motion.h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Club Name */}
        <div>
          <label className="label font-medium">Club Name</label>
          <input
            type="text"
            placeholder="Enter club name"
            className="input input-bordered w-full"
            {...register("clubName", { required: "Club name is required" })}
          />
          {errors.clubName && (
            <p className="text-red-500 text-sm mt-1">{errors.clubName.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="label font-medium">Category</label>
          <select
            className="select select-bordered w-full"
            defaultValue=""
            {...register("category", { required: "Category is required" })}
          >
            <option value="" disabled>Select a category</option>
            <option value="Cultural">Cultural</option>
            <option value="Sports">Sports</option>
            <option value="Academic">Academic</option>
            <option value="Technology">Technology</option>
            <option value="Social">Social</option>
            <option value="Other">Other</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
          )}
        </div>

        {/* ✅ Cover Image */}
<div>
  <label className="label font-medium">Cover Image</label>
  <input
    type="file"
    accept="image/*"
    className="file-input file-input-bordered w-full"
    {...register("coverImage", { required: "Cover image is required" })}
  />
  {errors.coverImage && (
    <p className="text-red-500 text-sm mt-1">{errors.coverImage.message}</p>
  )}
</div>

        {/* Description */}
        <div>
          <label className="label font-medium">Description</label>
          <textarea
            placeholder="Describe the purpose of this club..."
            className="textarea textarea-bordered w-full h-32 resize-none"
            {...register("description", {
              required: "Description is required",
              minLength: { value: 30, message: "Please write at least 30 characters" },
            })}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

                {/* ✅ Creator Name */}
        <div>
          <label className="label font-medium">Your Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            {...register("creatorName", { required: "Your name is required" })}
            placeholder="Enter your full name"
          />
          {errors.creatorName && (
            <p className="text-red-500 text-sm mt-1">{errors.creatorName.message}</p>
          )}
        </div>

        {/* ✅ Student ID */}
        <div>
          <label className="label font-medium">Student ID</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter your student ID"
            {...register("studentId", {
              required: "Student ID is required",
              pattern: {
                value: /^[0-9a-zA-Z-]+$/, // allows numbers/letters/hyphen
                message: "Invalid Student ID format",
              },
            })}
          />
          {errors.studentId && (
            <p className="text-red-500 text-sm mt-1">{errors.studentId.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary w-full py-4  font-semibold"
        >
          {isSubmitting ? "Submitting..." : "Send Request"}
        </motion.button>
      </form>

      <p className="text-gray-500 text-sm text-center mt-6">
        After submitting, your request will be reviewed by the admin.
        If approved, you will automatically become the club leader.
      </p>
    </div>
  );
}
