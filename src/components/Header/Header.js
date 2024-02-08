import React from 'react';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import './Header.css';
import headerLogo from '../../images/logo.svg';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Header({ locationName, openGarmentForm, authFunctions }) {
  const { openSignUpForm, openLogInForm } = authFunctions;
  const { isLoggedIn, user } = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });
  return (
    <header className='header'>
      <div className='header__container'>
        <NavLink exact to="/" className='header__nav-item'>
          <img className='header__logo' src={headerLogo} alt='logo' />
        </NavLink>
        <p className='header__date'>{currentDate}, {locationName}</p>
      </div>
      <div className='header__container'>
        <ToggleSwitch />
        {
          isLoggedIn ?
            <>
              <button className='header__button add-clothes-button' type='text' onClick={openGarmentForm}>+Add clothes</button>
              <NavLink to='/profile' className='header__nav-item header__user-info'>
                <p className='header__username'>{user.name}</p>
                <img className='header__avatar' src={user.avatar} alt='user avatar' />
              </NavLink>
            </> :
            <>
              <button className='header__button' onClick={openSignUpForm} type='button'>Sign up</button>
              <button className='header__button' onClick={openLogInForm} type='button'>Log In</button>
            </>
        }
      </div>
    </header>
  )
}
