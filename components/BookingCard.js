// components/BookingCard.js
const BookingCard = ({ booking }) => {
  return (
    <div className="booking-card">
      <h3>{booking.name}</h3>
      <p><strong>Contact:</strong> {booking.contact}</p>
      <p><strong>Date:</strong> {booking.date}</p>
      <p><strong>Time:</strong> {booking.time}</p>
      <p><strong>Guests:</strong> {booking.guests}</p>
    </div>
  );
};

export default BookingCard;
