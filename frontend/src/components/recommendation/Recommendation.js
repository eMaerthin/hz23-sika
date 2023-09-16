import React from 'react';

function Recommendation({ title, content }) {
  return (
    <div className="document">
      <h1 className="document-title">{title}</h1>
      <div className="document-content">{content}</div>
    </div>
  );
}

export default Recommendation;