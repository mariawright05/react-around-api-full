import React from 'react';

function ImagePopup({ isOpen, onClose, link, name }) {
  return (
    <div
      className={`popup popup_type_display-image ${
        isOpen ? 'popup_opened' : ''
      }`}
    >
      <div className="popup__image-wrapper">
        <figure className="popup__figure">
          <img className="popup__image" src={link} alt={name} />
          <figcaption className="popup__image-caption">{name}</figcaption>
        </figure>
        <button className="popup__close-button" onClick={onClose} />
      </div>
    </div>
  );
}

export default ImagePopup;
