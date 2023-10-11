import React from 'react';
import './Header.css';

export default function Header(props){
  const currentTime = new Date().toLocaleString('default', {month: 'long', day: 'numeric'});
  return (
    <div className='header'>
      <div className='header__container'>
        <img className='header__logo' src='/images/logo.svg' alt='logo'/>
        <p className='header__date'>{currentTime}, {props.locationName}</p>
      </div>
      <div className='header__container'>
        <button className='header__button add-clothes-button' type='text'>+Add clothes</button>
        <p className='header__username'>{props.userName}</p>
        <div className='header__avatar'></div>
      </div>
    </div>
  ) 
}
