import './ModalWithForm.css';
import Modal from '../Modal/Modal.js';

export default function ModalWithForm({children, name, title, onClose, onOverlayClick, onSubmit, submitButtonText = 'Submit'}) {
  return (
    <Modal modalType='form' onOverlayClick={onOverlayClick} onClose={onClose} additionalClasses={name}>
      <h3 className='form-modal__title'>{title}</h3>
      <form onSubmit={onSubmit}>
        {children}
        <button className="form-modal__submit-button" type="submit">{submitButtonText}</button>
      </form>
    </Modal>
  )
}
