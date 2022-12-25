import React, { useState, useEffect } from 'react';
import css from './CardSubHome.module.scss';

function CompanyCard() {
  const URI = process.env.REACT_APP_BACK_URL;
  const PORT = process.env.REACT_APP_BACK_DEFAULT_PORT;
  const [companyCard, setCompanyCard] = useState([]);
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');
  requestHeaders.set(
    'Authorization',
    localStorage
      ?.getItem('token')
      ?.slice(1, localStorage.getItem('token')!.length - 1) || 'no token'
  );
  useEffect(() => {
    fetch('http://' + URI + ':' + PORT + '/feedlist', {
      headers: requestHeaders,
    })
      .then(res => res.json())
      .then(result => {
        setCompanyCard(result);
      });
  }, []);

  return (
    <div className={css.cardWrap}>
      {companyCard.map(({ feed_id, logo_img, company_name, introduction }) => (
        <div className={css.cardContainer} key={feed_id}>
          <div className={css.imageContainer}>
            <img className={css.cardImage} src={logo_img} alt="회사 이미지" />
          </div>
          <div className={css.contentContainer}>
            <p className={css.companyName}>{company_name}</p>
            <p className={css.companyDesc}>{introduction}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CompanyCard;
