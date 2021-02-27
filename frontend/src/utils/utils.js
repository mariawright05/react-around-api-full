// Determines if request is successful and changes button text
function loading(isLoading, popup) {
  if (isLoading) {
    popup.querySelector('.popup__button').value = 'Saving...';
  } else {
    popup.querySelector('.popup__button').value = 'Save';
  }
}

export default loading;
