import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import css from './CompanyList.module.scss';

function CompanyList() {
  const [companyCard, setCompanyCard] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8000/feedlist')
      .then(res => res.json())
      .then(result => {
        setCompanyCard(result);
      });
  }, []);

  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8000/category')
      .then(res => res.json())
      .then(result => setCategoryList(result));
  }, []);

  const [isAccess, setIsAccess] = useState();
  const token: string | null = localStorage.getItem('token');
  const requestHeaders: HeadersInit = new Headers();
  useEffect(() => {
    if (token) {
      requestHeaders.set('token', token);
    }
    fetch('http://localhost:8000/user/checkauth', {
      headers: requestHeaders,
    })
      .then(res => res.json())
      .then(result => {
        setIsAccess(result.write_permission);
      });
  });

  const handleIntroduce = () => {};
  // const handleIntroduce = () => {
  //   if (token) {
  //   }
  // };

  const handleLocation = (e: React.MouseEvent<HTMLElement>) => {
    const location = e.currentTarget;
    fetch(`http://localhost:8000/feedlist?location_id=${location.id}`)
      .then(res => res.json())
      .then(result => {
        setCompanyCard(result);
      });
  };

  const handleCategory = (e: React.MouseEvent<HTMLElement>) => {
    const category = e.currentTarget;
    fetch(`http://localhost:8000/subhome/category?category_id=${category.id}`)
      .then(res => res.json())
      .then(result => {
        setCompanyCard(result);
      });
  };

  // const handleLocation = (e: React.ChangeEvent<any>) => {
  //   const locationID = e.target.value;
  //   console.log('위치 클릭', locationID);
  //   fetch(`http://localhost:8000/feedlist?location_id=${locationID}`)
  //     .then(res => res.json())
  //     .then(result => {
  //       setCompanyCard(result);
  //     });
  // };

  const [locationList, setLocationList] = useState([]);
  useEffect(() => {
    fetch('./data/LocationList.json')
      .then(res => res.json())
      .then(result => setLocationList(result));
  }, []);

  return (
    <>
      <div className={css.categoryList}>
        <p className={css.titleAll}>전체보기</p>
        <div className={css.buttonWrap}>
          <div className={css.cateTitle}>카테고리</div>
          {categoryList.map(({ category_id, category }) => (
            <div
              className={css.cateBtn}
              key={category_id}
              id={category_id}
              onClick={handleCategory}
            >
              {category}
            </div>
          ))}
          <div className={css.cateTitle}>지역</div>
          {locationList.map(({ location_id, location }) => (
            <div
              className={css.cateBtn}
              key={location_id}
              id={location_id}
              onClick={handleLocation}
            >
              {location}
            </div>
          ))}
        </div>
        {/* <select onChange={handleLocation}>
          <option>지역</option>
          {locationList.map(({ location_id, location }) => (
            <option key={location_id} value={location_id}>
              {location}
            </option>
          ))}
        </select>
        <select>
          <option>카테고리</option>
          {categoryList.map(({ category_id, category }) => (
            <option
              value={category_id}
              key={category_id}
              id={category_id}
              onClick={handleCategory}
            >
              {category}
            </option>
          ))}
        </select> */}
        <div className={css.topTitle}>
          {isAccess && (
            <button className={css.introduce} onClick={handleIntroduce}>
              <Link to="/postWritePage">우리 회사 소개하기</Link>
            </button>
          )}
        </div>
      </div>
      <div className={css.cardWrap}>
        {companyCard.map(
          ({ feed_id, logo_img, company_name, introduction }) => (
            <div className={css.cardContainer} key={feed_id}>
              <div className={css.imageContainer}>
                <img
                  className={css.cardImage}
                  src={logo_img}
                  alt="회사 이미지"
                />
              </div>
              <div className={css.contentContainer}>
                <p className={css.companyName}>{company_name}</p>
                <p className={css.companyDesc}>{introduction}</p>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
}

export default CompanyList;
