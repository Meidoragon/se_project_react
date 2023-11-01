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
      <ModalWithForm title='New garment' name="testName" onClose={closeGarmentForm} onSubmit={submitGarmentForm}>
        <label>
          Name<input type='text' name='name' minLength='1' maxLength='30' />
        </label>
        <label>
          Image<input type='url' name='link' minLength='1' />
        </label>
        <p>Select weather type</p>
        <div>
          <div>
            <input type='radio' id='hot' value='hot' />
            <label>Hot</label>
          </div>
          <div>
            <input type='radio' id='warm' value='warm' />
            <label>Warm</label>
          </div>
          <div>
            <input type='radio' id='cold' value='cold' />
            <label>Cold</label>
          </div>
        </div>
      </ModalWithForm>)}
      {activeModal === 'preview' && 
        <ItemModal item={selectedCard} onClose={closeCardPopup} />
      }
    </div>
  );
}
