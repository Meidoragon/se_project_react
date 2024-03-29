import "./Profile.css";
import React from 'react';
import { useContext } from "react";
import SideBar from '../Sidebar/SideBar.js';
import ClothesSection from '../ClothesSection/ClothesSection.js';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Profile({ clothingItems, openNewGarmentForm, openProfileForm, handleLogout/*, createClothingCards*/, toggleLikeStatus, openCardPopup }) {
  const { user } = useContext(CurrentUserContext);
  const filteredItems = clothingItems.filter((item) => {
    return item.owner === user._id
  });

  return (
    <div className='profile'>
      <SideBar user={user} openProfileForm={openProfileForm} handleLogout={handleLogout} />
      <ClothesSection clothingItems={filteredItems} openNewGarmentForm={openNewGarmentForm} toggleLikeStatus={toggleLikeStatus} openCardPopup={openCardPopup} />
    </div>
  )
}

