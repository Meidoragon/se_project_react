import { useState, useEffect } from 'react';
import './App.css';
import '../../vendor/normalize.css';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';
import { defaultClothingItems, defaultAPIInfo, radioOptions } from '../../utils/constants';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import ItemModal from '../ItemModal/ItemModal.js';
import { callWeatherAPI, parseResponse, parseWeatherCode } from '../../utils/WeatherAPI.js';

export default function App() {
  const userName = `The "Zero Degree Longitude Club" President`; 
  const [isDay, setIsDay] = useState('true'); 
  const [activeModal, setActiveModal] = useState('');
  const [selectedCard, setSelectedCard] = useState({});
  const [temperature, setTemperature] = useState(0);
  const [weather, setWeather] = useState('clear');
  const [location, setLocation] = useState('');
  
  function openGarmentForm() {
    setActiveModal('create');
  }

  function handleOverlay(evt) {
    if (evt.target !== evt.currentTarget) {
      return;
    }
    closePopup()
  }

  function submitGarmentForm(evt) {
    evt.preventDefault();
    closePopup();
  }

  function openCardPopup(item){
    setSelectedCard(item)
    setActiveModal('preview');
  }

  function closePopup () {
    setActiveModal('');
    setSelectedCard({}); 
  }

  useEffect(() => {
    callWeatherAPI(defaultAPIInfo).then((item) => {
      return parseResponse(item);
    }).then((data) => {
      setTemperature(data.temperature);
      setWeather(parseWeatherCode(data.weatherCode));
      setLocation(data.location)
      setIsDay(data.dateTime >= data.sunrise && data.dateTime <= data.sunset ? true : false)
    }).catch((res) => {
      console.error(`Error: ${res.status}`);
    })
  }, []);

  useEffect(() => {
    if (!activeModal) return;
    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        closePopup()
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal])

  return (
    <div className='page'>
      <Header locationName={location} userName={userName} openGarmentForm={openGarmentForm}/>
      <Main clothingItems={defaultClothingItems}
        temperature={temperature}
        time={isDay ? 'day' : 'night'}
        weather={weather}
        onCardSelection={openCardPopup}/>
      <Footer />
      {activeModal === 'create' && (
      <ModalWithForm title='New garment' name="new-garment" buttonText='Add garment' onClose={closePopup} onOverlayClick={handleOverlay} onSubmit={submitGarmentForm}>
        <label className='form-modal__input-label'>
          Name
          <input className='form-modal__input' type='text' name='name' minLength='1' maxLength='30' placeholder='Name'/>
        </label>
        <label className='form-modal__input-label'>
          Image
          <input className="form-modal__input" type='url' id='formInputLink' name='link' minLength='1' placeholder='Image URL'/>
        </label>
        <fieldset className="form-modal__radio-buttons">
          <legend className='form-modal__radio-title'>Select the weather type:</legend>
          {radioOptions.map((choice, index) => {
          return (
            <div key={index}>
              <input 
                className='form-modal__radio-button' 
                type='radio' 
                id={choice.value} 
                value={choice.value} 
                name='weather'
              />
              <label  className='form-modal__radio-button-label' htmlFor={choice.value}>{choice.text}</label>
            </div>
          )
          })}
        </fieldset>
      </ModalWithForm>)}
      {activeModal === 'preview' && 
        <ItemModal item={selectedCard} onClose={closePopup} onOverlayClick={handleOverlay} />
      }
    </div>
  );
}
