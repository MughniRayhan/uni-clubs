import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const Announcements = () => {

    const axiosSecure = UseAxiosSecure();
    const navigate = useNavigate();

    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {

        const fetchAnnouncements = async () => {

            const res = await axiosSecure.get("/announcements");

            setAnnouncements(res.data.data);
        };

        fetchAnnouncements();

    }, [axiosSecure]);


    return (
        <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100">
            <div className="max-w-7xl mx-auto px-6 py-16 ">

                <h1 className="text-3xl font-bold mb-6">
                    Announcements
                </h1>


                <div className="grid md:grid-cols-3 gap-6">

                    {announcements.map((item) => (

                        <div
                            key={item._id}
                            onClick={() => navigate(`/announcements/${item._id}`)}
                            className="border-t-2 border-primary bg-white rounded-xl p-5 shadow hover:shadow-lg cursor-pointer transition"
                        >

                            <div className="flex justify-between mb-2">



                                <span className="text-sm text-gray-500">
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </span>

                            </div>


                            <h2 className="text-xl font-bold mb-2">
                                {item.title}
                            </h2>


                            <p className="text-gray-600 line-clamp-3">
                                {item.message}
                            </p>


                            {item.fileUrl && (
                                <div className="mt-3 text-sm text-blue-500">
                                    📎 Attachment available
                                </div>
                            )}

                        </div>

                    ))}

                </div>

            </div>
        </div>
    );
};

export default Announcements;