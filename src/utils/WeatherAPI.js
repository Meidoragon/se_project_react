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

export function parseResponse(item){
  // console.log(info);
  const parsedData = {}
  parsedData.temperature = Math.round(item.main.temp);
  parsedData.location = item.name
  parsedData.weatherCode = parseWeatherArray(item.weather);
  parsedData.sunrise = item.sys.sunrise;
  parsedData.sunset = item.sys.sunset;
  parsedData.dateTime = item.dt;
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

export function parseWeatherCode(code){
  const splitStringifiedCode = String(code).split(''); 
  if (splitStringifiedCode.length !== 3) {
    //console.log(splitStringifiedCode.length)
    //console.info (`Unexpected weather code: ${code}`)
    return 'clear';
  }
  switch (splitStringifiedCode[0]) {
    default:
      console.info(`Unexpected weather code: ${code}`);
      return 'clear';
    case '2':
      return 'stormy';
    case '3':
    case '5':
      return 'rainy';
    case '6':
      return 'snowy';
    case '7':
      return 'foggy';
    case '8':
      switch (splitStringifiedCode[2]) {
        default:
          console.info(`Unexpected weather code: ${code}`)
          return 'clear';
        case '0':
        case '1':
        case '2':
          return 'clear';
        case '3':
        case '4':
          return 'cloudy';
      }
  }
}