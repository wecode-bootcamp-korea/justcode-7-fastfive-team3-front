import React from 'react';
import { Link } from 'react-router-dom';
import css from './Header.module.scss';

const Header = () => {
  const token = localStorage.getItem('token');
  const logout = () => {
    localStorage.clear();
  };
  return (
    <header className={css.headerContainer}>
      <h1>
        <Link to="/subHome">FASTFIVE</Link>
      </h1>
      {token ? (
        <button onClick={logout}>
          <Link to="/">로그아웃</Link>
        </button>
      ) : (
        <button>
          <Link to="/login">로그인</Link>
        </button>
      )}
    </header>
  );
};

export default Header;
