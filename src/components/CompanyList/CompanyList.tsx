import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import css from './CompanyList.module.scss';
import { Pagination } from '@mui/material';

function CompanyList() {
  const URI = process.env.REACT_APP_BACK_URL;
  const PORT = process.env.REACT_APP_BACK_DEFAULT_PORT;
  const [companyCard, setCompanyCard] = useState([]);
  const [currPage, setCurrPage] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    fetch(`http://` + URI + `:` + PORT + `/feedlist?page=${currPage}`, {
      method: 'GET',
      headers: requestHeaders,
    })
      .then(response => response.json())
      .then(json => {
        setTotalPages(Number(json.resultPageCnt));
        setCompanyCard(json.resResult);
      });
  }, [currPage]);
  const handlePagination = (e: React.ChangeEvent<any>) => {
    setCurrPage(e.target.textContent);
  };

  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    fetch('http://' + URI + ':' + PORT + '/category')
      .then(res => res.json())
      .then(result => setCategoryList(result));
  }, []);

  const [categoryText, setCategoryText] = useState('');
  const [locationText, setLocationText] = useState('');
  // const [isAccess, setIsAccess] = useState(false);
  let token = localStorage.getItem('token');
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');
  if (token) {
    requestHeaders.set('Authorization', token);
  }
  // requestHeaders.set(
  //   'Authorization',
  //   localStorage
  //     ?.getItem('token')
  //     ?.slice(1, localStorage.getItem('token')!.length - 1) || 'no token'
  // );
  // useEffect(() => {
  //   fetch('http://' + URI + ':' + PORT + '/user/checkauth', {
  //     headers: requestHeaders,
  //   })
  //     .then(res => res.json())
  //     .then(result => {
  //       setIsAccess(result.write_permission);
  //     });
  // });

  const handleLocation = (e: React.MouseEvent<HTMLElement>) => {
    const location = e.currentTarget;
    fetch(`http://` + URI + `:` + PORT + `/feedlist?location_id=${location.id}`)
      .then(res => res.json())
      .then(result => {
        setTotalPages(0);
        setCompanyCard(result.result);
      });
    const target = e.target as Element;
    setLocationText(target.innerHTML);
  };

  const handleCategory = (e: React.MouseEvent<HTMLElement>) => {
    const category = e.currentTarget;
    fetch(
      `http://` +
        URI +
        `:` +
        PORT +
        `/subhome/category?category_id=${category.id}`
    )
      .then(res => res.json())
      .then(result => {
        setTotalPages(0);
        setCompanyCard(result);
      });
    const target = e.target as Element;
    setCategoryText(target.innerHTML);
  };

  const [locationList, setLocationList] = useState([]);
  useEffect(() => {
    fetch('./data/LocationList.json')
      .then(res => res.json())
      .then(result => setLocationList(result));
  }, []);

  const navigate = useNavigate();
  const moveDetail = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget as Element;
    navigate(`/detail/${target.id}`);
  };

  return (
    <>
      <div className={css.categoryList}>
        <div className={css.topTitle}>
          <h1 className={css.titleAll}>전체 보기</h1>
          {/* {isAccess === undefined && ( */}
          <button className={css.introduce}>
            <Link to="/postWritePage">우리 회사 소개하기</Link>
          </button>
          {/* )} */}
        </div>
        <div className={css.buttonWrap}>
          <p>관심 있는 멤버를 찾아보세요!</p>
          <div className={css.cateTitle}>
            지역<span className={css.title}>{locationText}</span>
          </div>
          {locationList.map(({ location_id, location }) => (
            <button
              className={css.cateBtn}
              key={location_id}
              id={location_id}
              onClick={handleLocation}
            >
              {location}
            </button>
          ))}
          <div className={css.cateTitle}>
            카테고리<span className={css.title}>{categoryText}</span>
          </div>
          {categoryList.map(({ category_id, category }) => (
            <button
              className={css.cateBtn}
              key={category_id}
              id={category_id}
              onClick={handleCategory}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className={css.cardWrap}>
        {companyCard.map(
          ({ feed_id, logo_img, company_name, introduction, location_id }) => (
            <div
              className={css.cardContainer}
              key={feed_id}
              id={location_id}
              onClick={moveDetail}
            >
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
      {totalPages !== 0 && (
        <Pagination
          className={css.pagination}
          count={totalPages}
          onChange={handlePagination}
        />
      )}
    </>
  );
}

export default CompanyList;
