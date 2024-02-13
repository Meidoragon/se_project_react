import { useForm } from '../../hooks/useForm.js'
import ModalWithForm from '../ModalWithForm/ModalWithForm.js';
// TODO: set profile modal submit button to be inactive until at least one of the fields is valid and none are invalid
export default function EditProfileModal({ isLoading, onSubmit, onOverlayClick, onClose }) {
  const { values, handleChange } = useForm({ 'name': '', 'link': '' });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(values);
  }

  return (
    <ModalWithForm
      title='Change profile data'
      name='edit-profile'
      buttonText='Save changes'
      isLoading={isLoading}
      onClose={onClose}
      onOverlayClick={onOverlayClick}
      onSubmit={handleSubmit}
    >
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
        Avatar
        <input
          className="form-modal__input"
          type='url'
          id='formInputLink'
          name='link'
          value={values.link}
          minLength='1'
          placeholder='Avatar URL'
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  )
}

