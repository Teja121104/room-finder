// src/pages/AddRoom.jsx
import { useState } from "react";
import { supabase } from "../supabase";
import "./index.css"; // Tailwind import
import "./app.css"; // Custom CSS import

export default function AddRoom() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [propertyType, setPropertyType] = useState("1 BHK");
  const [tenantPreference, setTenantPreference] = useState("Bachelor");
  const [contact, setContact] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Upload images to Supabase storage (optional)
    const imageUrls = [];
    for (let i = 0; i < images.length; i++) {
      const file = images[i];
      // eslint-disable-next-line no-unused-vars
      const { data, error } = await supabase.storage
        .from("room-images") // create this bucket in Supabase
        .upload(`public/${file.name}`, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) console.error(error);
      else imageUrls.push(`${supabase.storageUrl}/public/${file.name}`);
    }

    // Insert room into table
    const { error } = await supabase.from("rooms").insert([
      {
        title,
        location,
        price,
        property_type: propertyType,
        tenant_preference: tenantPreference,
        contact_number: contact,
        images: imageUrls, // array of URLs
      },
    ]);

    if (error) alert(error.message);
    else alert("Room added successfully!");

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-lg space-y-4"
      >
        <h1 className="text-2xl font-bold text-blue-600 text-center">
          Add Room
        </h1>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border rounded"
          required
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
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="file"
          multiple
          onChange={handleImageUpload}
          className="w-full"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Adding..." : "Add Room"}
        </button>
      </form>
    </div>
  );
}
