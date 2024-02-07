
import { weatherKey } from "./api_keys.js";
import { weatherCodeLookupTable as weatherCodes } from "./constants.js";

function getWeatherApiUrl(latitude, longitude) {
  return `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherKey}`
}

export function callWeatherAPI({ latitude = 51.48, longitude = 0 }) {
  const URL = getWeatherApiUrl(latitude, longitude);
  const weatherAPI = fetch(URL).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Error: ${response.status}`)
    }
  });
  return weatherAPI
}

export function parseResponse(item) {
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

function parseWeatherArray(weathers) {
  //TODO:
  //first entry of weather array is 'primary'
  //consider looking into reading into the additional ids.
  return weathers[0].id
}

export function parseWeatherCode(code) {
  if (!(code in weatherCodes)) { console.info(`Unknown weather code: ${code}`) }
  return weatherCodes[code] || 'clear'; //if weather code not in table return clear
}
