import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import './WeatherCard.css';

export default function WeatherCard({ time, weather, temperature }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <div className={`weather-card ${time}_${weather}`} >
      <p className='weather-card-temperature'>{
        currentTemperatureUnit === 'celsius' ?
          `${temperature.celsius}° C` :
          `${temperature.farenheit}° F`
      }</p>
    </div>
  )
}
