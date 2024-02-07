import "./Profile.css";
import React from 'react';
import Sidebar from '../Sidebar/Sidebar.js';
import ClothesSection from '../ClothesSection/ClothesSection.js';

export default function Profile({ clothingItems, userName, avatar, openNewGarmentForm, createClothingCards }) {
  return (
    <div className='profile'>
      <Sidebar userName={userName} avatar={avatar} />
      <ClothesSection clothingItems={clothingItems} openNewGarmentForm={openNewGarmentForm} createClothingCards={createClothingCards} />
    </div>
  )
}
