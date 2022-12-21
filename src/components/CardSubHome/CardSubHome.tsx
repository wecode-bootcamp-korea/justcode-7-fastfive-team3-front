import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import css from './CardSubHome.module.scss';
import { Pagination } from '@mui/material';

function CardSubHome() {
  const [companyCard, setCompanyCard] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8000/category')
      .then(res => res.json())
      .then(result => setCategoryList(result));
  }, []);

  const [categoryText, setCategoryText] = useState('');
  const handleButtonValue = (e: React.ChangeEvent<any>) => {
    setCategoryText(e.target.textContent);
  };
  const [isAccess, setIsAccess] = useState(false);
  // const token: string | null = localStorage.getItem('token');
  // const requestHeaders: HeadersInit = new Headers();
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');
  requestHeaders.set(
    'Authorization',
    localStorage
      ?.getItem('token')
      ?.slice(1, localStorage.getItem('token')!.length - 1) || 'no token'
  );
  useEffect(() => {
    // if (token) {
    //   requestHeaders.set('token', token);
    // }
    fetch('http://localhost:8000/user/checkauth', {
      headers: requestHeaders,
    })
      .then(res => res.json())
      .then(result => {
        setIsAccess(result.write_permission);
      });
  });

  const handleIntroduce = () => {
    // if (token) {
    //   requestHeaders.set('token', token);
    // }
    // fetch('http://localhost:8000/user/checkauth', {
    //   headers: requestHeaders,
    // })
    //   .then(res => res.json())
    //   .then(result => {
    //     setIsAccess(result.write_permission);
    //   });
  };

  const handleCategory = (e: React.MouseEvent<HTMLElement>) => {
    const element = e.currentTarget;
    fetch(`http://localhost:8000/subhome/category?category_id=${element.id}`)
      .then(res => res.json())
      .then(result => {
        setCompanyCard(result);
      });
  };

  // const navigate = useNavigate();
  // const moveDetail = () => {
  //   navigate(`/detail/${feed_id}`);
  // };

  const [currPage, setCurrPage] = useState(''); //전체 페이지 수
  console.log('페이지', `http://localhost:8000/feedlist?page=${currPage}`);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    fetch(`http://localhost:8000/feedlist?page=${currPage}`, {
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
  return (
    <>
      <div className={css.categoryList}>
        <div className={css.topTitle}>
          {isAccess === undefined && (
            <button className={css.introduce} onClick={handleIntroduce}>
              <Link to="/postWritePage">우리 회사 소개하기</Link>
            </button>
          )}
          <p className={css.titleCate}>업종별 살펴보기</p>
          <p className={css.titleAll}>
            <Link to="/list">전체 보기</Link>
          </p>
        </div>
        <div className={css.buttonWrap}>
          {categoryList.map(({ category_id, category }) => (
            <button
              className={css.cateBtn}
              key={category_id}
              id={category_id}
              onClick={handleCategory}
              // onChange={handleButtonValue}
            >
              {category}
            </button>
          ))}
        </div>
        {/* <p className={css.cateTitle}>{categoryText}</p> */}
      </div>
      <div className={css.cardWrap}>
        {companyCard.map(
          ({ feed_id, logo_img, company_name, introduction }) => (
            <div
              className={css.cardContainer}
              key={feed_id}
              // onClick={moveDetail}
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
        <Pagination count={totalPages} onChange={handlePagination} />
      )}
    </>
  );
}

export default CardSubHome;
