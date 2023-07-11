import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink} from 'react-router-dom';

import { setStateCleaning } from '../redux/slices/user/userSlice';

import LogoHeader from '../assets/logo.svg';

export const Header = () => {
  const dispatch = useDispatch();

  const handleUsersLinkClick = () => {
    dispatch(setStateCleaning());
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          <img src={LogoHeader} alt="LogoHeader" />
          <h2>testtask</h2>
        </Link>
        <nav className="header__actions">
          <NavLink to="/users" onClick={handleUsersLinkClick} className="header__button button">
            Users
          </NavLink>
          <NavLink to="/register" className="header__button button">
            Sign Up
          </NavLink>
        </nav>
      </div>
    </header>
  );
};
