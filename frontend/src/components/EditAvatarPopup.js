import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarInput = React.useRef('');

  function handleSubmit(e) {
    e.preventDefault();

    props.handleUpdateAvatar(avatarInput.current.value);
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Change profile picture"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__info">
        <div className="popup__label">
          <input
            ref={avatarInput}
            id="profile-avatar"
            type="url"
            name="avatar"
            className="popup__field popup__field_type_url"
            placeholder="Profile picture URL"
            required
          />
          <span id="profile-avatar-error" className="popup__error" />
        </div>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
