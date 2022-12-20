import React, { useEffect, useRef, useState } from 'react';
import CommentList from './CommentList/CommentList';
import css from './Comment.module.scss';
import { Pagination } from '@mui/material';

const Comment = () => {
  //rnk : 0이면 일반댓글
  //rnk : 0아니면 대댓글
  //rnk가 false라면..? / undefined 또는 null..?

  //글자 수
  const [replyMainTextLength, setReplyMainTextLength] = useState(0);

  //메인 비밀 여부
  const [isMainSecret, setMainIsSecret] = useState(false);
  const setMainSecret = () => {
    setMainIsSecret(!isMainSecret);
  };

  //메인 등록 버튼 활성화 여부
  const [isMainDisable, setIsMainDisable] = useState(true);
  const mainTextareaDOM = useRef<HTMLTextAreaElement>(null);
  const mainTextareaValue = mainTextareaDOM.current?.value;
  useEffect(() => {
    if (mainTextareaValue) {
      setIsMainDisable(false);
    } else {
      setIsMainDisable(true);
    }
  }, [mainTextareaValue]);
  const handleMainResizeHeight = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    //textarea 내용에 따른 높이 변경
    e.target.style.height = '1px';
    e.target.style.height = e.target.scrollHeight + 'px';
    //글자수 count
    const currentTextareaText = e.target.value;
    if (currentTextareaText) {
      setReplyMainTextLength(currentTextareaText.length);
    } else if (!currentTextareaText) {
      setReplyMainTextLength(0);
    }
  };

  //페이지네이션-MUI
  const [currPage, setCurrPage] = useState('');
  const handlePagination = (e: React.ChangeEvent<any>) => {
    setCurrPage(e.target.textContent);
  };
  return (
    <div className={css.commentContainer}>
      <h1 className={css.commentTitle}>댓글</h1>
      <div className={css.gridContainer}>
        <CommentList />
        <CommentList />
        <div className={css.pagenation}>
          <Pagination count={8} onChange={handlePagination} />
        </div>
        <div
          className={`${css.gridItem} ${css.mainReply}`}
          onClick={e => e.preventDefault()}
        >
          <textarea
            className={css.commentContent}
            placeholder="위 멤버에게 궁금한 점이나 제안하고 싶은 내용을 댓글로 남겨보세요."
            ref={mainTextareaDOM}
            rows={1}
            onInput={handleMainResizeHeight}
          />
          <div className={css.countAndsend}>
            <span className={css.count}>{replyMainTextLength}</span>/1000
            <div
              className={isMainSecret ? css.lock : css.unlock}
              onClick={setMainSecret}
            />
            <button
              className={isMainDisable ? css.notSendReply : css.sendReply}
              disabled={isMainDisable}
            >
              등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
