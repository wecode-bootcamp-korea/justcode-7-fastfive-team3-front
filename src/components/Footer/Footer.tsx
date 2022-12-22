import React from 'react';
import css from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={css.footerContainer}>
      <div className={css.footerContentWrapper}>
        <div className={css.companyEngName}>
          FASTFIVE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
        <div className={css.companyName}>패스트파이브(주)&nbsp;</div>
        <div className={css.companyInfo}>
          |&nbsp;대표: 김대일&nbsp;|&nbsp;사업자등록번호:
          151-81-00025&nbsp;|&nbsp;개인정보 취급 방침 11:09
        </div>
      </div>
    </footer>
  );
};

export default Footer;
