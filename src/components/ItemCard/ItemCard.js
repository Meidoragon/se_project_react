import React from 'react';
import './ItemCard.css';

export default function ItemCard(props){
    return (
    <div className='item-card'>
      <div className='item-card__name-frame'>
        <p className='item-card__name'>{props.name}</p>
      </div>
      <img src={props.link} className='item-card__image' alt={props.name}/>  
    </div>
  )
}