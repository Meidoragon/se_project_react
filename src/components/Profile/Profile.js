import "./Profile.css";
import React from 'react';
import { useContext } from "react";
import Sidebar from '../Sidebar/Sidebar.js';
import ClothesSection from '../ClothesSection/ClothesSection.js';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Profile({ clothingItems, openNewGarmentForm, openProfileForm, handleLogout, createClothingCards }) {
  const { user } = useContext(CurrentUserContext);
  return (
    <div className='profile'>
      <Sidebar user={user} openProfileForm={openProfileForm} handleLogout={handleLogout} />
      <ClothesSection clothingItems={clothingItems} openNewGarmentForm={openNewGarmentForm} createClothingCards={createClothingCards} />
    </div>
  )
}

