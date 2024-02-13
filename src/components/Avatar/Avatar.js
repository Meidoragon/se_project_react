import React from 'react';
import './Avatar.css';

export default function Avatar({ user, additionalClasses = '' }) {
  const userInitial = user.name[0].toUpperCase();
  const userAvatar = user.avatar;
  return (
    <>
      {
        user.avatar ?
          <img className={`avatar avatar__image ${additionalClasses}`} src={userAvatar} alt='user avatar' /> :
          <div className={`avatar avatar__default ${additionalClasses}`}>{userInitial}</div>
      }
    </>
  )
}
