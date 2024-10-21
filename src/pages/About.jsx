import React from 'react';
import Title from '../components/Title'; 
import NewsletterBox from '../components/NewsletterBox'; 
import { assets } from '../assets/assets'; 

const About = () => {
  return (
    <div>
      {/* Title Section */}
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} /> 
      </div>

      {/* About Us Section */}
      <div className='my-10 flex flex-col md:flex-row items-center md:items-start pr-6 mr-6 gap-16'>
        {/* Image with margin for separation */}
        <img className='w-full md:max-w-[450px] mb-6 md:mb-0' src={assets.about_img} alt="About Us" />
        
        {/* Text Content */}
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>
            Urban Styles was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.
            <br />
            <br />
            Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference.
          </p>
          <b className='text-gray-800'>Our Mission</b>
          <p>
            Our mission at Urban Styles is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} /> {/* Section title for reasons to choose the service */}
      </div>
      
      {/* Features Section */}
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        {/* Feature 1 */}
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>We ensure that every product meets our high standards of quality. Your satisfaction is our priority.</p>
        </div>

        {/* Feature 2 */}
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>Shop from anywhere at any time, and enjoy a hassle-free online shopping experience.</p>
        </div>

        {/* Feature 3 */}
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Our customer service team is always ready to assist you with any queries or concerns.</p>
        </div>
      </div>

      {/* Newsletter Section */}
      <NewsletterBox /> {/* Component for newsletter subscription */}
    </div>
  );
}

export default About;
