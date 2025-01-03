// pages/_app.js
import '../styles/globals.css'; // Import global styles
import { useEffect } from 'react';
import '../styles/BookingList.css';
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // For smooth scrolling between pages
    import('smooth-scroll').then((SmoothScrollModule) => {
      const SmoothScroll = SmoothScrollModule.default; // Access the default export
      new SmoothScroll('a[href*="#"]', {
        speed: 800,
        speedAsDuration: true,
      });
    });
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
