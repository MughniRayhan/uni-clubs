import { useState, useEffect } from "react";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { FaTrash } from "react-icons/fa";

const ManageClubDetails = () => {

    const axios = UseAxiosSecure();

    const [clubs, setClubs] = useState([]);
    const [selectedClub, setSelectedClub] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        leaderCards: [],
        sections: []
    });

    // fetch clubs
    useEffect(() => {
        axios.get("/clubs/approved")
            .then(res => setClubs(res.data));
    }, []);

    // fetch selected club details
    useEffect(() => {

        if (!selectedClub) return;

        axios.get(`/clubs/${selectedClub}`)
            .then(res => {

                const club = res.data;

                setFormData({
                    ...club,
                    leaderCards: club.leaderCards || [],
                    sections: club.sections || []
                });

            });

    }, [selectedClub]);

    const deleteSection = async (sectionId, index) => {

        try {

            if (!sectionId) {
                setFormData(prev => ({
                    ...prev,
                    sections: prev.sections.filter((_, i) => i !== index)
                }));
                return;
            }

            await axios.delete(`/clubs/${selectedClub}/sections/${sectionId}`);

            setFormData(prev => ({
                ...prev,
                sections: prev.sections.filter(
                    s => s._id?.toString() !== sectionId
                )
            }));

        } catch (error) {
            console.error(error);
        }

    };

    const deleteLeaderCard = async (cardId, index) => {

        if (!cardId) {
            setFormData(prev => ({
                ...prev,
                leaderCards: prev.leaderCards.filter((_, i) => i !== index)
            }));
            return;
        }

        try {
            await axios.delete(`/clubs/${selectedClub}/leaderCards/${cardId}`);

            setFormData(prev => ({
                ...prev,
                leaderCards: prev.leaderCards.filter(card => card._id !== cardId)
            }));

        } catch (error) {
            console.error("Delete leader card failed", error);
        }
    };
    // Add leader card
    const addLeaderCard = () => {

        setFormData(prev => ({
            ...prev,
            leaderCards: [
                ...prev.leaderCards,
                { name: "", role: "", image: "" }
            ]
        }));

    };


    // Add section
    const addSection = () => {

        setFormData(prev => ({
            ...prev,
            sections: [
                ...prev.sections,
                { title: "", description: "", image: "" }
            ]
        }));

    };


    // Upload image
    const uploadImage = async (file) => {

        const form = new FormData();
        form.append("image", file);

        const res = await fetch(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_key}`,
            {
                method: "POST",
                body: form
            }
        );

        const data = await res.json();

        return data.data.url;

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        await axios.patch(`/clubs/${selectedClub}`, formData);

        alert("Club Updated Successfully");

    };

    return (

        <div className=" p-6 bg-white rounded">

            <h2 className="text-2xl font-bold mb-6">
                Manage Club Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8 ">
                {/* Select Club */}

                <select
                    onChange={(e) => setSelectedClub(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-[#036666] cursor-pointer"

                >

                    <option>Select Club</option>

                    {clubs.map(club => (
                        <option key={club._id} value={club._id}>
                            {club.name}
                        </option>
                    ))}

                </select>


                {/* Basic Info */}

                <div className="bg-white shadow p-6 rounded">

                    <h3 className="text-xl font-semibold mb-4">
                        Basic Info
                    </h3>

                    <input
                        type="text"
                        placeholder="Club Name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-[#036666]"

                        value={formData.name || ""}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                name: e.target.value
                            })
                        }
                    />

                    <textarea
                        placeholder="Description"
                        className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-[#036666]"
                        value={formData.description || ""}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                description: e.target.value
                            })
                        }
                    />

                </div>



                {/* Leader Cards */}

                <div className="bg-white shadow p-6 rounded">

                    <h3 className="text-xl font-semibold mb-4">
                        Leader Cards
                    </h3>

                    {formData.leaderCards.map((card, index) => (

                        <div
                            key={index}
                            className=" p-4 mb-4 rounded  flex justify-between"
                        >

                            <div className="space-y-2">
                                <input
                                    type="text"
                                    placeholder="Leader Name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-[#036666]"
                                    value={card.name}
                                    onChange={(e) => {
                                        const updated = [...formData.leaderCards];
                                        updated[index].name = e.target.value;
                                        setFormData({
                                            ...formData,
                                            leaderCards: updated
                                        });

                                    }}
                                />

                                <input
                                    type="text"
                                    placeholder="Role"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-[#036666]"
                                    value={card.role}
                                    onChange={(e) => {

                                        const updated = [...formData.leaderCards];

                                        updated[index].role = e.target.value;

                                        setFormData({
                                            ...formData,
                                            leaderCards: updated
                                        });

                                    }}
                                />

                                <input
                                    type="file"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-[#036666]"
                                    onChange={async (e) => {
                                        const file = e.target.files[0];
                                        const url = await uploadImage(file);
                                        const updated = [...formData.leaderCards];
                                        updated[index].image = url;
                                        setFormData({
                                            ...formData,
                                            leaderCards: updated
                                        });
                                    }}
                                />
                            </div>

                            <button
                                type="button"
                                onClick={() => deleteLeaderCard(card._id, index)}
                                className="text-red-500  px-3 py-1 rounded text-sm cursor-pointer"
                            >
                                <FaTrash />
                            </button>
                        </div>

                    ))}

                    <button
                        type="button"
                        onClick={addLeaderCard}
                        className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
                    >
                        Add Leader
                    </button>

                </div>

                {/* Sections */}

                <div className="bg-white shadow p-6 rounded">

                    <h3 className="text-xl font-semibold mb-4">
                        Sections
                    </h3>

                    {formData.sections.map((section, index) => (

                        <div
                            key={index}
                            className=" p-4 mb-4 rounded space-y-2 flex justify-between "
                        >

                            <div>
                                <input
                                    type="text"
                                    placeholder="Title"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-[#036666]"
                                    value={section.title}
                                    onChange={(e) => {
                                        const updated = [...formData.sections];
                                        updated[index].title = e.target.value;
                                        setFormData({
                                            ...formData,
                                            sections: updated
                                        });
                                    }}
                                />

                                <textarea
                                    placeholder="Description"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-[#036666]"
                                    value={section.description}
                                    onChange={(e) => {
                                        const updated = [...formData.sections];
                                        updated[index].description = e.target.value;
                                        setFormData({
                                            ...formData,
                                            sections: updated
                                        });

                                    }}
                                />

                                <input
                                    type="file"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-[#036666]"
                                    onChange={async (e) => {
                                        const file = e.target.files[0];
                                        const url = await uploadImage(file);
                                        const updated = [...formData.sections];
                                        updated[index].image = url;
                                        setFormData({
                                            ...formData,
                                            sections: updated
                                        });
                                    }}
                                />
                            </div>

                            <div
                                onClick={() => deleteSection(section._id, index)}
                                className=" text-red-500 px-3 py-1 rounded text-sm cursor-pointer"
                            >
                                <FaTrash />
                            </div>

                        </div>

                    ))}

                    <button
                        type="button"
                        onClick={addSection}
                        className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
                    >
                        Add Section
                    </button>

                </div>



                <button
                    type="submit"
                    className="bg-black text-white px-6 py-3 rounded cursor-pointer"
                >
                    Update Club
                </button>

            </form>

        </div>
    );
};

export default ManageClubDetails;