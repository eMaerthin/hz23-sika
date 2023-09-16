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
    simulateChatBotResponse(input);

    // Clear the input field
    setInput('');
  };

  const simulateChatBotResponse = (userMessage) => {
    // Simulate a response from the chat bot (replace this with your bot logic or API call)
    const botResponse = `Chat Bot: You said "${userMessage}"`;
    
    // Add the chat bot's response to the chat
    setMessages([...messages, { text: botResponse, user: false }]);
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
