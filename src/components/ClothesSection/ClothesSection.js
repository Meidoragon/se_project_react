import './ClothesSection.css';

export default function ClothesSection({clothingItems, createClothingCards, openNewGarmentForm}) {
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