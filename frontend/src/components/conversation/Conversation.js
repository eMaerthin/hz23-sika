import React from 'react';
import './conversation.css'

function Conversation({ title, content }) {
  return (
    <div className="">
      <h1 className="document-title">{title}</h1>
      <div className="document-content">{content}</div>
    </div>
  );
}

export default Conversation;