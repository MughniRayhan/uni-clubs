import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import useAuth from "../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import axios from "axios";

export default function CreateClub() {
  const { user } = useAuth();
  const axiosSecure = UseAxiosSecure();

  const [loadingImg, setLoadingImg] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // auto shortName generate function
  const generateShortName = (clubName) => {
    if (!clubName) return "";
    const ignore = ["of", "the", "and", "for", "in"];
    return clubName
      .split(" ")
      .filter((w) => !ignore.includes(w.toLowerCase()))
      .map((w) => w[0].toUpperCase())
      .join("");
  };

  const onSubmit = async (data) => {
    try {
      setLoadingImg(true);

      // handle cover pic upload → Imgbb
      let coverUrl = "";
      if (data.coverImage && data.coverImage[0]) {
        const fd = new FormData();
        fd.append("image", data.coverImage[0]);

        const uploadRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_key}`,
          fd
        );
        coverUrl = uploadRes.data.data.url;
      }

      setLoadingImg(false);

      const shortName = generateShortName(data.name);

      const payload = {
        name: data.name,
        shortName,
        category: data.category,
        description: data.description,
        mission: data.mission,
        coverImage: coverUrl,
        contactPhone: data.contactPhone,
        contactEmail: user?.email,
      };

      const res = await axiosSecure.post("/clubs", payload);

      if (res.data.success) {
        toast.success("Club request submitted successfully. Waiting for admin approval.");
        reset();
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit request");
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
            {...register("name", { required: "Club name is required" })}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
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
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
        </div>

        {/* Mission */}
        <div>
          <label className="label font-medium">Mission Statement</label>
          <textarea
            placeholder="Write the mission / purpose of this club"
            className="textarea textarea-bordered w-full h-24 resize-none"
            {...register("mission", { required: "Mission is required" })}
          ></textarea>
          {errors.mission && <p className="text-red-500 text-sm mt-1">{errors.mission.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="label font-medium">Description</label>
          <textarea
            placeholder="Describe what this club stands for..."
            className="textarea textarea-bordered w-full h-32 resize-none"
            {...register("description", {
              required: "Description is required",
              minLength: { value: 30, message: "Please write at least 30 characters" },
            })}
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>

        {/* Contact Phone */}
        <div>
          <label className="label font-medium">Contact Phone</label>
          <input
            type="text"
            placeholder="Ex: 0170000000"
            className="input input-bordered w-full"
            {...register("contactPhone", { required: "Phone number is required" })}
          />
          {errors.contactPhone && <p className="text-red-500 text-sm mt-1">{errors.contactPhone.message}</p>}
        </div>

        {/* Cover Image */}
        <div>
          <label className="label font-medium">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            {...register("coverImage", { required: "Cover image is required" })}
          />
          {errors.coverImage && <p className="text-red-500 text-sm mt-1">{errors.coverImage.message}</p>}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={isSubmitting || loadingImg}
          className="btn btn-primary w-full py-3 font-semibold"
        >
          {isSubmitting || loadingImg ? "Submitting..." : "Submit Club Request"}
        </motion.button>
      </form>
    </div>
  );
}
