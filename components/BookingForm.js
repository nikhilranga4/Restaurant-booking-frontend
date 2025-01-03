import { useState } from 'react';
import { useRouter } from 'next/router';

// Function to create booking (API request)
const createBooking = async (bookingData) => {
  try {
    const response = await fetch('https://restaurant-booking-backend-q2qo.onrender.com/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error making the booking');
  }
};

const BookingForm = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!name || !contact || !date || !time || !guests) {
      setError('All fields are required');
      return;
    }

    const bookingData = {
      name,
      contact,
      date,
      time,
      guests: parseInt(guests),
    };

    try {
      const response = await createBooking(bookingData);
      if (response.message === 'Booking created successfully') {
        // Store booking data in localStorage
        localStorage.setItem('booking', JSON.stringify(bookingData));
        router.push('/success'); // Redirect to success page
      } else {
        setError(response.message || 'Booking failed');
      }
    } catch (err) {
      setError('Something went wrong');
    }
  };

  return (
    <div className="booking-form">
      <h2 className="head1">Book a Table</h2>
      {error && <p className="error">{error}</p>} {/* Display error if exists */}
     <form onSubmit={handleSubmit}>
  <div>
    <label>Name:</label>
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      required
    />
  </div>
  <div>
    <label>Contact:</label>
    <input
      type="text"
      value={contact}
      onChange={(e) => setContact(e.target.value)}
      required
    />
  </div>
  <div>
    <label>Date:</label>
    <input
      type="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
      required
    />
  </div>
  <div>
    <label>Time:</label>
    <input
      type="time"
      value={time}
      onChange={(e) => setTime(e.target.value)}
      required
    />
  </div>
  <div>
    <label>Guests:</label>
    <input
      type="number"
      value={guests}
      onChange={(e) => setGuests(e.target.value)}
      required
      min="1"
    />
  </div>
  <div className="button-wrapper">
    <button type="submit" className="animated-button">Book Now</button>
  </div>
</form>

    </div>
  );
};

export default BookingForm;
