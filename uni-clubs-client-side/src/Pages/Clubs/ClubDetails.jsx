import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import Loader from "../../Components/Loader";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import useUserRole from "../../Hooks/useUserRole";
import UseAuth from "../../Hooks/UseAuth";
import axios from "axios";
import { motion } from "framer-motion";

export default function ClubDetails() {
  const { clubId } = useParams();
  const axiosSecure = UseAxiosSecure(); // baseURL: http://localhost:5000/api
  const { role } = useUserRole();
  const { user } = UseAuth();

  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [galleryUploading, setGalleryUploading] = useState(false);

  // Section form state
  const [showSectionForm, setShowSectionForm] = useState(false);
  const [sectionUploading, setSectionUploading] = useState(false);
  const [newSection, setNewSection] = useState({ title: "", image: "", description: "" });

  // file refs
  const galleryFileRef = useRef(null);
  const sectionFileRef = useRef(null);

  // fetch
  const fetchClubDetails = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axiosSecure.get(`/${clubId}`);
      if (res.data?.data) setClub(res.data.data);
      else setError("Club not found");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to fetch club details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClubDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clubId]);

  // guard
  if (loading) return <Loader />;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!club) return <p className="text-center text-gray-500">Club not found</p>;


const isLeaderOrAdmin = club.leader?.email === user?.email || role === "admin";


  // ---------- helper: upload file to imgbb ----------
  const uploadToImgbb = async (file) => {
    // expects VITE_image_key in env
    if (!file) throw new Error("No file provided");
    const key = import.meta.env.VITE_image_key;
    if (!key) throw new Error("Missing imgbb key (VITE_image_key)");
    const fd = new FormData();
    fd.append("image", file);
    const res = await axios.post(`https://api.imgbb.com/1/upload?key=${key}`, fd);
    return res.data.data.url;
  };

  // ---------- Edit basic details ----------
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((p) => ({ ...p, [name]: value }));
  };

  const handleSaveEdit = async () => {
    try {
      await axiosSecure.patch(`/${clubId}/details`, editData);
      await fetchClubDetails();
      Swal.fire("Updated!", "Club details updated successfully", "success");
      setEditMode(false);
      setEditData({});
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.response?.data?.message || "Failed", "error");
    }
  };

  // ---------- Gallery: upload file, then post to /:clubId/gallery ----------
