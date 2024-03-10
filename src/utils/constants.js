export const defaultClothingItems = [{
  _id: 0,
  name: "Cap",
  weather: "hot",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
},
{
  _id: 1,
  name: "Hoodie",
  weather: "warm",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
},
{
  _id: 2,
  name: "Jacket",
  weather: "cold",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
},
{
  _id: 3,
  name: "Sneakers",
  weather: "cold",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
},
{
  _id: 4,
  name: "T-Shirt",
  weather: "hot",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
},
{
  _id: 5,
  name: "Winter coat",
  weather: "cold",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
}
]

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
