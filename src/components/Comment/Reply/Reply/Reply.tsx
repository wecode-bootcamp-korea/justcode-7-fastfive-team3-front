import React, { Fragment, useEffect, useRef, useState } from 'react';
import css from './Reply.module.scss';

const Reply = () => {
  //textarea 처음에 비활성화 -> 수정 클릭 시 활성화
  const [isMyTextarea, setIsMyTextarea] = useState(true);
  const myTextarea = useRef<HTMLTextAreaElement>(null);
  const doModify = () => {
    setIsMyTextarea(false);
    myTextarea.current?.focus();
  };

  //삭제 버튼 클릭 시 알림창
  const doDelete = () => {
    if (window.confirm('삭제하시겠습니까?')) {
      alert('삭제되었습니다.');
      //TODO fetch()
    } else {
      alert('취소되었습니다.');
    }
  };
  const [isLoginUser, setIsLoginUser] = useState(false);
  const loginId: string | null = localStorage.getItem('id');
  const replyUserId = '1';
  useEffect(() => {
    if (loginId === replyUserId) {
      setIsLoginUser(true);
    } else {
      setIsLoginUser(false);
    }
  }, []);

  const handleModifyButton = () => {
    if (isLoginUser && isMyTextarea) {
      return (
        <Fragment>
          <div className={css.modifyAndDelete}>
            <button className={css.modify} onClick={doModify}>
              수정
            </button>
            <div className={css.centerBar} />
            <button className={css.delete} onClick={doDelete}>
              삭제
            </button>
          </div>
          <button className={css.newReply}>답글 달기</button>
        </Fragment>
      );
    } else if (isLoginUser && !isMyTextarea) {
      return <button className={css.setModify}>수정하기</button>;
    }
  };

  return (
    <Fragment>
      <div className={css.replyContainer}>
        <div className={css.replyWriterInfo}>
          <p className={css.replyWriterName}>작성자1</p>
          <p className={css.replyDate}>2022년 12월 12일 오후 11:30</p>
        </div>

        <textarea
          className={css.replyContent}
          disabled={isMyTextarea}
          rows={1}
          defaultValue={'저는 공개되어있는 댓글입니다..'}
        />
        {handleModifyButton()}
      </div>
    </Fragment>
  );
};

export default Reply;
