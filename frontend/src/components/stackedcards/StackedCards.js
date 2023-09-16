import React from 'react';
import "./stackedcards.css"

const StackedCards = () => {
  return (
    <div className="four-part-stacked-cards">
      <div className="row">
        <div className="card">
          <h2>Card 1</h2>
          <p>Card 1 content</p>
        </div>
        <div className="card">
          <h2>Card 2</h2>
          <p>Card 2 content</p>
        </div>
      </div>
      <div className="row">
        <div className="card">
          <h2>Card 3</h2>
          <p>Card 3 content</p>
        </div>
        <div className="card">
          <h2>Card 4</h2>
          <p>Card 4 content</p>
        </div>
      </div>
    </div>
  );
};

export default StackedCards;
