import React from 'react';
import './ItemCard.css';

export default function ItemCard({name, link}){
    return (
    <div className='item-card'>
      <div className='item-card__name-frame'>
        <p className='item-card__name'>{name}</p>
      </div>
      <img src={link} className='item-card__image' alt={name}/>  
    </div>
  )
}