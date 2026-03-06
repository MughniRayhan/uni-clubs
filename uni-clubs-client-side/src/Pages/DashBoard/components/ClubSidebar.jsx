export default function ClubSidebar({ clubs, selectedClub, setSelectedClub }) {
    return (
        <div className="w-64 bg-white shadow rounded p-4">
            <h2 className="font-bold text-lg mb-4">Clubs</h2>

            {clubs.map((club) => (
                <div
                    key={club._id}
                    onClick={() => setSelectedClub(club)}
                    className={`p-2 rounded cursor-pointer mb-2 ${selectedClub?._id === club._id
                        ? "bg-blue-500 text-white"
                        : "hover:bg-gray-200"
                        }`}
                >
                    {club.name}
                </div>
            ))}
        </div>
    );
}