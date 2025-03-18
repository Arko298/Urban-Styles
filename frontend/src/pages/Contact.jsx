import React from 'react';
import Title from '../components/Title'; 
import { assets } from '../assets/assets'; 
import NewsletterBox from '../components/NewsletterBox'; 

const Contact = () => {
  return (
    <div>
      {/* Title Section */}
      <div className='text-center text-2xl pt-10 pb-5 border-t'>
        <Title text1={'CONTACT'} text2={'US'} /> {/* Render title for contact section */}
      </div>

      {/* Store Information Section */}
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-20'>
        <img 
          className='w-full h-auto max-w-xs md:max-w-md' 
          src={assets.contact_img} 
          alt="Contact Us Visual Representation" // Descriptive alt text for accessibility
        />

        {/* Store and Contact Details */}
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p> {/* Store Title */}
          <p className='text-gray-500'>
          123 Park Street<br/>
         Suite 502, Kolkata, West Bengal
         700016, India {/* Store address */}
          </p>
          <p className='text-gray-500'>
            Tel: (415) 555-0132 {/* Placeholder phone number */}
          </p>

          {/* Careers Section */}
          <p className='font-semibold text-xl text-gray-600'>Careers at UrbanStyles</p> {/* Careers Title */}
          <p className='text-gray-500'>
            Learn more about our teams and job openings. {/* Info about job openings */}
          </p>
          {/* Button to explore job openings */}
          <button 
            className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500' 
            aria-label="Explore job openings" 
          >
            Explore Jobs
          </button>
        </div>
      </div>

      {/* Newsletter Subscription Section */}
      <NewsletterBox /> {/* Render newsletter subscription box */}
    </div>
  );
};

export default Contact;
