import './ModalWithForm.css';

export default function ModalWithForm({children, name, title, onClose, onSubmit, buttonText = "Submit"}) {
  console.log(onSubmit);
  return (
    <div className={`modal modal_opened modal_type_${name}`}>
      <div className="modal__content">
        <button className='modal__close-button' type="button" onClick={onClose} />
        <h3>{title}</h3>
        <form onSubmit={onSubmit}>
          {children}
          <button type="submit">{buttonText}</button>
        </form>
      </div>
    </div>

  )
}
