import './ItemModal.css';
import { useState, useEffect } from 'react';
import Modal from '../Modal/Modal.js';

export default function ItemModal({item, isLoading, onClose, onDelete, onOverlayClick, isHorizontal = false}) {
  const [deleteIsActive, setButtonState] = useState('true');
  useEffect(() => {
    setButtonState(!isLoading);
  }, [isLoading])

  const verticalLayout = (
    <Modal modalType='item' onOverlayClick={onOverlayClick} onClose={onClose}>
      <img className='item-modal__image' src={item.link} alt={item.name}></img>
      <div className='item-modal__container'>
        <div>
          <p className='item-modal__text'>{item.name}</p>
          <p className='item-modal__text'>Weather: {item.weather}</p>
        </div>
        <button 
          type='button' 
          onClick={deleteIsActive ? onDelete : () => {}} 
          className={`item-modal__delete-button button${!deleteIsActive ? ' delete-inactive' : ''}`}>
            {isLoading ? 
            'Deleting...' : 
            'Delete Card'}
        </button>
      </div>
    </Modal>
  )
 
  const horizontalLayout = (
    <Modal modalType='item' onOverlayClick={onOverlayClick} modifier='is-horizontal' onClose={onClose}>
      <div className='item-modal__horizontal-image-container'>
        <img className='item-modal__image image_is-horizontal' src={item.link} alt={item.name} />
        <p className='item-modal__text text_image-overlay'>{item.name}</p>
      </div> 
      <div className='item-modal__horizontal-text-container'>
        <p className='item-modal__text'>Weather: {item.weather}</p>
        <button 
          type='button' 
          onClick={deleteIsActive ? onDelete : () => {}} 
          className={`item-modal__delete-button button${!deleteIsActive ? ' delete-inactive' : ''}`}>
            {isLoading ? 
            'Deleting...' : 
            'Delete Card'}
        </button>
      </div>
    </Modal>
  )

  return isHorizontal ? horizontalLayout : verticalLayout;
}