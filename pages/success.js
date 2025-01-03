import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import BookingSummary from '../components/BookingSummary';
import Lottie from 'react-lottie';
import successAnimation from '../public/success-animation.json'; // Import your Lottie animation here

const SuccessPage = () => {
  const router = useRouter();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    // Fetch the booking details from localStorage or redirect if no booking found
    const bookingData = JSON.parse(localStorage.getItem('booking'));
    if (bookingData) {
      setBooking(bookingData);
    } else {
      router.push('/'); // Redirect to the form if no booking is found
    }
  }, [router]);

  if (!booking) return <p>Loading...</p>;

  // Lottie animation options
  const lottieOptions = {
    loop: false,
    autoplay: true,
    animationData: successAnimation, // Pass the animation data
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="success-page">
      <div className="animation-container">
        <Lottie options={lottieOptions} height={150} width={200} />
      </div>
      <h2>Booking Successful!</h2>
      <BookingSummary booking={booking} />
    </div>
  );
};

export default SuccessPage;
