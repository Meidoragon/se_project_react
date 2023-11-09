// import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import '../../vendor/normalize.css';
import Header from '../Header/Header.js';
import Body from '../Body/Body.js';
import Footer from '../Footer/Footer.js';
import { defaultClothingItems, defaultAPIInfo } from '../../utils/constants';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import ItemModal from '../ItemModal/ItemModal.js';
import { callWeatherAPI, parseResponse } from '../../utils/WeatherAPI.js';

export default function App() {
  const userName = `The "Zero Degree Longitude Club" President`;
  const location = "Greenwich, UK";
  const time = "day";
  // const weather = "cloudy";
  const [activeModal, setActiveModal] = useState('');
  const [selectedCard, setSelectedCard] = useState({});
  const [temperature, setTemperature] = useState(0);
  const [weather, setWeather] = useState('clear');
  function openGarmentForm() {
    setActiveModal('create');
  }

  function closeGarmentForm() {
    setActiveModal('');
  }

  function submitGarmentForm(evt) {
    evt.preventDefault();
    setActiveModal('');
  }

  function openCardPopup(item){
    setSelectedCard(item)
    setActiveModal('preview');
  }
  function closeCardPopup(){
    setActiveModal('');
    setSelectedCard({});
  }

  useEffect(() => {
    /*const weatherInfo =*/ callWeatherAPI(defaultAPIInfo).then((item) => {
      return parseResponse(item);
    }).then((data) => {
      console.log(data);
      setTemperature(data.temperature);
      console.log(data.weatherCode);
      setWeather(parseWeatherCode(data.weatherCode));
    })
  });

  return (
    <div className='page'>
      <Header locationName={location} userName={userName} openGarmentForm={openGarmentForm}/>
      <Body clothingItems={defaultClothingItems}
        temperature={temperature}
        time={time}
        weather={weather}
        onCardSelection={openCardPopup}/>
      <Footer />
      {activeModal === 'create' && (
      <ModalWithForm title='New garment' name="new-garment" buttonText='Add garment' onClose={closeGarmentForm} onSubmit={submitGarmentForm}>
        <label >
          <p className='form-modal__input-label'>Name</p>
          <input className='form-modal__input' type='text' name='name' minLength='1' maxLength='30' placeholder='Name'/>
        </label>
        <label>
          <p className='form-modal__input-label'>Image</p>
          <input className="form-modal__input" type='url' id='formInputLink' name='link' minLength='1' placeholder='Image URL'/>
        </label>
        <fieldset className="form-modal__radio-buttons">
          <legend className='form-modal__radio-title'>Select the weather type:</legend>
          <div className="form-modal__radio-button-group">
            <input 
              className='form-modal__radio-button' 
              type='radio' 
              id='hot' 
              value='hot' 
              name='weather' 
              defaultChecked/>
            <label 
              className='form-modal__radio-button-label' 
              for='hot'
            >Hot</label>
          </div>
          <div className="form-modal__radio-button-group">
            <input 
              className='form-modal__radio-button' 
              type='radio' 
              id='warm' 
              value='warm' 
              name='weather'/>
            <label 
              className='form-modal__radio-button-label' 
              for='warm'
            >Warm</label>
          </div>
          <div className="form-modal__radio-button-group">
            <input 
              className='form-modal__radio-button' 
              type='radio' 
              id='cold' 
              value='cold' 
              name='weather'/>
            <label 
              className='form-modal__radio-button-label' 
              for='cold'
            >Cold</label>
          </div>
        </fieldset>
      </ModalWithForm>)}
      {activeModal === 'preview' && 
        <ItemModal item={selectedCard} onClose={closeCardPopup} />
      }
    </div>
  );
}



function parseWeatherCode(code){
  const splitStringifiedCode = String(code).split(''); 
  if (splitStringifiedCode.length !== 3) {
    console.log(splitStringifiedCode.length)
    console.info (`Unexpected weather code: ${code}`)
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

