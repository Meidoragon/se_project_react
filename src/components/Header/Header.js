import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import headerLogo from'../../images/logo.svg';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

export default function Header({locationName, userName, avatar, openGarmentForm, openProfile, returnHome}){
  const currentDate = new Date().toLocaleString('default', {month: 'long', day: 'numeric'});
  return (
    <header className='header'>
      <div className='header__container'>
        <NavLink exact to="/" className='header__nav-item'>
          <img className='header__logo' onClick={returnHome} src={headerLogo} alt='logo'/>
        </NavLink>
        <p className='header__date'>{currentDate}, {locationName}</p>
      </div>
      <div className='header__container'>
        <ToggleSwitch />
        <button className='header__button add-clothes-button' type='text' onClick={openGarmentForm}>+Add clothes</button>
        <NavLink to='/profile' className='header__nav-item header__user-info'>
          <p className='header__username' onClick={openProfile}>{userName}</p>
          <img className='header__avatar' src={avatar} onClick={openProfile} alt='user avatar'/>
        </NavLink>
      </div>
    </header>
  ) 
}
