// components/BookingDeleteButton.js
import React from 'react';
import { useRouter } from 'next/router'; // Import useRouter from Next.js

const BookingDeleteButton = ({ id, onDelete }) => {
  const router = useRouter(); // Initialize the router

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://restaurant-booking-backend-q2qo.onrender.com/api/bookings/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message === 'Booking deleted successfully') {
          onDelete(id); // Callback to remove the booking from the list
          // Redirect to the bookings page after successful deletion
          router.push('/bookings'); // Navigates to the /bookings page
        } else {
          console.error('Failed to delete the booking');
        }
      } else {
        console.error('Error deleting the booking');
      }
    } catch (error) {
      console.error('An error occurred while deleting the booking:', error);
    }
  };

  return (
    <button onClick={handleDelete} className="delete-button">
      Delete Booking
    </button>
  );
};

export default BookingDeleteButton;
