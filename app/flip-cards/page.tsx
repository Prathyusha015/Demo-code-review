"use client";

import { useState, useEffect } from "react";


const cardValues = ["🍎", "🍌", "🍇", "🍓"];

export default function FlipCardsPage() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    const shuffled = [...cardValues, ...cardValues]
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({ id: index, value }));
    setCards(shuffled);
  }, []);

  const handleFlip = (id) => {
    if (flipped.includes(id) || matched.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [firstId, secondId] = newFlipped;
      if (cards[firstId].value === cards[secondId].value) {
        setMatched([...matched, firstId, secondId]);
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Memory Card Game</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 100px)",
          gap: "10px",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        {cards.map((card) => {
          const isFlipped = flipped.includes(card.id) || matched.includes(card.id);
          const isMatched = matched.includes(card.id);
          return (
            <div
              key={card.id}
              className={`card ${isFlipped ? "flipped" : ""} ${isMatched ? "matched" : ""}`}
              onClick={() => handleFlip(card.id)}
            >
              <div className="card-inner">
                <div className="card-front">❓</div>
                <div className="card-back">{card.value}</div>
              </div>
            </div>
          );
        })}
      </div>
      {matched.length === cards.length && <h3 style={{ marginTop: "20px" }}>🎉 You Won! 🎉</h3>}
    </div>
  );
}
