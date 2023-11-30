import { useContext } from "react";
import { CurrentTempUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { convertKelvinToCelsius, convertKelvinToFarenheit } from "../../utils/constants";
import './WeatherCard.css';

export default function WeatherCard({time, weather, temperature}){
  const { isTempUnitC } = useContext(CurrentTempUnitContext);
  return (
      <div className={`weather-card ${time}_${weather}`} >
          <p className='weather-card-temperature'>{isTempUnitC ? `${convertKelvinToCelsius(temperature)}° C` : `${convertKelvinToFarenheit(temperature)}° F`}</p>
      </div>
  )
}