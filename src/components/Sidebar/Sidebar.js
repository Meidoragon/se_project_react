import './Sidebar.css';

export default function Sidebar({ userName, avatar }) {
  return (
    <div className='sidebar'>
      <div className='sidebar__user-info'>
        <img className='sidebar__user-avatar' alt='user avatar' src={avatar} />
        <div className='sidebar__user-name'>{userName}</div>
      </div>
    </div>
  )
}
