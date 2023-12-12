//import './AddItemModal.css';
import { useForm } from '../../hooks/useForm.js'
import ModalWithForm from '../ModalWithForm/ModalWithForm.js';
import { radioOptions } from '../../utils/constants.js';

export default function AddItemModal({isLoading, onSubmit, onOverlayClick, onClose}){
  const {values, handleChange/*, setValues*/} = useForm({'name': '', 'link': '', 'weather': 'hot'});

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(values);
  }

  return(
    (
      <ModalWithForm 
        title='New garment' 
        name='new-garment' 
        buttonText='Add garment'
        isLoading={isLoading}
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
            value={values.name} 
            minLength='1' 
            maxLength='30' 
            placeholder='Name'
            onChange={handleChange}
          />
        </label>
        <label className='form-modal__input-label'>
          Image
          <input 
            className="form-modal__input" 
            // type='url' 
            id='formInputLink' 
            name='link' 
            value={values.link}
            minLength='1' 
            placeholder='Image URL'
            onChange={handleChange}
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
                checked={values.weather===choice.value}
                name='weather'
                onChange={handleChange}
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