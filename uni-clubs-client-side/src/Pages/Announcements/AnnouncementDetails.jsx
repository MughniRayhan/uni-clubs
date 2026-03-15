import { useEffect, useState } from "react";
import { useParams } from "react-router";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const AnnouncementDetails = () => {

    const { id } = useParams();
    const axiosSecure = UseAxiosSecure();

    const [announcement, setAnnouncement] = useState(null);

    useEffect(() => {

        const fetchAnnouncement = async () => {

            const res = await axiosSecure.get(`/announcements/${id}`);

            setAnnouncement(res.data.data);
        };

        fetchAnnouncement();

    }, [id, axiosSecure]);


    if (!announcement) return <p className="p-6">Loading...</p>;


    return (
        <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6 py-16">
            <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">

                <h1 className="text-3xl font-bold mb-4">
                    {announcement.title}
                </h1>


                <div className="flex gap-4 mb-6">



                    <span className="text-gray-500">
                        {new Date(announcement.createdAt).toLocaleDateString()}
                    </span>

                </div>


                <p className="text-lg text-gray-700 whitespace-pre-line mb-6">
                    {announcement.message}
                </p>


                {announcement.fileUrl && (

                    <a
                        href={`${announcement.fileUrl}?fl_attachment`}
                        download
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary"
                    >
                        Download Attachment
                    </a>

                )}

            </div>
        </div>
    );
};

export default AnnouncementDetails;