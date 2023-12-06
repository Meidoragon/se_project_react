import './ItemModal.css';
import Modal from '../Modal/Modal.js';

export default function ItemModal({item, onClose, onOverlayClick, isHorizontal = false}) {
  
  const verticalLayout = (
    <Modal modalType='item' onOverlayClick={onOverlayClick} onClose={onClose}>
      <img className='item-modal__image' src={item.link} alt={item.name}></img>
      <p className='item-modal__text'>{item.name}</p>
      <p className='item-modal__text'>Weather: {item.weather}</p>
    </Modal>
  )
 
  const horizontalLayout = (
    <Modal modalType='item' onOverlayClick={onOverlayClick} modifier='is-horizontal' onClose={onClose}>
      <div className='item-modal__horizontal-image-container'>
        <img className='item-modal__image image_is-horizontal' src={item.link} alt={item.name} />
        <p className='item-modal__text text_image-overlay'>{item.name}</p>
      </div> 
      <p className='item-modal__text'>Weather: {item.weather}</p>
    </Modal>
  )

  return isHorizontal ? horizontalLayout : verticalLayout;
}