import React, { useState, useEffect } from 'react';
import css from './CategoryList.module.scss';

function CategoryList() {
  const URI = process.env.REACT_APP_BASE_URL;
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    fetch('./data/CategoryList.json')
      .then(response => response.json())
      .then(result => setCategoryList(result));
  }, []);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   fetch('http://' + URI + ':8000/category', {
  //     method: 'GET',
  //     headers: {
  //       authorization: token,
  // 'Content-Type': 'application/json',
  //     },
  //   })
  //     .then(response => response.json())
  //     .then(result => setCategoryList(result));
  // }, []);

  return (
    <div className={css.categoryList}>
      <div className={css.topTitle}>
        <p className={css.titleCate}>업종별 살펴보기</p>
        <p className={css.titleAll}>전체보기</p>
      </div>
      <div className={css.buttonWrap}>
        {categoryList.map(({ category_id, category }) => (
          <button className={css.cateBtn} key={category_id}>
            {category}
          </button>
        ))}
      </div>
      <p className={css.cateTitle}>카테고리명</p>
    </div>
  );
}

export default CategoryList;
