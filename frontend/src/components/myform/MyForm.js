import React, { useState } from 'react';
import axios from 'axios';

const MyForm = () => {
  const [formData, setFormData] = useState({
    // Initialize your form fields here
    prompt: '',
    answer: '',
    // Add other form fields as needed
  });

  const handleChange = (e) => {
    const { prompt, value } = e.target;
    setFormData({
      ...formData,
      [prompt]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('YOUR_API_ENDPOINT', formData);
      console.log('API Response:', response.data);
      // Handle the API response here
    } catch (error) {
      console.error('API Error:', error);
      // Handle any API errors here
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Enter your Question here</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      {/* Add other form fields here */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
