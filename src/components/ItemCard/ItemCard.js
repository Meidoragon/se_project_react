import React from 'react';
import './ItemCard.css';

export default function ItemCard({ card, onCardSelection }) {
  return (
    <div className='item-card'>
      <div className='item-card__name-frame'>
        <p className='item-card__name'>{card.name}</p>
      </div>
      <img src={card.link} className='item-card__image' alt={card.name} onClick={() => onCardSelection(card)} />
    </div>
  )
}
