import { useForm } from '../../hooks/useForm.js'
import ModalWithForm from '../ModalWithForm/ModalWithForm.js';

export default function LoginModal({ isLoading, onSubmit, onOverlayClick, onClose, setActiveModal }) {
  const { values, handleChange } = useForm({ 'email': '', 'password': '' });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(values);
  }

  const alternateButton = {
    text: 'Sign Up',
    onClick: () => {
      setActiveModal('register');
    },
  }

  return (
    <ModalWithForm
      title='Login'
      name='login'
      buttonText='Log In'
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
    </ModalWithForm >
  )
}
