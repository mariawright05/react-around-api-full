import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from './Header';

const Register = ({ handleRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(email, password);    
  }

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      history.push('/main');
    }
  }, [history])

  return (
    <div>
      <Header text="Log in" link="/signin"></Header>
      <div className="form__container">
        <form action="submit" onSubmit={handleSubmit} className="popup__form">
          <h3 className="form__heading">Sign up</h3>
          <fieldset className="form__fields-container">
            <div className="form__label">
              <input
                id="email"
                type="text"
                name="email"
                className="form__field"
                placeholder="Email"
                value={email}
                required
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="form__label">
              <input
                id="password"
                type="text"
                name="password"
                className="form__field"
                placeholder="Password"
                value={password}
                required
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </fieldset>
          <input type="submit" className="form__button" value="Sign up" />
          <Link className="form__message" to='/signin'>Already a member? Log in here!</Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
