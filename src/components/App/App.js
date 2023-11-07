import React from 'react';
// import { useState } from 'react';
import './App.css';
import '../../vendor/normalize.css';
import Header from '../Header/Header.js';
import Body from '../Body/Body.js';
import Footer from '../Footer/Footer.js';
import { defaultClothingItems } from '../../utils/constants';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import ItemModal from '../ItemModal/ItemModal.js';

export default function App() {
  const userName = "(V);,,;(V)";
  const location = "Bedlam";
  const temperature = "HECKINGHOT";
  const time = "day";
  const weather = "cloudy";
  const [activeModal, setActiveModal] = React.useState('');
  const [selectedCard, setSelectedCard] = React.useState({});

  function openGarmentForm() {
    setActiveModal('create');
    console.log("garment form open!")
  }

  function closeGarmentForm() {
    setActiveModal('');
    console.log("modal close!");
  }

  function submitGarmentForm(evt) {
    evt.preventDefault();
    console.log('garment form submit!')
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

  return (
    <div className='page'>
      <Header locationName={location} userName={userName} openGarmentForm={openGarmentForm}/>
      <Body items={defaultClothingItems}
        temperature={temperature}
        time={time}
        weather={weather}
        onCardSelection={openCardPopup}/>
      <Footer />
      {activeModal === 'create' && (
      <ModalWithForm title='New garment' name="testName" buttonText='Add garment' onClose={closeGarmentForm} onSubmit={submitGarmentForm}>
        <label >
          <p className='modal__input-label'>Name</p>
          <input className='modal__input' type='text' name='name' minLength='1' maxLength='30' placeholder='Name'/>
        </label>
        <label>
          <p className='modal__input-label'>Image</p>
          <input className="modal__input" type='url' id='formInputLink' name='link' minLength='1' placeholder='Image URL'/>
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className='modal__radio-title'>Select the weather type:</legend>
          <div className="modal__radio-button-group">
            <input 
              className='modal__radio-button' 
              type='radio' 
              id='hot' 
              value='hot' 
              name='weather' defaultChecked/>
            <label 
              className='modal__radio-button-label' 
              for='hot'
            >Hot</label>
          </div>
          <div className="modal__radio-button-group">
            <input className='modal__radio-button' type='radio' id='warm' value='warm' name='weather'/>
            <label className='modal__radio-button-label' for='warm'>Warm</label>
          </div>
          <div className="modal__radio-button-group">
            <input className='modal__radio-button' type='radio' id='cold' value='cold' name='weather'/>
            <label className='modal__radio-button-label' for='cold'>Cold</label>
          </div>
        </fieldset>
      </ModalWithForm>)}
      {activeModal === 'preview' && 
        <ItemModal item={selectedCard} onClose={closeCardPopup} />
      }
    </div>
  );
}
