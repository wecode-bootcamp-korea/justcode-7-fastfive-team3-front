import React, { Fragment, useEffect, useRef, useState } from 'react';
import css from './NestedReply.module.scss';

const NestedReply = () => {
  //textarea 처음에 비활성화 -> 수정 클릭 시 활성화
  const [isMyTextarea, setIsMyTextarea] = useState(true);
  const [isPrivate, setIsPrivate] = useState(false);
  const myTextarea = useRef<HTMLTextAreaElement>(null);
  const doModify = () => {
    setIsMyTextarea(false);
    myTextarea.current?.focus();
  };
  const noModify = () => {
    setIsMyTextarea(true);
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
        </Fragment>
      );
    } else if (isLoginUser && !isMyTextarea) {
      return (
        <div className={css.modifys}>
          <button className={css.cancleModify} onClick={noModify}>
            취소
          </button>
          <button className={css.setModify}>수정하기</button>
        </div>
      );
    }
  };
  return (
    <Fragment>
      <div className={`${css.nestedReplyContainer} ${css.reply}`}>
        <div className={css.nestedReplyWriterInfo}>
          <p className={css.nestedReplywriterName}>
            {isPrivate ? '.' : '작성자1'}
          </p>
          <p className={css.nestedReplyDate}>2022년 12월 12일 오후 11:30</p>
        </div>
        <textarea
          className={css.nestedReplyContent}
          disabled={isMyTextarea}
          defaultValue={
            isPrivate
              ? '비밀 댓글은 댓글 작성자와 본문 작성자만 볼 수 있습니다.'
              : '공개댓글입니다2'
          }
        />
        {handleModifyButton()}
      </div>
    </Fragment>
  );
};

export default NestedReply;
