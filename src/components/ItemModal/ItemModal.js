export default function ItemModal({item, onClose}) {
  console.log(item);
  return (
    <div className={`modal modal_opened`}>
      <div className='modal__content'>
      <button className='modal__close-button' type="button" onClick={onClose} />
        <img src={item.link} alt={item.name}></img>
        <div>{item.name}</div>
        <div>Weather type: {item.weather}</div>
      </div>
    </div>
  )
}