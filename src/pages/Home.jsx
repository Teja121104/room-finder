import { useState, useEffect } from "react";
import RoomCard from "../components/RoomCard";

export default function Home({ user, onLogout }) {
  const [view, setView] = useState("rooms"); // rooms / addRoom
  const [showProfile, setShowProfile] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add Room form state
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [propertyType, setPropertyType] = useState("1 BHK");
  const [tenantPreference, setTenantPreference] = useState("Bachelor");
  const [contact, setContact] = useState("");
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    const randomRooms = [];
    const images = [
      "https://i.ibb.co/dsjYzdfp/download-2.jpg",
      "https://i.ibb.co/99yj6598/download-1.jpg",
      "https://i.ibb.co/YTRq9r53/download.jpg",
    ];
    for (let i = 1; i <= 50; i++) {
      randomRooms.push({
        id: i,
        title: `Room ${i} - Cozy Stay`,
        location: `City ${Math.ceil(Math.random() * 10)}`,
        price: Math.floor(Math.random() * 30000) + 5000,
        property_type: ["1 BHK", "2 BHK", "3 BHK"][
          Math.floor(Math.random() * 3)
        ],
        tenant_preference: ["Bachelor", "Family", "Girls", "Working"][
          Math.floor(Math.random() * 4)
        ],
        contact_number: "+91 98765" + Math.floor(10000 + Math.random() * 90000),
        image: [images[Math.floor(Math.random() * images.length)]],
      });
    }
    setTimeout(() => {
      setRooms(randomRooms);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAddRoom = (e) => {
    e.preventDefault();
    const newRoom = {
      id: rooms.length + 1,
      title,
      location,
      price: parseInt(price),
      property_type: propertyType,
      tenant_preference: tenantPreference,
      contact_number: contact,
      image: [imageURL || "https://i.ibb.co/dsjYzdfp/download-2.jpg"],
    };
    setRooms([newRoom, ...rooms]);
    setTitle("");
    setLocation("");
    setPrice("");
    setPropertyType("1 BHK");
    setTenantPreference("Bachelor");
    setContact("");
    setImageURL("");
    setView("rooms");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-50 relative">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 flex flex-wrap justify-around items-center gap-2">
        <h1 className="font-bold text-xl w-full md:w-auto text-center md:text-left">
          Room Finder
        </h1>

        <div className="flex flex-wrap w-full md:w-auto gap-2 justify-center">
          <button
            onClick={() => setView("rooms")}
            className="flex-1 md:flex-auto text-center px-4 py-2 bg-blue-500 rounded hover:bg-blue-700 transition"
          >
            Available Rooms
          </button>
          <button
            onClick={() => setView("addRoom")}
            className="flex-1 md:flex-auto text-center px-4 py-2 bg-green-500 rounded hover:bg-green-700 transition"
          >
            Add Room
          </button>
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex-1 md:flex-auto text-center px-4 py-2 bg-yellow-500 rounded hover:bg-yellow-700 transition"
          >
            Profile
          </button>
          <button
            onClick={onLogout}
            className="flex-1 md:flex-auto text-center px-4 py-2 bg-red-500 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>

        {showProfile && user && (
          <div className="absolute right-4 top-20 bg-white text-black p-4 rounded shadow-md w-56 animate-fadeIn">
            <h3 className="font-bold mb-2">Profile</h3>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        )}
      </nav>

      <div className="p-6">
        {view === "rooms" && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-blue-600">
              Available Rooms
            </h2>
            {loading ? (
              <p className="text-center mt-20 animate-pulse">
                Loading rooms...
              </p>
            ) : rooms.length === 0 ? (
              <p className="text-center mt-20">No rooms available yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                {rooms.map((room) => (
                  <RoomCard key={room.id} room={room} />
                ))}
              </div>
            )}
          </>
        )}

        {view === "addRoom" && (
          <form
            onSubmit={handleAddRoom}
            className="bg-white p-6 rounded shadow-md max-w-lg mx-auto space-y-4 animate-fadeIn mt-6"
          >
            <h2 className="text-2xl font-bold mb-4 text-blue-600">
              Add New Room
            </h2>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
              required
            />
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
            >
              <option>1 BHK</option>
              <option>2 BHK</option>
              <option>3 BHK</option>
            </select>
            <select
              value={tenantPreference}
              onChange={(e) => setTenantPreference(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
            >
              <option>Bachelor</option>
              <option>Family</option>
              <option>Girls</option>
              <option>Working</option>
            </select>
            <input
              type="text"
              placeholder="Contact Number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
            >
              Add Room
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
