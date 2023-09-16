import React from 'react';

const StackedCards = () => {
  return (
    <div className="stacked-cards-container">
      <div className="stacked-card">
        <img src="card1.jpg" alt="Card 1" />
        <h2>Card 1 Title</h2>
        <p>Card 1 Content</p>
      </div>
      <div className="stacked-card">
        <img src="card2.jpg" alt="Card 2" />
        <h2>Card 2 Title</h2>
        <p>Card 2 Content</p>
      </div>
      <div className="stacked-card">
        <img src="card3.jpg" alt="Card 3" />
        <h2>Card 3 Title</h2>
        <p>Card 3 Content</p>
      </div>
      <div className="stacked-card">
        <img src="card4.jpg" alt="Card 4" />
        <h2>Card 4 Title</h2>
        <p>Card 4 Content</p>
      </div>
    </div>
  );
};

export default StackedCards;
