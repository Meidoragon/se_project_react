// import React from 'react';
import { useMemo, useContext } from 'react';
import WeatherCard from '../WeatherCard/WeatherCard.js';
import { CurrentTempUnitContext } from '../../contexts/CurrentTemperatureUnitContext.js';
import { convertKelvinToCelsius, convertKelvinToFarenheit } from '../../utils/constants.js';
import './Main.css';

export default function Main({time, weather, temperature, clothingItems, createCards}){
  const {isTempUnitC} = useContext(CurrentTempUnitContext); 
  const weatherType = useMemo(() => {
    const convertedTemp = convertKelvinToFarenheit(temperature);
    if (convertedTemp > 85) {
      return 'hot';
    } else if (convertedTemp < 66) {
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
      <p className='main__forecast'>Today is {
        isTempUnitC 
        ? `${convertKelvinToCelsius(temperature)}° C`
        : `${convertKelvinToFarenheit(temperature)}° F`
      } / You may want to wear:</p>
      {createCards(filteredClothingItems, 'main')}
      {/* {createClothingCards(filteredClothingItems, onCardSelection)} */}
    </main>
  )
}
