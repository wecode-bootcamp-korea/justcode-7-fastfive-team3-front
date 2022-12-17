import React, { Fragment } from 'react';
import css from './Comment.module.scss';

const Comment = () => {
  return (
    <Fragment>
      <div className={css.commentContainer}>
        <h1>댓글</h1>
        <div className={css.gridContainer}>
          <div className={css.gridItem}>
            <div>
              <span>작성자1</span>
              <span>2022년 12월 12일 오후 11:30</span>
            </div>
            <p>댓글입니다..</p>
          </div>
          <div className={css.gridItem}>댓글입니다..</div>
          <div className={css.gridItem}>댓글입니다..</div>
          <div className={css.gridItem}>댓글입니다..</div>
          <div className={css.gridItem}>댓글입니다..</div>
        </div>
      </div>
    </Fragment>
  );
};

export default Comment;
