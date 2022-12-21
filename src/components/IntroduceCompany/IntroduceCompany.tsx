import React from 'react';
import css from './IntroduceCompany.module.scss';
import { Link } from 'react-router-dom';

const IntroduceCompany = () => {
  return (
    <div className={css.btnContainer}>
      <button className={css.introduce}>
        <Link to="/list">우리 회사 소개하기</Link>
      </button>
    </div>
  );
};

export default IntroduceCompany;
