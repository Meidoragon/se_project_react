import React from 'react';
import './Header.css';
import headerLogo from'../../images/logo.svg';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

export default function Header({locationName, userName, avatar, openGarmentForm}){
  const currentTime = new Date().toLocaleString('default', {month: 'long', day: 'numeric'});
  return (
    <header className='header'>
      <div className='header__container'>
        <img className='header__logo' src={headerLogo} alt='logo'/>
        <p className='header__date'>{currentTime}, {locationName}</p>
      </div>
      <div className='header__container'>
        <ToggleSwitch />
        <button className='header__button add-clothes-button' type='text' onClick={openGarmentForm}>+Add clothes</button>
        <p className='header__username'>{userName}</p>
        <img className='header__avatar' src={avatar} alt='user avatar'/>
      </div>
    </header>
  ) 
}
