import './ModalWithForm.css';
import { useState, useEffect } from 'react';
import Modal from '../Modal/Modal.js';

export default function ModalWithForm(props) {
  // kind of surprised this just werks(tm)
  const {
    children,
    name,
    title,
    onClose,
    onOverlayClick,
    onSubmit,
    isLoading,
    // strongly-typed language devs reeling from this one.
    alternateButton = false,
    buttonText = 'Submit'
  } = props;

  const [buttonIsActive, setButtonState] = useState(true);
  useEffect(() => {
    setButtonState(!isLoading)
  }, [isLoading])

  return (
    <Modal
      modalType='form'
      onOverlayClick={onOverlayClick}
      onClose={onClose}
      additionalClasses={name}
    >
      <h3 className='form-modal__title'>{title}</h3>
      <form onSubmit={buttonIsActive ? onSubmit : (evt) => { evt.preventDefault() }}>
        {children}
        <div className='form-modal__button-container'>
          <button
            className={`form-modal__submit-button${!buttonIsActive ? ' inactive' : ''}`}
            type='submit'>
            {isLoading ? 'Saving...' : buttonText}
          </button>
          {
            alternateButton &&
            <>
              <p className='form-modal__alternate-button-separator'>or</p>
              <button
                className={`form-modal__alternate-button`}
                type='button'
                onClick={alternateButton.onClick}
              >{alternateButton.text}</button>
            </>
          }
        </div>
      </form>
    </Modal>
  )
}
