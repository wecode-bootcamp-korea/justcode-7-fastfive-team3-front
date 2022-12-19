import React, { useState, useEffect } from 'react';
import css from './CardSubHome.module.scss';
import InfiniteScroll from 'react-infinite-scroll-component';

function CardSubHome() {
  interface scroll {
    feed_id: number;
    logo_img: string;
    company_name: string;
    introduction: string;
  }
  const [companyCard, setCompanyCard] = useState<scroll[]>([]);
  const fetchData = () => {
    setTimeout(() => {
      setCompanyCard(companyCard.concat(Array.from({ length: 12 })));
    }, 1500);
  };

  // const [companyCard, setCompanyCard] = useState([]);
  useEffect(() => {
    fetch('./data/CompanyCard.json')
      .then(res => res.json())
      .then(data => setCompanyCard(data.companyCard));
  }, []);

  const handleCategory = (e: React.MouseEvent<HTMLElement>) => {
    const element = e.currentTarget;
    // console.log(
    //   `http://localhost:8000/subhome/category?category_id=${element.id}`
    // );
    fetch(`http://localhost:8000/subhome/category?category_id=${element.id}`)
      .then(res => res.json())
      .then(data => {
        setCompanyCard(data.companyCard);
      });
  };

  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    fetch('./data/CategoryList.json')
      .then(response => response.json())
      .then(result => setCategoryList(result));
  }, []);

  // useEffect(() => {
  //   fetch('http://localhost:8000/category')
  //     .then(response => response.json())
  //     .then(result => setCategoryList(result));
  // }, []);

  return (
    <>
      <div className={css.categoryList}>
        <div className={css.topTitle}>
          <p className={css.titleCate}>업종별 살펴보기</p>
          <p className={css.titleAll}>전체보기</p>
        </div>
        <div className={css.buttonWrap}>
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
        <p className={css.cateTitle}>카테고리명</p>
      </div>
      <InfiniteScroll
        dataLength={companyCard.length}
        next={fetchData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
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
                  <button className={css.moreBtn}>View More</button>
                </div>
              </div>
            )
          )}
        </div>
      </InfiniteScroll>
    </>
  );
}

export default CardSubHome;
