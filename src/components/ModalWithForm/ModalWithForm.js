import './ModalWithForm.css';

export default function ModalWithForm({children, name, title, onClose, onOverlayClick, onSubmit, buttonText = "Submit"}) {
  return (
    <div onClick={onOverlayClick} className={`form-modal modal_type_${name}`}>
      <div className="form-modal__content">
        <button className='form-modal__close-button' type="button" onClick={onClose} />
        <h3 className="form-modal__title">{title}</h3>
        <form onSubmit={onSubmit}>
          {children}
          <button className="form-modal__submit-button" type="submit">{buttonText}</button>
        </form>
      </div>
    </div>

  )
}
