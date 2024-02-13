import './Sidebar.css';
import Avatar from '../Avatar/Avatar';

export default function SideBar({ user, openProfileForm, handleLogout }) {
  return (
    <div className='sidebar'>
      <div className='sidebar__user-info'>
        <Avatar user={user} />
        <div className='sidebar__user-name'>{user.name}</div>
      </div>
      <button type='button' onClick={openProfileForm} className='sidebar__button'>Change profile data</button>
      <button type='button' onClick={handleLogout} className='sidebar__button'>Log out</button>
    </div>
  )
}
