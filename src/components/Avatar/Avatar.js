import React from 'react';
import './Avatar.css';

export default function Avatar({ user, additionalClasses = '' }) {
  return (
    <>
      {
        user.avatar ?
          <img className={`avatar avatar__image ${additionalClasses}`} src={user.avatar} alt='user avatar' /> :
          <div className={`avatar avatar__default ${additionalClasses}`}>{user.name[0].toUpperCase()}</div>
      }
    </>
  )
}
