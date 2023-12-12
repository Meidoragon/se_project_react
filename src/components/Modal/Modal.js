import './Modal.css';

//TODO: Use react context for onOverlayClick and onClose?
export default function Modal({children, modalType, modifier, additionalClasses ,onOverlayClick, onClose}){
  
  const standardModal = (
    <div className={`modal ${modalType}-modal ${additionalClasses}`} onClick={onOverlayClick}>
      <div className={`modal__content ${modalType}-modal__content`}>
        <button className={`modal__close-button ${modalType}-modal__close-button`} type='button' onClick={onClose} />
        {children}
      </div>
    </div>
  );
  
  const modifiedModal = (
    <div className={`modal ${modalType}-modal ${modalType}-modal_${modifier} ${additionalClasses}`} onClick={onOverlayClick}>
      <div className={`modal__content modal__content_${modifier} ${modalType}-modal__content ${modalType}-modal__content_${modifier}`}>
        <button className={`modal__close-button ${modalType}-modal__close-button ${modalType}-modal__close-button_${modifier}`} type='button' onClick={onClose} />
        {children}
      </div>
    </div>
  );

  return modifier ? modifiedModal : standardModal;
}