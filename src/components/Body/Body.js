// import React from 'react';
import { useMemo } from 'react';
import ItemCard from '../ItemCard/ItemCard.js';
import WeatherCard from '../WeatherCard/WeatherCard.js';
import './Body.css';

export default function Body({time, weather, temperature, clothingItems, onCardSelection}){

  const weatherType = useMemo(() => {
    if (temperature > 85) {
      return 'hot';
    } else if (temperature < 66) {
      return 'cold';
    } else {
      return 'warm';
    }
  }, [temperature])

  const filteredClothingItems = clothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  })

  return (
    <div className='body'>
      <WeatherCard time={time}  weather={weather} temperature={temperature}/>
      <p className='body__forecast'>Today is {temperature}° F / You may want to wear:</p>
      {createClothingCards(filteredClothingItems, onCardSelection)}
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