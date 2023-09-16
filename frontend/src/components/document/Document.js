import React from 'react';
import './document.css'

function Document({ title, children }) {
  return (
    <div className=" file">
      <h1 className="document-title">{title}</h1>
      <div className="document-content">{children}</div>
    </div>
  );
}

export default Document;
