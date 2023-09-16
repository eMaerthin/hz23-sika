// src/components/VerticalToolbar.js
import React from 'react';
import './shortcut.css'

function Shortcut({ items, onItemClick }) {
  return (
    <div className="vertical-toolbar">
                <h1 className='logo'>Sika</h1>
      {items.map((item, index) => (
        <button
          key={index}
          className="toolbar-item"
          onClick={() => onItemClick(item)}
        >
          <h6 className='toolbar-label'>{item.label}</h6>
        </button>
      ))}
    </div>
  );
}

export default Shortcut;
