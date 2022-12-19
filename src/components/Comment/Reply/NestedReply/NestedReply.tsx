import React, { Fragment, useEffect, useRef, useState } from 'react';
import css from './NestedReply.module.scss';

const NestedReply = () => {
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
  }, [loginId]);

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
          <button className={css.newNestedReply}>답글 달기</button>
        </Fragment>
      );
    } else if (isLoginUser && !isMyTextarea) {
      return <button className={css.setModify}>수정하기</button>;
    }
  };
  return (
    <div className={`${css.nestedReplyContainer} ${css.reply}`}>
      <div className={css.nestedReplyWriterInfo}>
        <p className={css.nestedReplywriterName}>작성자3</p>
        <p className={css.nestedReplyDate}>2022년 12월 12일 오후 11:30</p>
      </div>
      <textarea
        className={css.nestedReplyContent}
        disabled={isMyTextarea}
        defaultValue="안녕! 내 이름은 대댓글. 댓글다는 사람이죠. 댓글은 언제나 하나! 안녕! 내 이름은 대댓글. 댓글다는 사람이죠. 댓글은 언제나 하나! 안녕! 내 이름은 대댓글. 댓글다는 사람이죠. 댓글은 언제나 하나! 안녕! 내 이름은 대댓글. 댓글다는 사람이죠. 댓글은 언제나 하나! 안녕! 내 이름은 대댓글. 댓글다는 사람이죠. 댓글은 언제나 하나! 안녕! 내 이름은 대댓글. 댓글다는 사람이죠. 댓글은 언제나 하나!"
      />
      {handleModifyButton()}
    </div>
  );
};

export default NestedReply;
