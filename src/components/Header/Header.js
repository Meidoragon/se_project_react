import React from 'react';
import './Header.css';

export default function Header({locationName, userName, openGarmentForm}){
  const currentTime = new Date().toLocaleString('default', {month: 'long', day: 'numeric'});
  return (
    <div className='header'>
      <div className='header__container'>
        <img className='header__logo' src='/images/logo.svg' alt='logo'/>
        <p className='header__date'>{currentTime}, {locationName}</p>
      </div>
      <div className='header__container'>
        <button className='header__button add-clothes-button' type='text' onClick={openGarmentForm}>+Add clothes</button>
        <p className='header__username'>{userName}</p>
        <div className='header__avatar'></div>
      </div>
    </div>
  ) 
}
