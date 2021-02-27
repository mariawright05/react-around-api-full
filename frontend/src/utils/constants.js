// FORM VARIABLES
// Profile variables
const profilePopup = document.querySelector('.popup_type_edit-profile');
const editButton = document.querySelector('.profile__edit-button');
const editProfileForm = profilePopup.querySelector('.popup__form');
const nameInput = document.querySelector('.profile__user-name');
const jobInput = document.querySelector('.profile__user-about');

// Profile form variables
const profileFormNameField = document.querySelector('.popup__field_type_name');
const profileFormTitleField = document.querySelector(
  '.popup__field_type_title'
);

// Avatar variables
const avatarPopup = document.querySelector('.popup_type_edit-avatar');
const editAvatarButton = document.querySelector(
  '.profile__user-avatar_overlay'
);
const editAvatarForm = avatarPopup.querySelector('.popup__form');
const avatarInput = document.querySelector('.profile__user-avatar');

// Add card form variables
const cardPopup = document.querySelector('.popup_type_add-card');
const addButton = document.querySelector('.profile__add-button');
const addCardForm = cardPopup.querySelector('.popup__form');

// Form definitions
const defaultConfig = {
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__error',
  errorClass: 'popup__error_visible'
};

const deleteCardPopup = document.querySelector('.popup_type_delete-card');

// IMAGE CARD VARIABLES
// Image section
const imageContainer = document.querySelector('.photo-grid');
const cardTemplateSelector = '.card-template';

// Image popup
const imagePopup = document.querySelector('.popup_type_display-image');

export {
  profilePopup,
  editButton,
  editProfileForm,
  nameInput,
  jobInput,
  profileFormNameField,
  profileFormTitleField,
  avatarPopup,
  editAvatarButton,
  editAvatarForm,
  avatarInput,
  cardPopup,
  addButton,
  addCardForm,
  defaultConfig,
  deleteCardPopup,
  imageContainer,
  cardTemplateSelector,
  imagePopup
};
