import './ModalWithForm.css';
import { useState, useEffect } from 'react';
import Modal from '../Modal/Modal.js';

export default function ModalWithForm({children, name, title, onClose, onOverlayClick, onSubmit, isLoading}) {
  const [buttonIsActive, setButtonState] = useState(true);
  useEffect(() => {
    setButtonState(!isLoading)
  }, [isLoading])  

  return (
    <Modal modalType='form' onOverlayClick={onOverlayClick} onClose={onClose} additionalClasses={name}>
      <h3 className='form-modal__title'>{title}</h3>
      <form onSubmit={buttonIsActive ? onSubmit : (evt) => {evt.preventDefault()}}>
        {children}
        <button
          className={`form-modal__submit-button${!buttonIsActive ? ' inactive': ''}`}
          type='submit'>
            {isLoading ? 'Saving...' : 'Submit'}
        </button>
      </form>
    </Modal>
  )
}
