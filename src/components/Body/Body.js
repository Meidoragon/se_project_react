// import React from 'react';
import { useMemo } from 'react';
import ItemCard from '../ItemCard/ItemCard.js';
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
      {weatherCard(time, weather, temperature)}
        <p className='body__forecast'>Today is {temperature}° F / You may want to wear:</p>
      {createClothingCards(filteredClothingItems, onCardSelection)}
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