import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [userName, setUserName] = React.useState('');
  const [userAbout, setUserAbout] = React.useState('');

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleUserAboutChange = (e) => {
    setUserAbout(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    props.handleUpdateUser({
      name: userName,
      about: userAbout
    });
  }

  React.useEffect(() => {
    if (currentUser) {
      setUserName(currentUser.name);
      setUserAbout(currentUser.about);
    }
  }, [currentUser]);

  return (
    <PopupWithForm
      formName="edit-profile"
      title="Edit Profile"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__info">
        <div className="popup__label">
          <input
            id="profile-name"
            type="text"
            name="name"
            className="popup__field popup__field_type_name"
            placeholder="Name"
            defaultValue={userName}
            required
            minLength="2"
            maxLength="40"
            onChange={handleUserNameChange}
          />
          <span id="profile-name-error" className="popup__error" />
        </div>
        <div className="popup__label">
          <input
            id="profile-title"
            type="text"
            name="title"
            className="popup__field popup__field_type_title"
            placeholder="About"
            defaultValue={userAbout}
            required
            minLength="2"
            maxLength="200"
            onChange={handleUserAboutChange}
          />
          <span id="profile-title-error" className="popup__error" />
        </div>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
