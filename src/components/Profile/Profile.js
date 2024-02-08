import "./Profile.css";
import React from 'react';
import { useContext } from "react";
import Sidebar from '../Sidebar/Sidebar.js';
import ClothesSection from '../ClothesSection/ClothesSection.js';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Profile({ clothingItems, userName, avatar, openNewGarmentForm, createClothingCards }) {
  const { user } = useContext(CurrentUserContext);
  return (
    <div className='profile'>
      <Sidebar user={user} userName={userName} avatar={avatar} />
      <ClothesSection clothingItems={clothingItems} openNewGarmentForm={openNewGarmentForm} createClothingCards={createClothingCards} />
    </div>
  )
}
