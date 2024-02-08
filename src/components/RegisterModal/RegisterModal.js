import { useForm } from '../../hooks/useForm.js'
import ModalWithForm from '../ModalWithForm/ModalWithForm.js';

export default function RegisterModal({ isLoading, onSubmit, onOverlayClick, onClose, setActiveModal }) {
  const { values, handleChange } = useForm({ 'email': '', 'password': '', 'name': '', 'avatar': '' });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(values);
  }

  const alternateButton = {
    text: 'Log In',
    onClick: () => {
      setActiveModal('login');
    },
  }

  return (
    <ModalWithForm
      title='Sign Up'
      name='sign-up'
      buttonText='Sign Up'
      alternateButton={alternateButton}
      isLoading={isLoading}
      onClose={onClose}
      onOverlayClick={onOverlayClick}
      onSubmit={handleSubmit}
    >
      <label className='form-modal__input-label'>
        Email
        <input
          className='form-modal__input'
          type='text'
          name='email'
          value={values.email}
          minLength='1'
          maxLength='30'
          placeholder='Email'
          onChange={handleChange}
        />
      </label>
      <label className='form-modal__input-label'>
        Password
        <input
          className='form-modal__input'
          type='password'
          name='password'
          value={values.password}
          minLength='1'
          maxLength='30'
          placeholder='Password'
          onChange={handleChange}
        />
      </label>
      <label className='form-modal__input-label'>
        Name
        <input
          className='form-modal__input'
          type='text'
          name='name'
          value={values.name}
          minLength='1'
          maxLength='30'
          placeholder='Name'
          onChange={handleChange}
        />
      </label>
      <label className='form-modal__input-label'>
        Avatar URL
        <input
          className='form-modal__input'
          type='text'
          name='avatar'
          value={values.avatar}
          minLength='1'
          placeholder='Avatar URL'
          onChange={handleChange}
        />
      </label>
    </ModalWithForm >
  )
}
