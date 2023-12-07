//import './AddItemModal.css';
import { useState } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm.js';
import { radioOptions } from '../../utils/constants.js';

export default function AddItemModal({onSubmit, onOverlayClick, onClose}){
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [weather, setWeather] = useState('hot');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit({name, link, weather})
  }

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  }

  const handleLinkChange = (evt) => {
    setLink(evt.target.value);
  }

  const handleTemperatureChange = (evt) => {
    setWeather(evt.target.value);
  }

  return(
    (
      <ModalWithForm 
        title='New garment' 
        name='new-garment' 
        buttonText='Add garment' 
        onClose={onClose} 
        onOverlayClick={onOverlayClick} 
        onSubmit={handleSubmit}
        >
        <label className='form-modal__input-label'>
          Name
          <input 
            className='form-modal__input' 
            type='text' 
            name='name'
            value={name} 
            minLength='1' 
            maxLength='30' 
            placeholder='Name'
            onChange={handleNameChange}
          />
        </label>
        <label className='form-modal__input-label'>
          Image
          <input 
            className="form-modal__input" 
            // type='url' 
            id='formInputLink' 
            name='link' 
            value={link}
            minLength='1' 
            placeholder='Image URL'
            onChange={handleLinkChange}
          />
        </label>
        <fieldset className='form-modal__radio-buttons'>
          <legend className='form-modal__radio-title'>Select the weather type:</legend>
          {radioOptions.map((choice, index) => {
          return (
            <div key={index}>
              <input 
                className='form-modal__radio-button' 
                type='radio' 
                id={choice.value} 
                value={choice.value}
                checked={weather===choice.value}
                name='weather'
                onChange={handleTemperatureChange}
              />
              <label
                className='form-modal__radio-button-label' 
                htmlFor={choice.value}>
                  {choice.text}
              </label>
            </div>
          )
          })}
        </fieldset>
      </ModalWithForm>)
  )
}