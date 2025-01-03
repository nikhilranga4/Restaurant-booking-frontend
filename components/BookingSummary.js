import { useRouter } from 'next/router';

const BookingSummary = ({ booking }) => {
  const router = useRouter();

  return (
    <div className="booking-summary">
      <h3>Booking Confirmation</h3>
      <p><strong>Name:</strong> {booking.name}</p>
      <p><strong>Contact:</strong> {booking.contact}</p>
      <p><strong>Date:</strong> {booking.date}</p>
      <p><strong>Time:</strong> {booking.time}</p>
      <p><strong>Guests:</strong> {booking.guests}</p>
      
      <div className="actions">
        <button onClick={() => router.push('/')} className="back-btn">
          Go Back to Booking Form
        </button>
        <button onClick={() => router.push('/bookings')} className="view-bookings-btn">
          View All Bookings
        </button>
      </div>
    </div>
  );
};

export default BookingSummary;
