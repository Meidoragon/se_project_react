//https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}

import { weatherKey } from "./api_keys.js";

function getWeatherApiUrl(latitude, longitude, unitsType) {
  return `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unitsType}&appid=${weatherKey}`
}

export function callWeatherAPI({latitude = 51.48, longitude = 0, unitsType = 'imperial'}){
  const URL = getWeatherApiUrl(latitude, longitude, unitsType);
  const weatherAPI = fetch(URL).then((response) => {
    if (response.ok){
      return response.json();
    } else {
      return Promise.reject(`Error: ${response.status}`)
    }
  });
  return weatherAPI
}

export function parseResponse(info){
  // console.log(info);
  const parsedData = {}
  parsedData.temperature = Math.round(info.main.temp);
  parsedData.weatherCode = parseWeatherArray(info.weather);
  // console.log(parsedData);
  return parsedData
}

function parseWeatherArray(weathers){
  // const parsedWeather = [];
  // weathers.forEach((weather) => {
  //   parsedWeather.push(weather.id)
  // });
  //TODO:
  //first entry of weather array is 'primary'
  //consider looking into reading into the additional ids.
  return weathers[0].id
}
