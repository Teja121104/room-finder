// src/pages/TestDB.jsx
import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function TestDB() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRooms() {
      const { data, error } = await supabase.from("rooms").select("*");
      if (error) {
        console.error("Database fetch error:", error);
      } else {
        setRooms(data);
      }
      setLoading(false);
    }

    fetchRooms();
  }, []);

  if (loading) return <p>Loading database...</p>;

  return (
    <div>
      <h1>Database Test</h1>
      {rooms.length === 0 ? (
        <p>No rooms found.</p>
      ) : (
        <ul>
          {rooms.map((room) => (
            <li key={room.id}>
              {room.title} - {room.location} - ${room.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
