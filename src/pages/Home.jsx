import { useState, useEffect } from "react";
import RoomCard from "../components/RoomCard";

export default function Home({ user, onLogout }) {
  const [view, setView] = useState("rooms");
  const [showProfile, setShowProfile] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [propertyType, setPropertyType] = useState("1 BHK");
  const [tenantPreference, setTenantPreference] = useState("Bachelor");
  const [contact, setContact] = useState("");
  const [imageURL, setImageURL] = useState("");

  // Search & Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showFilterInputs, setShowFilterInputs] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  useEffect(() => {
    const randomRooms = [];
    const images = [
      "https://i.ibb.co/dsjYzdfp/download-2.jpg",
      "https://i.ibb.co/99yj6598/download-1.jpg",
      "https://i.ibb.co/YTRq9r53/download.jpg",
    ];

    const adjectives = ["Cozy", "Bright", "Modern", "Spacious", "Luxury"];
    const nouns = ["Stay", "Nest", "Abode", "Home", "Haven"];

    for (let i = 1; i <= 50; i++) {
      const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
      const noun = nouns[Math.floor(Math.random() * nouns.length)];
      randomRooms.push({
        id: i,
        title: `Room ${i} - ${adj} ${noun}`,
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
      title: title || `Room ${rooms.length + 1} - Cozy Stay`,
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

  // Filtered rooms based on search & max price
  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = maxPrice ? room.price <= parseInt(maxPrice) : true;
    return matchesSearch && matchesPrice;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-blue-50">
      {/* Header */}
      <nav className="home-navbar p-4 flex flex-col items-center bg-gradient-to-r from-blue-400 to-pink-300 rounded-b-3xl shadow-lg">
        <div className="logo-title-row flex items-center gap-4 mb-2">
          <div className="header-logo-card p-2 bg-white rounded-full shadow-lg">
            <img
              src="https://i.ibb.co/Xr7b8yPQ/images.png"
              alt="Room Finder Logo"
              className="header-logo w-12"
            />
          </div>
          <h1 className="home-title text-3xl font-bold text-white">
            Room Finder
          </h1>
        </div>

        <div className="home-nav-actions flex flex-wrap justify-center gap-3 mt-2">
          <button
            anim="sheen"
            onClick={() => setView("rooms")}
            className="nav-btn primary px-4 py-2 rounded"
          >
            Available Rooms
          </button>

          <button
            anim="sheen"
            onClick={() => setView("addRoom")}
            className="nav-btn success px-4 py-2 rounded"
          >
            Add Room
          </button>

          <button
            anim="sheen"
            onClick={() => setShowProfile(!showProfile)}
            className="nav-btn warning px-4 py-2 rounded"
          >
            Profile
          </button>

          <button
            anim="sheen"
            onClick={onLogout}
            className="nav-btn danger px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        {showProfile && user && (
          <div className="profile-card animate-fadeIn mt-4 bg-white p-4 rounded shadow-md">
            <h3 className="font-bold mb-2">Profile</h3>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="flex-1 p-6 w-full max-w-7xl mx-auto">
        {view === "rooms" && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-blue-600">
              Available Rooms
            </h2>

            {/* Search & Filter Buttons */}
            <div className="flex flex-wrap gap-3 mb-4">
              <button
                anim="sheen"
                className="search-btn px-4 py-2 rounded"
                onClick={() => setShowSearchInput(!showSearchInput)}
              >
                Search
              </button>
              <button
                anim="sheen"
                className="filter-btn px-4 py-2 rounded"
                onClick={() => setShowFilterInputs(!showFilterInputs)}
              >
                Filter by Price
              </button>
            </div>

            {/* Search Input */}
            {showSearchInput && (
              <input
                type="text"
                placeholder="Search by title or location"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full mb-4 p-3 rounded-xl shadow-lg border-0 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            )}

            {/* Filter Input */}
            {showFilterInputs && (
              <div className="flex items-center gap-2 mb-4">
                <input
                  type="number"
                  placeholder="Enter max price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="p-3 rounded-xl shadow-lg border-0 focus:ring-2 focus:ring-indigo-400 outline-none w-48"
                />
                <button
                  anim="sheen"
                  className="reset-btn px-3 py-2 rounded"
                  onClick={() => setMaxPrice("")}
                >
                  Reset
                </button>
              </div>
            )}

            {loading ? (
              <p className="text-center mt-20 animate-pulse">
                Loading rooms...
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                {filteredRooms.map((room) => (
                  <RoomCard key={room.id} room={room} />
                ))}
                {filteredRooms.length === 0 && (
                  <p className="col-span-full text-center text-gray-500">
                    No rooms match your search/filter
                  </p>
                )}
              </div>
            )}
          </>
        )}

        {view === "addRoom" && (
          <form
            onSubmit={handleAddRoom}
            className="bg-white p-6 rounded shadow-md max-w-lg mx-auto space-y-4 mt-6"
          >
            <h2 className="text-2xl font-bold mb-4 text-blue-600">
              Add New Room
            </h2>

            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />

            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />

            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option>1 BHK</option>
              <option>2 BHK</option>
              <option>3 BHK</option>
            </select>

            <select
              value={tenantPreference}
              onChange={(e) => setTenantPreference(e.target.value)}
              className="w-full p-2 border rounded"
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
              required
              className="w-full p-2 border rounded"
            />

            <input
              type="text"
              placeholder="Image URL"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              className="w-full p-2 border rounded"
            />

            <button
              type="submit"
              anim="sheen"
              className="nav-btn primary w-full"
            >
              Add Room
            </button>
          </form>
        )}
      </div>

      {/* Footer */}
      <footer className="p-6 bg-gradient-to-r from-blue-400 to-pink-300 rounded-t-3xl shadow-lg">
        <div className="contact-section mb-2">
          <p className="text-white font-bold">Contact Me: +91 6304286874</p>
          <button
            anim="sheen"
            className="send-msg-btn mt-1 px-4 py-2 rounded shadow"
          >
            Send Message
          </button>
        </div>
        <div className="social-icons flex gap-4 mt-3">
          <a
            href="https://github.com/Teja121104"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              alt="GitHub"
              className="w-6 h-6"
            />
          </a>
          <a
            href="https://www.instagram.com/mr_teja._.121104/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/87/87390.png"
              alt="Instagram"
              className="w-6 h-6"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/potharaju-teja-50163826a/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/1388/1388915.png"
              alt="linkedin"
              className="w-6 h-6"
            />
          </a>
        </div>
      </footer>
    </div>
  );
}
