import React from 'react'; // Import React
import Hero from '../components/Hero'; // Import Hero component for the main banner or hero section
import LatestCollection from '../components/LatestCollection'; // Import LatestCollection component to display new products
import BestSeller from '../components/BestSeller'; // Import BestSeller component for popular products
import OurPolicy from '../components/OurPolicy'; // Import OurPolicy component to display company policies
import NewsletterBox from '../components/NewsletterBox'; // Import NewsletterBox for email subscription

const Home = () => {
  return (
    <div>
      {/* Render the Hero section */}
      <Hero />
      
      {/* Render the Latest Collection section */}
      <LatestCollection />
      
      {/* Render the Best Seller section */}
      <BestSeller />
      
      {/* Render the Our Policy section */}
      <OurPolicy />
      
      {/* Render the Newsletter subscription box */}
      <NewsletterBox />
    </div>
  );
}

export default Home; // Export the Home component for use in other parts of the application
