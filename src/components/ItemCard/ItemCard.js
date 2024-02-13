import React from 'react';
import { useState, useContext } from 'react';
import './ItemCard.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
export default function ItemCard({ card, onCardSelection, toggleLikeStatus }) {
  const { user: currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const [isLiked, setIsLiked] = useState(card.likes.some((id) => {
    return id === currentUser._id;
  }))
  const likeButtonClassname = [
    'item-card__like-button like-button-',
    isLiked ? 'active' : 'inactive',
  ].join('');

  const handleLikeClick = () => {
    card = toggleLikeStatus(card, isLiked);
    setIsLiked(!isLiked);
  }

  return (
    <div className='item-card'>
      <div className='item-card__name-heart-wrapper'>
        <div className='item-card__name-frame'>
          <p className='item-card__name'>{card.name}</p>
        </div>
        {isLoggedIn ?
          <button type='button' className={likeButtonClassname} onClick={handleLikeClick}></button> :
          <></>
        }
      </div>
      <img src={card.link} className='item-card__image' alt={card.name} onClick={() => onCardSelection(card)} />
    </div >
  )
}
