import React from 'react';
import { useContext, useState } from 'react';
import './ItemCard.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import likeButton from '../../images/heart.svg';
import likeButtonActive from '../../images/fill_heart.svg';

export default function ItemCard({ card, onCardSelection, toggleLikeStatus }) {
  const checkLiked = (c) => {
    return c.likes.some((id) => id === currentUser._id);
  }

  const { user: currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const isLiked = checkLiked(card);
  const likeButtonURL = isLiked ? likeButtonActive : likeButton;


  const handleLikeClick = () => {
    toggleLikeStatus(card, isLiked)
  }

  return (
    <div className='item-card'>
      <div className='item-card__name-heart-wrapper'>
        <div className='item-card__name-frame'>
          <p className='item-card__name'>{card.name}</p>
        </div>
        {isLoggedIn ?
          <button style={{ backgroundImage: `url(${likeButtonURL})` }}
            type='button'
            className='item-card__like-button'
            onClick={handleLikeClick}
          ></button> :
          <></>
        }
      </div>
      <img src={card.link} className='item-card__image' alt={card.name} onClick={() => onCardSelection(card)} />
    </div >
  )
}
