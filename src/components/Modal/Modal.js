import './Modal.css';

export default function Modal({children, modalType, modifier, onOverlayClick, onClose}){
  
  const standardModal = (
    <div className={`modal ${modalType}-modal`} onClick={onOverlayClick}>
      <div className={`modal__content ${modalType}-modal__content`}>
        <button className={`modal__close-button ${modalType}-modal__close-button`} type='button' onClick={onClose} />
        {children}
      </div>
    </div>
  );
  
  const modifiedModal = (
    <div className={`modal ${modalType}-modal ${modalType}-modal_${modifier}`} onClick={onOverlayClick}>
      <div className={`modal__content ${modalType}-modal__content ${modalType}-modal__content_${modifier}`}>
        <button className={`modal__close-button ${modalType}-modal__close-button ${modalType}-modal__close-button_${modifier}`} type='button' onClick={onClose} />
        {children}
      </div>
    </div>
  );

  return modifier ? standardModal : modifiedModal;
}