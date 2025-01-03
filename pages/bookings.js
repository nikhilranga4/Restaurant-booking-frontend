import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import BookingList from '/Users/nikhil/Desktop/tony/restaurant-booking-frontend/components/BookingList';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch all bookings from the backend
    const fetchBookings = async () => {
      try {
        const response = await fetch('https://restaurant-booking-backend-q2qo.onrender.com/api/bookings');
        const data = await response.json();

        if (response.ok) {
          setBookings(data);
        } else {
          setError('Failed to load bookings');
        }
      } catch (err) {
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bookings-page">
      <BookingList bookings={bookings} />
      <div className="actions" style={{ marginTop: '20px', textAlign: 'center' }}>
        <button
          className="back-button"
          onClick={() => router.push('/success')} // Navigate to success page
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default BookingsPage;
