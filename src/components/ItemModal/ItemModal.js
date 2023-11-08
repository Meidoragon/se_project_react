import './ItemModal.css';

export default function ItemModal({item, onClose, isHorizontal = false}) {
  const verticalLayout = (
    <div className={`image-modal`}>
      <div className='image-modal__content'>
      <button className='image-modal__close-button' type="button" onClick={onClose} />
        <img className='image-modal__image' src={item.link} alt={item.name}></img>
        <p className='image-modal__text'>{item.name}</p>
        <p className='image-modal__text'>Weather: {item.weather}</p>
      </div>
    </div>
  )
  const horizontalLayout = (
    <div className={`image-modal`}>
      <div className='image-modal__content'>
        <p>hi.</p>
      </div>
    </div>
  )
  return isHorizontal ? horizontalLayout : verticalLayout;
  
}