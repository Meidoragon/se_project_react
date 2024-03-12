export const apiBaseUrl = process.env.NODE_ENV === 'production'
  ? 'https://api.meidoragon.csproject.org'
  : 'http://localhost:3001';

//let's stretch the definition of constant a bit, shall we?
export const convertKelvinToCelsius = function(temperature) {
  return temperature - 273;
}

export const convertKelvinToFarenheit = function(temperature) {
  return Math.round(temperature * 9 / 5 - 459);
}

export const defaultAPIInfo = {
  latitude: 51.25,
  longitude: 0,
}

export const radioOptions = [
  {
    text: 'Hot',
    value: 'hot',
  },
  {
    text: 'Warm',
    value: 'warm'
  },
  {
    text: 'Cold',
    value: 'cold'
  }
]

export const weatherCodeLookupTable = {
  200: 'stormy',
  201: 'stormy',
  202: 'stormy',
  210: 'stormy',
  211: 'stormy',
  212: 'stormy',
  221: 'stormy',
  230: 'stormy',
  231: 'stormy',
  232: 'stormy',
  300: 'rainy',
  301: 'rainy',
  302: 'rainy',
  310: 'rainy',
  311: 'rainy',
  312: 'rainy',
  313: 'rainy',
  314: 'rainy',
  321: 'rainy',
  500: 'rainy',
  501: 'rainy',
  502: 'rainy',
  503: 'rainy',
  504: 'rainy',
  511: 'rainy',
  520: 'rainy',
  521: 'rainy',
  522: 'rainy',
  531: 'rainy',
  600: 'snowy',
  601: 'snowy',
  602: 'snowy',
  611: 'snowy',
  612: 'snowy',
  613: 'snowy',
  615: 'snowy',
  616: 'snowy',
  620: 'snowy',
  621: 'snowy',
  622: 'snowy',
  701: 'foggy',
  711: 'foggy',
  721: 'foggy',
  731: 'foggy',
  741: 'foggy',
  751: 'foggy',
  761: 'foggy',
  762: 'foggy',
  771: 'stormy',
  781: 'stormy',
  800: 'clear',
  801: 'clear',
  802: 'clear',
  803: 'cloudy',
  804: 'cloudy'
}
