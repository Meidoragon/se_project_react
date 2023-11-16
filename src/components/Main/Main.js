// import React from 'react';
import { useMemo } from 'react';
import ItemCard from '../ItemCard/ItemCard.js';
import WeatherCard from '../WeatherCard/WeatherCard.js';
import './Main.css';

export default function Main({time, weather, temperature, clothingItems, onCardSelection}){

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
    <main className='main'>
      <WeatherCard time={time}  weather={weather} temperature={temperature}/>
      <p className='main__forecast'>Today is {temperature}° F / You may want to wear:</p>
      {createClothingCards(filteredClothingItems, onCardSelection)}
    </main>
  )
}



function createClothingCards(itemList, onCardSelection){
  return(
    <ul className='main__clothing-cards'>
      {itemList.map(card => {
        return (
          <li key={card._id} className='main__clothing-card'>
            <ItemCard card={card} onCardSelection={onCardSelection} />
          </li>)
      })}      
    </ul>
  )
}