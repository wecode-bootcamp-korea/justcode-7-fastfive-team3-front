import React, { Fragment, useEffect, useRef, useState } from 'react';
import { LoginProps } from '../../CommentList/CommentList';
import WriteNestedReply from '../WriteNestedReply/WriteNestedReply';
import css from './Reply.module.scss';

const Reply: React.FC<LoginProps> = ({
  loginId,
  setShowWriteTextarea,
  showWriteTextarea,
}) => {
  const [isMyTextarea, setIsMyTextarea] = useState(true);
  const [isPrivate, setIsPrivate] = useState(false);
  // const [showWriteTextarea, setShowWriteTextarea] = useState(false);
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

  const replyUserId = '2';
  useEffect(() => {
    if (loginId === replyUserId) {
      setIsLoginUser(true);
    } else {
      setIsLoginUser(false);
    }
  }, [loginId]);

  //답글달기 클릭 시 답글 작성 컴포넌트 생성
  const writeNewNestedReply = () => {
    setShowWriteTextarea(!showWriteTextarea);
  };

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
          <button className={css.newReply} onClick={writeNewNestedReply}>
            {showWriteTextarea ? '취소' : '답글 달기'}
          </button>
        </Fragment>
      );
    } else if (!isLoginUser) {
      return (
        <button className={css.newReply} onClick={writeNewNestedReply}>
          답글 달기
        </button>
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
      <div className={css.replyContainer}>
        <div className={css.replyWriterInfo}>
          <p className={css.replyWriterName}>{isPrivate ? '.' : '작성자1'}</p>
          <p className={css.replyDate}>2022년 12월 12일 오후 11:30</p>
        </div>
        <textarea
          className={css.replyContent}
          disabled={isMyTextarea}
          rows={1}
          defaultValue={
            isPrivate
              ? '비밀 댓글은 댓글 작성자와 본문 작성자만 볼 수 있습니다.'
              : '공개댓글입니다'
          }
        />
        {handleModifyButton()}
      </div>
    </Fragment>
  );
};

export default Reply;