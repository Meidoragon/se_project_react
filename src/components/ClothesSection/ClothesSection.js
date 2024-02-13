import './ClothesSection.css';
import ItemCard from '../ItemCard/ItemCard';
export default function ClothesSection({ clothingItems/*, createClothingCards*/, openNewGarmentForm, toggleLikeStatus, openCardPopup }) {
  function createClothingCards(itemList, parentComponentName) {
    // const parentComponentName = 'profile';
    return (
      <ul className={`${parentComponentName}__clothing-cards`}>
        {itemList.map(card => {
          return (
            <li key={card._id} className={`${parentComponentName}__clothing-card`}>
              <ItemCard card={card} onCardSelection={openCardPopup} toggleLikeStatus={toggleLikeStatus} />
            </li>)
        })}
      </ul>
    )
  }
  return (
    <section className='clothes-section'>
      <div className='clothes-section__header'>
        <p className='clothes-section__title'>Your items</p>
        <button type='button' onClick={openNewGarmentForm} className='clothes-section__button button'>+ Add New</button>
      </div>
      {createClothingCards(clothingItems, 'clothes-section')}
    </section>
  )
}
