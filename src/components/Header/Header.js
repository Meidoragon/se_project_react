import React from 'react';
import './Header.css';

export default function Header(){

  return (
    <div className='header'>
      <img className='header__logo' src='/images/logo.svg' alt='logo'/>
      <p className='header__date'>3023.13.35</p>
      <button className='header__button add-clothes-button' type='button'>+Add clothes.</button>
      <p className='header__username'>Meduka the Guca</p>
      <div className='header__avatar'></div>
    
    
    </div>
  )
  
}
