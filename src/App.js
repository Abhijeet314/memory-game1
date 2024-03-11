import React, { useState, useEffect } from 'react';
import './App.css';

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  useEffect(() => {
    const symbols = ['🌟', '🍎', '🌺', '🍕', '🚀', '🎈'];
    const initialCards = symbols.concat(symbols).sort(() => Math.random() - 0.5);
    setCards(initialCards);
  }, []);

  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || matchedCards.includes(index)) return;

    setFlippedCards([...flippedCards, index]);

    if (flippedCards.length === 1) {
      if (cards[flippedCards[0]] === cards[index]) {
        setMatchedCards([...matchedCards, flippedCards[0], index]);
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  };

  const resetGame = () => {
    const shuffledCards = cards.slice().sort(() => Math.random() - 0.5);
    setFlippedCards([]);
    setMatchedCards([]);
    setCards(shuffledCards);
  };

  return (
    <div>
    <div className="memory-game">
      {cards.map((symbol, index) => (
        <div
          key={index}
          className={`card ${flippedCards.includes(index) || matchedCards.includes(index) ? 'flipped' : ''}`}
          onClick={() => handleCardClick(index)}
        >
          {flippedCards.includes(index) || matchedCards.includes(index) ? symbol : '❓'}
        </div>
      ))}
    </div>
    <button onClick={resetGame} className="new-game-btn">New Game</button>
    </div>
  );
};

export default MemoryGame;