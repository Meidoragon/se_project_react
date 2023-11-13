import './ItemModal.css';

export default function ItemModal({item, onClick, isHorizontal = false}) {
  const verticalLayout = (
    <div onClick={onClick} className='image-modal'>
      <div className='image-modal__content'>
      <button className='image-modal__close-button' type="button" onClick={onClick} />
        <img className='image-modal__image' src={item.link} alt={item.name}></img>
        <p className='image-modal__text'>{item.name}</p>
        <p className='image-modal__text'>Weather: {item.weather}</p>
      </div>
    </div>
  )
  const horizontalLayout = (
    <div onClick={onClick} className='image-modal'>
      <div className='image-modal__content content_is-horizontal'>
        <button className='image-modal__close-button close-button_is-horizontal' type='button' onClick={onClick} />
        <div className='image-modal__horizontal-image-container'>
          <img className='image-modal__image image_is-horizontal' src={item.link} alt={item.name} />
          <p className='image-modal__text text_image-overlay'>{item.name}</p>
        </div> 
        <p className='image-modal__text'>Weather: {item.weather}</p>
      </div>
    </div>
  )
  return isHorizontal ? horizontalLayout : verticalLayout;
  
}