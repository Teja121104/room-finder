export default function RoomCard({ room }) {
  return (
    <div className="room-card overflow-hidden rounded-lg shadow-lg transform hover:scale-105 transition">
      {/* Image */}
      <img src={room.image[0]} alt={room.title} />

      {/* Black Details Box */}
      <div className="bg-black bg-opacity-90 text-white p-4 space-y-1">
        <h3 className="font-bold text-lg">{room.title}</h3>
        <p className="text-sm">Location: {room.location}</p>
        <p className="text-sm">Price: ₹{room.price}</p>
        <p className="text-sm">Type: {room.property_type}</p>
        <p className="text-sm">Tenant: {room.tenant_preference}</p>
        <p className="text-sm">Contact: {room.contact_number}</p>
      </div>
    </div>
  );
}
