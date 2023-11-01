import React from 'react';
import ItemCard from '../ItemCard/ItemCard.js';
import './Body.css';

export default function Body({time, weather, temperature, items, onCardSelection}){
  return (
    <div className='body'>
      {weatherCard(time, weather, temperature)}
        <p className='body__forecast'>Today is {temperature}° F / You may want to wear:</p>
      {createClothingCards(items, onCardSelection)}
    </div>
  )
}

function weatherCard(time, weather, temperature){
  // console.log(`${time}_${weather}`)
    return (
        <div className={`body__weather-card ${time}_${weather}`} >
            <p className='body__weather-card-temperature'>{temperature}° F</p>
        </div>
    )
}

function createClothingCards(itemList, onCardSelection){
  return(
    <ul className='body__clothing-cards'>
      {itemList.map(card => {
        return (
          <li key={card._id} className='body__clothing-card'>
            <ItemCard card={card} onCardSelection={onCardSelection} />
          </li>)
      })}      
    </ul>
  )
}