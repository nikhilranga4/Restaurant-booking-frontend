// components/BookingList.js
import React, { useState, useEffect } from 'react';
import BookingDeleteButton from './BookingDeleteButton';  // Import the delete button component

const BookingList = ({ bookings }) => {
  const [bookingList, setBookingList] = useState(bookings);

  // Define the onDelete function to remove a booking from the list
  const handleDelete = (id) => {
    setBookingList(bookingList.filter((booking) => booking._id !== id));
  };

  return (
    <div className="booking-list">
      <h2>All Bookings</h2>
      {bookingList.length > 0 ? (
        <div className="booking-cards">
          {bookingList.map((booking) => (
            <div className="booking-card" key={booking._id}>
              <h3>{booking.name}</h3>
              <p><strong>Contact:</strong> {booking.contact}</p>
              <p><strong>Date:</strong> {booking.date}</p>
              <p><strong>Time:</strong> {booking.time}</p>
              <p><strong>Guests:</strong> {booking.guests}</p>
              <BookingDeleteButton 
                id={booking._id} 
                onDelete={handleDelete}  // Pass onDelete to BookingDeleteButton
              />
            </div>
          ))}
        </div>
      ) : (
        <p>No bookings available</p>
      )}
    </div>
  );
};

export default BookingList;
