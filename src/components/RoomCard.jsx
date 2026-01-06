export default function RoomCard({ room }) {
  return (
    <div className="room-card">
      <div className="room-card-inner">
        <div className="room-card-glare"></div>
        <img src={room.image[0]} alt={room.title} className="room-card-img" />
        <div className="room-card-content">
          <h3 className="room-card-title">{room.title}</h3>
          <p className="room-card-location">{room.location}</p>
          <p className="room-card-price">₹{room.price}</p>
          <p className="room-card-details">
            {room.property_type} | {room.tenant_preference}
          </p>
          <p className="room-card-contact">{room.contact_number}</p>
        </div>
      </div>
    </div>
  );
}
