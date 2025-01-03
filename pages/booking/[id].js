// pages/booking/[id].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getBookings } from '../api/bookings';

const BookingDetail = ({ booking }) => {
  const [bookingData, setBookingData] = useState(booking);
  const router = useRouter();

  useEffect(() => {
    if (!bookingData) {
      router.push('/');
    }
  }, [bookingData, router]);

  return (
    <div>
      {bookingData ? (
        <div>
          <h2>Booking Details</h2>
          <p>Name: {bookingData.name}</p>
          <p>Contact: {bookingData.contact}</p>
          <p>Date: {bookingData.date}</p>
          <p>Time: {bookingData.time}</p>
          <p>Guests: {bookingData.guests}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const { id } = params;
  const bookings = await getBookings();
  const booking = bookings.find(b => b._id === id) || null;

  return { props: { booking } };
}

export default BookingDetail;
