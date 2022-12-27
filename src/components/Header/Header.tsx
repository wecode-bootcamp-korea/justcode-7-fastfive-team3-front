import React from 'react';
import { Link } from 'react-router-dom';
import css from './Header.module.scss';

const Header = () => {
  const token = localStorage.getItem('token');
  const nickName = localStorage.getItem('nickname');
  const logout = () => {
    localStorage.clear();
  };
  return (
    <header className={css.headerContainer}>
      <h1>
        <Link to="/subHome">FASTFIVE</Link>
      </h1>
      <div className={css.headerLeft}>
        <p>{nickName}님 안녕하세요!</p>
        {token ? (
          <button onClick={logout}>
            <Link to="/">로그아웃</Link>
          </button>
        ) : (
          <button>
            <Link to="/">로그인</Link>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
