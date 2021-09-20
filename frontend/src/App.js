import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, withRouter, useHistory } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Main from './components/Main.js';
import Register from './components/Register';
import Login from './components/Login';
import PopupWithForm from './components/PopupWithForm.js';
import ImagePopup from './components/ImagePopup.js';
import CurrentUserContext from './contexts/CurrentUserContext';
import EditProfilePopup from './components/EditProfilePopup';
import EditAvatarPopup from './components/EditAvatarPopup';
import api from './utils/api.js';
import AddPlacePopup from './components/AddPlacePopup.js';
import { authorize, register, getContent } from './utils/auth.js';
import InfoTooltip from './components/InfoTooltip.js';

function App() {

  // POPUPS
  // set states for popups
  const [isEditProfilePopopOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  // set states for image popups
  const [selectedLink, setSelectedLink] = useState('');
  const [selectedName, setSelectedName] = useState('');

  // set states for login
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [currentUser, setCurrentUser] = useState({});

  const history = useHistory();

  // handler functions for popups  
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (link, name) => {
    setSelectedCard(true);
    setSelectedLink(link);
    setSelectedName(name);
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(false);
    setIsInfoTooltipOpen(false);
  };

  // api functions for popup data
  function handleUpdateUser(userInfo) {
    api.setUserInfo(userInfo, token)
      .then(res => {
        setCurrentUser({ name: res.data.name, about: res.data.about, avatar: res.data.avatar, _id: res.data._id });
      })
      .then(() => { closeAllPopups() })
      .catch(err => console.log(err))
  }

  function handleUpdateAvatar(avatar) {
    api.setUserAvatar(avatar, token)
      .then(res => { setCurrentUser({ name: res.data.name, about: res.data.about, avatar: res.data.avatar, _id: res.data._id }) })
      .then(() => { closeAllPopups() })
      .catch(err => console.log(err))
  }

  function handleAddPlaceSubmit(cardInfo) {
    api.addCard(cardInfo, token)
      .then(res => (setCards([res, ...cards])))
      .then(() => { closeAllPopups() })
      .catch(err => console.log(err))
  }

  // CARD FUNCTIONALITY
  // likes and dislikes
  function handleCardLike(card) {
    // Check one more time if this card was already liked
    const isLiked = card.likes.includes(currentUser._id);
    api.updateLikes(card._id, !isLiked, token)
      .then((newCard) => { 
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  // trash
  function handleCardDelete(card) {
    api.removeCard(card._id, token)
      .then(() => {
        const newCardList = cards.filter((c) => c._id !== card._id);
        setCards(newCardList);
      })
      .catch(err => console.log(err));
  }

  // AUTH
  // see if user is logged in
  const handleTokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    getContent(jwt)
      .then((res) => {
        setCurrentUser(res);
        setUserEmail(res.email);
        setIsSuccessful(true);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoggedIn(Boolean(jwt));
      })
  };

  useEffect(() => {
    handleTokenCheck();
    if (loggedIn) {
      history.push('/main');
    } else {
      history.push('/signin');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn])

  // login user
  const handleLogin = (email, password) => {
    authorize(email, password)
      .then((res) => {
        if (res && res.token) {
          setToken(res.token);
          setUserEmail(res.email);
          localStorage.setItem('token', res.token);
          setLoggedIn(true);
        } else {
          if (!res || res.err) {
            setIsSuccessful(false);
            setIsInfoTooltipOpen(true);
          }
        }
      })
      .then(() => {
        history.push('/main');
      })
      .catch((err) => {
        setIsSuccessful(false);
        setIsInfoTooltipOpen(true);
      })
  }

  // register user
  const handleRegister = (email, password) => {
    register(email, password)
      .then((res) => {
        if (res.err || !res) {
          setIsSuccessful(false);
          setIsInfoTooltipOpen(true);
        } else {
          setIsSuccessful(true);
          setIsInfoTooltipOpen(true);
          history.push('/signin');
        }
      })
      .catch(err => console.log(err))
  }

  // Log user out
  const onSignOut = () => {
    localStorage.removeItem('jwt')
    setLoggedIn(false);
    history.push('/signin');
  }

  // GETTING INITIAL DATA FROM SERVER
  // initial cards
  const [cards, setCards] = useState([]);
  // add if (loggedIn), then [loggedIn]
  useEffect(() => {
    if (token) {
      api.getCardList(token)
        .then((res) => {
          setCards(res.map((card) => ({
            link: card.link,
            name: card.name,
            likes: card.likes,
            _id: card._id,
            owner: card.owner
          })));
        })
        .catch(err => console.log(err))
    } 
  }, [token]);

  // initial user data  
  useEffect(() => {
    if (token) {
      api.getUserInfo(token)
        .then((res) => {
          if (res && res.data) {
            setCurrentUser(res);
          }
    })
        .catch(err => console.log(err))
    } 
  }, [currentUser, token]);

  return (
    <CurrentUserContext.Provider value={ currentUser }>
      <div className="page">
        <div className="page__container">
          <Switch>
            <Route exact path='/'>
              { loggedIn ? <Redirect to='/main' /> : <Redirect to='/signin' /> }
            </Route>
            <ProtectedRoute
              exact path="/main"
              component={Main}
              loggedIn={ loggedIn }
              userEmail={ userEmail }
              handleEditAvatarClick={ handleEditAvatarClick }
              handleEditProfileClick={ handleEditProfileClick }
              handleAddPlaceClick={ handleAddPlaceClick }
              handleCardClick={ handleCardClick }
              cards={ cards }
              handleCardLike={ handleCardLike }
              handleCardDelete={ handleCardDelete }
              onSignOut={ onSignOut }
            />
            <Route path="/signup">
              <Register handleRegister={ handleRegister } />
              <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} isSuccessful={isSuccessful} />
            </Route>
            <Route path="/signin">
              <Login handleLogin={ handleLogin } loggedIn={loggedIn} />
              <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} isSuccessful={isSuccessful} />
            </Route>
            <Redirect from='*' to='/' />
          </Switch>
        
          <EditProfilePopup isOpen={isEditProfilePopopOpen} onClose={closeAllPopups} handleUpdateUser={handleUpdateUser} />
              
          <EditAvatarPopup isOpen={ isEditAvatarPopupOpen } onClose={ closeAllPopups } handleUpdateAvatar={ handleUpdateAvatar } />
          
          <AddPlacePopup isOpen={ isAddPlacePopupOpen } onClose={ closeAllPopups } handleAddPlaceSubmit={ handleAddPlaceSubmit } />
          
          <PopupWithForm name="delete-card" title="Are you sure?">
            <h3 className="popup__heading popup__heading_type_no-inputs">Are you sure?</h3>
          </PopupWithForm>

          <ImagePopup 
            onClose={closeAllPopups}
            isOpen={selectedCard}
            link={selectedLink}
            name={selectedName}
          />
        </div> 
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
