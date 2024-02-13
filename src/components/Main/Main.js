// import React from 'react';
import { useMemo, useContext } from 'react';
import WeatherCard from '../WeatherCard/WeatherCard.js';
import { CurrentTempUnitContext } from '../../contexts/CurrentTemperatureUnitContext.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import './Main.css';

export default function Main({ time, weather, temperature, clothingItems, createCards }) {
  const { isTempUnitC } = useContext(CurrentTempUnitContext);
  const { user: currentUser } = useContext(CurrentUserContext);
  const weatherType = useMemo(() => {
    if (temperature.farenheit > 85) {
      return 'hot';
    } else if (temperature.farenheit < 66) {
      return 'cold';
    } else {
      return 'warm';
    }
  }, [temperature.farenheit])

  const filteredClothingItems = clothingItems.filter((item) => {
    const showItem = item.weather.toLowerCase() === weatherType
    return showItem;
  })

  return (
    <main className='main'>
      <WeatherCard time={time} weather={weather} temperature={temperature} />
      <p className='main__forecast'>Today is {
        isTempUnitC
          ? `${temperature.celsius}° C`
          : `${temperature.farenheit}° F`
      } / You may want to wear:</p>
      {createCards(filteredClothingItems, 'main')}
      {/* {createClothingCards(filteredClothingItems, onCardSelection)} */}
    </main>
  )
}
