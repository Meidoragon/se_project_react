import React from 'react';
import ItemCard from '../ItemCard/ItemCard.js';
import './Body.css';

export default function Body(props){
  return (
    <div className='body'>
      {weatherCard(props.time, props.weather, props.temperature)}
        <p className='body__forecast'>Today is {props.temperature}° F / You may want to wear:</p>
      {createClothingCards(props.items)}
    </div>
  )
}

function weatherCard(time, weather, temperature){
    return (
        <div className='body__weather-card'>
            <p className='body__weather-card-temperature'>{temperature}° F</p>
        </div>
    )
}

function createClothingCards(itemList){
  return(
    <ul className='body__clothing-cards'>
      {itemList.map(card => {
        return (
          <li key={card._id} className='body__clothing-card'>
            <ItemCard _id={card._id} name={card.name} weather={card.weather} link={card.link}/>
          </li>)
      })}      
    </ul>
  )
}