const handleGalleryFileChange = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  try {
    setGalleryUploading(true);
    const url = await uploadToImgbb(file);
    await axiosSecure.post(`/${clubId}/gallery`, { url, caption: file.name });
    
    // reset input first
    if (galleryFileRef.current) galleryFileRef.current.value = "";

    await fetchClubDetails();
    Swal.fire("Added!", "Gallery image uploaded", "success");
  } catch (err) {
    console.error(err);
    Swal.fire("Error", err.response?.data?.message || err.message || "Upload failed", "error");
  } finally {
    setGalleryUploading(false);
  }
};


  const handleRemoveImage = async (imageId) => {
    const confirm = await Swal.fire({
      title: "Remove image?",
      text: "This will delete the image from the gallery.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove"
    });
    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.delete(`/${clubId}/gallery/${imageId}`);
      await fetchClubDetails();
      Swal.fire("Removed!", "Image removed successfully", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.response?.data?.message || "Failed", "error");
    }
  };

  // ---------- Sections: add (with file upload) ----------
  const handleSectionFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setSectionUploading(true);
      const url = await uploadToImgbb(file);
      setNewSection((p) => ({ ...p, image: url }));
      sectionFileRef.current.value = "";
      Swal.fire("Uploaded!", "Image uploaded to imgbb (attached to section)", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.response?.data?.message || err.message || "Upload failed", "error");
    } finally {
      setSectionUploading(false);
    }
  };

  const handleAddSection = async () => {
    if (!newSection.description || newSection.description.trim().length < 10) {
      return Swal.fire("Error", "Please add a description (min 10 chars)", "error");
    }
    try {
      const res = await axiosSecure.post(`/${clubId}/sections`, newSection);
      // res.data.data is added section
      await fetchClubDetails();
      setNewSection({ title: "", image: "", description: "" });
      setShowSectionForm(false);
      Swal.fire("Added!", "New section added", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.response?.data?.message || "Failed", "error");
    }
  };

  const handleRemoveSection = async (sectionId) => {
    const confirm = await Swal.fire({
      title: "Remove section?",
      text: "This will delete the section permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete"
    });
    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.delete(`/${clubId}/sections/${sectionId}`);
      await fetchClubDetails();
      Swal.fire("Removed!", "Section removed", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.response?.data?.message || "Failed", "error");
    }
  };

  // ---------- UI layout ----------
  return (
    <div className=" w-full">
     

      {/* Cover */}
     {/* Banner Cover */}
{club.coverImage && (
  <motion.div 
    className="w-full h-[260px] md:h-[400px] relative"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    <motion.img 
      src={club.coverImage}
      alt={club.name}
      className="w-full h-full object-cover"
      initial={{ scale: 1.1 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1 }}
    />

    {/* slight dark overlay */}
    <div className="absolute inset-0 bg-black/60"></div>

    {/* title inside banner on bottom center */}
    <motion.div 
      className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center px-4"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-secondary via-green-200 to-secondary bg-clip-text text-transparent drop-shadow-lg">
        {club.name}
      </h1>
    </motion.div>
  </motion.div>
)}


      {/* Main content area */}
      <div className="mt-10 max-w-7xl mx-auto py-8 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: main column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Basic details card */}
          <motion.div className="bg-white rounded-xl shadow p-6"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  >
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-semibold">About this club</h2>
              {isLeaderOrAdmin && (
                <button
                  onClick={() => { setEditMode((v) => !v); setEditData({}); }}
                  className="text-sm px-3 py-1 border rounded-md text-primary"
                >
                  {editMode ? "Cancel" : "Edit"}
                </button>
              )}
            </div>

            {editMode ? (
              <div className="mt-4 space-y-3">
                <input
                  name="description"
                  placeholder="Short description"
                  defaultValue={club.description || ""}
                  onChange={handleEditChange}
                  className="input input-bordered w-full"
                />
                <input
                  name="mission"
                  placeholder="Mission"
                  defaultValue={club.mission || ""}
                  onChange={handleEditChange}
                  className="input input-bordered w-full"
                />
                <input
                  name="category"
                  placeholder="Category"
                  defaultValue={club.category || ""}
                  onChange={handleEditChange}
                  className="input input-bordered w-full"
                />
                <div className="flex gap-2">
                  <button onClick={handleSaveEdit} className="btn btn-primary">Save changes</button>
                  <button onClick={() => { setEditMode(false); setEditData({}); }} className="btn btn-ghost">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="mt-4 space-y-2 text-gray-700">
                {club.description && <p className="leading-relaxed">{club.description}</p>}
                {club.mission && <p className="leading-relaxed mt-4">{club.mission}</p>}
                {club.extraDetails && <p className="mt-3 text-gray-600">{club.extraDetails}</p>}
                <div className="mt-4 text-sm text-gray-500">
                  <p><strong>Category:</strong> {club.category || "—"}</p>
                  <p><strong>Contact:</strong> {club.contactEmail || club.contactPhone || "—"}</p>
                </div>
              </div>
            )}
          </motion.div>
          
        </div>

        {/* Right: sidebar */}
        <aside className="space-y-6">
          <div className="bg-white rounded-xl shadow p-4">
            <h5 className="text-lg font-medium">Leader</h5>
            <p className="mt-2 text-sm">{club.leader?.displayName || "-"}</p>
            <a className="text-sm text-primary block mt-1" href={`mailto:${club.leader?.email || ""}`}>{club.leader?.email || "-"}</a>
          </div>

          <div className="bg-white rounded-xl shadow p-4 text-sm text-gray-700">
            <p><strong>Members:</strong> {club.stats?.memberCount ?? club.members?.length ?? 0}</p>
            <p className="mt-2"><strong>Meeting:</strong> {club.meetingTimes || "—"}</p>
            <p className="mt-2"><strong>Contact:</strong> {club.contactPhone || club.contactEmail || "—"}</p>
          </div>
        </aside>
        </div>
{/* Gallery - shown only if images exist */}
{Array.isArray(club.images) && club.images.length > 0 && (
  <div className="bg-white rounded-xl shadow p-6 mt-5">
    <h3 className="text-4xl text-center font-bold mb-6  pb-3">Gallery</h3>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {club.images.map((img, idx) => (
        <motion.div 
          key={img._id || idx}
          className="relative rounded-xl overflow-hidden shadow-md group"
           whileHover={{ scale: 1.05 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: idx * 0.1 }}
        >
          <img 
            src={img.url}
            alt={img.caption || "gallery"} 
            className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
            
          />

          {/* subtle overlay */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>

          

          {/* Delete Button */}
          {isLeaderOrAdmin && (
            <button
              onClick={() => handleRemoveImage(img._id)}
              className="absolute top-2 right-2 text-white bg-red-600/80 hover:bg-red-600 px-2 py-1 text-xs rounded-md"
            >
              Delete
            </button>
          )}
        </motion.div>
      ))}
    </div>
  </div>
)}


          {/* Add gallery file input (leader/admin) */}
          {isLeaderOrAdmin && (
            <div className="bg-white rounded-xl shadow p-6">
              <h4 className="font-medium mb-2">Add Gallery Image</h4>
              <div className="flex items-center gap-3">
                <input ref={galleryFileRef} onChange={handleGalleryFileChange} accept="image/*" type="file" className="file-input file-input-bordered" />
                <button onClick={() => { galleryFileRef.current && galleryFileRef.current.click(); }} className="btn btn-ghost">Choose file</button>
                {galleryUploading && <span className="text-sm text-gray-500">Uploading...</span>}
              </div>
            </div>
          )}

          {/* Sections (dynamic content) */}
          {Array.isArray(club.sections) && club.sections.length > 0 && (
            <div className="space-y-6 my-5 ">
              {/* Sections */}
{club.sections.map((section, idx) => (
  <motion.article 
    key={section._id} 
    className="rounded-xl overflow-hidden py-4"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: idx * 0.1 }}
  >
    <div className="md:flex">
      {section.image && (
        <div className="md:w-1/2">
          <img src={section.image} alt={section.title || "section image"} className="w-full h-64 object-cover" />
        </div>
      )}
      <div className={`p-6 ${section.image ? "md:w-1/2" : "w-full"} bg-white ml-4 p-2`}>
        {section.title && <h3 className="text-2xl font-semibold mb-2">{section.title}</h3>}
        <p className="text-gray-700 leading-relaxed">{section.description}</p>
        {isLeaderOrAdmin && (
          <div className="mt-4 flex gap-3">
            <button onClick={() => handleRemoveSection(section._id)} className="text-red-500 text-sm">Delete Section</button>
          </div>
        )}
      </div>
    </div>
  </motion.article>
))}

            </div>
          )}

          {/* Add Section form */}
          {isLeaderOrAdmin && (
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">Add Content Section</h4>
                <button onClick={() => setShowSectionForm((s) => !s)} className="btn btn-ghost text-sm">
                  {showSectionForm ? "Close" : "Add Section"}
                </button>
              </div>

              {showSectionForm && (
                <div className="mt-4 space-y-3">
                  <input className="input input-bordered w-full" placeholder="Title (optional)"
                    value={newSection.title}
                    onChange={(e) => setNewSection((p) => ({ ...p, title: e.target.value }))}
                  />

                  <textarea className="textarea textarea-bordered w-full" placeholder="Description (required)"
                    value={newSection.description}
                    onChange={(e) => setNewSection((p) => ({ ...p, description: e.target.value }))}
                  />

                  <div className="flex items-center gap-3">
                    <input ref={sectionFileRef} onChange={handleSectionFileChange} accept="image/*" type="file" className="file-input file-input-bordered" />
                    <button type="button" onClick={() => sectionFileRef.current && sectionFileRef.current.click()} className="btn btn-ghost">Upload image</button>
                    {sectionUploading && <span className="text-sm text-gray-500">Uploading...</span>}
                  </div>

                  {/* show preview if image url set */}
                  {newSection.image && (
                    <div className="mt-2">
                      <img src={newSection.image} alt="preview" className="w-full h-48 object-cover rounded-md" />
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button onClick={handleAddSection} className="btn btn-primary">Add Section</button>
                    <button onClick={() => { setNewSection({ title: "", image: "", description: "" }); setShowSectionForm(false); }} className="btn btn-ghost">Cancel</button>
                  </div>
                </div>
              )}
            </div>
          )}
      </div>
    </div>
  );
}
