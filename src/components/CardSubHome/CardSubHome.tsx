import React, { useState, useEffect } from 'react';
import css from './CardSubHome.module.scss';

function CardSubHome() {
  const [companyCard, setCompanyCard] = useState([]);

  useEffect(() => {
    fetch('./data/CompanyCard.json')
      .then(res => res.json())
      .then(data => setCompanyCard(data.companyCard));
  }, []);
  return (
    <div className={css.cardWrap}>
      {companyCard.map(({ id, img, company_name, description }) => (
        <div className={css.cardContainer} key={id}>
          <div className={css.imageContainer}>
            <img className={css.cardImage} src={img} alt="회사 이미지" />
          </div>
          <p className={css.companyName}>{company_name}</p>
          <p className={css.companyDesc}>{description}</p>
        </div>
      ))}
    </div>
  );
}

export default CardSubHome;
