import React from 'react';
import css from './Header.module.scss';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className={css.headerContainer}>
      <h1>FASTFIVE</h1>
      <button>
        <Link to="/login">로그인</Link>
      </button>
    </header>
  );
};

export default Header;
