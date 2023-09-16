// src/components/Chat.js
import React, { useState } from 'react';
import './chat.css'

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    // Add the user's message to the chat
    setMessages([...messages, { text: input, user: true }]);

    // Simulate a response from the chat bot (you can replace this with an API call)
    chatBotResponse(input);

    // Clear the input field
    setInput('');
  };

  const simulateChatBotResponse = (userMessage) => {
    // Simulate a response from the chat bot (replace this with your bot logic or API call)
    const botResponse = `Chat Bot: You said "${userMessage}"`;
    
    // Add the chat bot's response to the chat
    setMessages([...messages, { text: botResponse, user: false }]);
  };

  const chatBotResponse = (userMessage) => {
    // Get a (sync) response from the chat bot (replace this with your bot logic or API call)
    const apiUrl = 'https://0.0.0.0:5000/query'; // Replace with your chatbot API endpoint
    const postData = {
      prompt: userMessage,
    };
    console.log(postData);

    var request = require('request');
    var options = {
      'method': 'POST',
      'url': '0.0.0.0:5000/query',
      'headers': {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "prompt": userMessage
      })

    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);

      const chatbotMessage = response.body;
      const botResponse = `Chat Bot: "${chatbotMessage}"`;

      // Add the chat bot's response to the chat
      setMessages([...messages, { text: botResponse, user: false }]);
    });

  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.user ? 'user' : 'bot'}`}>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="custom-input"
        />
        <button  className="custom-button" type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
