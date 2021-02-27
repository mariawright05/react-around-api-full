import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card(props) {
  // USER INFO
  const currentUser = React.useContext(CurrentUserContext);

  // Checking if you are the owner of the current card
  const isOwn = props.card.owner._id === currentUser._id;

  // Creating a variable which you'll then set in `className` for the delete button
  const cardDeleteButtonClassName = `${
    isOwn ? 'photo-grid__remove' : 'photo-grid__remove_hidden'
  }`;

  // LIKE INFO
  // Check if the card was liked by the current user
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  // Create a variable which you then set in `className` for the like button
  const cardLikeButtonClassName = `${
    isLiked ? 'photo-grid__like photo-grid__like_true' : 'photo-grid__like'
  }`;

  // Opens card popup on click
  function handleClick() {
    props.onCardClick(props.card);
  }

  // Changes likes on click
  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  // Deletes card on trash click
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="photo-grid__item">
      <div
        className="photo-grid__image"
        style={{ backgroundImage: `url(${props.link})` }}
        onClick={handleClick}
      />
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      />
      <div className="photo-grid__title-container">
        <h2 className="photo-grid__title">{props.name}</h2>
        <div className="photo-grid__like-wrapper">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <p className="photo-grid__like-count">{props.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
