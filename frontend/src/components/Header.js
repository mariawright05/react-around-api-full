import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../images/usa-logo-white.svg';


function Header(props) {
  const { text, link, loggedIn, onSignOut } = props;
  if (loggedIn) {
    return (
    <div className="header">
      <img className="logo" src={ logo } alt="Around the US logo" />
        <ul className="header__nav">
          <li className="header__menu-item">{`${text}`}</li>
          <li className="header__menu-link" onClick={onSignOut}>Log out</li>
        </ul>
    </div>
    )
  } else {
    return (
      <div className="header">
        <img className="logo" src={ logo } alt="Around the US logo" />
        <div className="header__nav">
          <NavLink className="header__menu-link" to={ `${link}` }>
            {text}
          </NavLink>
        </div>
      </div>
    )
  }
}

export default Header;
