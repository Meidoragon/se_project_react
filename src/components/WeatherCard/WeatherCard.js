import './WeatherCard.css';

export default function WeatherCard({time, weather, temperature}){
  return (
      <div className={`weather-card ${time}_${weather}`} >
          <p className='weather-card-temperature'>{temperature}° F</p>
      </div>
  )
}