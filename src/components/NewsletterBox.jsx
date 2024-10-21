import React from 'react';

const NewsletterBox = () => {
  // Handler function to manage form submission
  const onSubmitHandler = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    // Additional logic for handling the subscription can be added here
  }

  return (
    <div className='text-center'>
      {/* Headline for subscription offer */}
      <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
      {/* Subheading providing more details about the newsletter */}
      <p className='text-gray-400 mt-3'>
        Join our newsletter to receive exclusive updates, early access to new arrivals, special offers, and style tips straight to your inbox.
      </p>
      {/* Form for email input and submission */}
      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap- mx-auto my-6 border pl-3'>
        {/* Input field for email address */}
        <input 
          className='w-full sm:flex-1 outline-none' 
          type='email' 
          placeholder='Enter your email' 
          required 
        />
        {/* Submit button for the form */}
        <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
      </form>
    </div>
  )
}

export default NewsletterBox;
