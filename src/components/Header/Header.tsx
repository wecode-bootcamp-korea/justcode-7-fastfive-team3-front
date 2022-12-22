import React from 'react';
import { Link } from 'react-router-dom';
import css from './Header.module.scss';

const Header = () => {
  return (
    <header className={css.headerContainer}>
      <h1>
        <Link to="/subHome">FASTFIVE</Link>
      </h1>
      <button>
        <Link to="/login">로그인</Link>
      </button>
    </header>
  );
};

export default Header;
