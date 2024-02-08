import './Sidebar.css';
import Avatar from '../Avatar/Avatar';

export default function Sidebar({ user, userName, avatar }) {
  return (
    <div className='sidebar'>
      <div className='sidebar__user-info'>
        <Avatar user={user} />
        <div className='sidebar__user-name'>{user.name}</div>
      </div>
    </div>
  )
}
