import React, { Fragment, useEffect, useRef, useState } from 'react';
import { ReplyProps } from '../../CommentList/CommentList';
import css from './Reply.module.scss';

const Reply: React.FC<ReplyProps> = ({
  loginId,
  setShowWriteTextarea,
  showWriteTextarea,
  commentInfo,
  setParentId,
}) => {
  const [isMyTextarea, setIsMyTextarea] = useState(true);
  const [isPrivate, setIsPrivate] = useState(false);
  const [focus, setFocus] = useState(false);
  const [replyTextLength, setReplyTextLength] = useState(0);
  const [isMainSecret, setMainIsSecret] = useState(false);
  const doModify = () => {
    setIsMyTextarea(false);
    setFocus(true);
  };
  const noModify = () => {
    setIsMyTextarea(true);
    setFocus(false);
  };
  useEffect(() => {
    setIsPrivate(commentInfo.is_private);
  }, []);
  //삭제 버튼 클릭 시 알림창
  let token = localStorage.getItem('token');
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');
  requestHeaders.set('Content-Type', 'application/json');
  if (token) {
    requestHeaders.set('Authorization', token);
  }
  const doDelete = () => {
    if (window.confirm('삭제하시겠습니까?')) {
      fetch('http://localhost:8000/reply', {
        method: 'DELETE',
        headers: requestHeaders,
        body: JSON.stringify({
          reply_id: commentInfo.reply_id,
        }),
      })
        .then(response => response.json())
        .then(json => {
          if (json.message) {
            console.log(json);
            alert('삭제되었습니다.');
            window.location.reload();
          } else {
            alert('다시 시도해주세요.');
          }
        });
    } else {
      alert('취소되었습니다.');
    }
  };
  const [isLoginUser, setIsLoginUser] = useState(false);

  const replyUserId = commentInfo.reply_user_id;
  useEffect(() => {
    if (loginId === replyUserId) {
      setIsLoginUser(true);
    } else {
      setIsLoginUser(false);
    }
  }, [loginId]);
  const handleResizeHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    //textarea 내용에 따른 높이 변경
    e.target.style.height = '1px';
    e.target.style.height = e.target.scrollHeight + 'px';
    //글자수 count
    const currentTextareaText = e.target.value;
    if (currentTextareaText) {
      setReplyTextLength(currentTextareaText.length);
    } else if (!currentTextareaText) {
      setReplyTextLength(0);
    }
  };
  //답글달기 클릭 시 답글 작성 컴포넌트 생성
  const writeNewNestedReply = () => {
    setShowWriteTextarea(!showWriteTextarea);
    setParentId(commentInfo.reply_id);
  };
  const setMainSecret = () => {
    setMainIsSecret(!isMainSecret);
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
    } else if (!isLoginUser && !isPrivate) {
      return (
        <button className={css.newReply} onClick={writeNewNestedReply}>
          답글 달기
        </button>
      );
    } else if (isLoginUser && !isMyTextarea) {
      return (
        <div className={css.modifys}>
          <span className={css.count}>{replyTextLength}</span>/1000
          <div
            className={isMainSecret ? css.lock : css.unlock}
            onClick={setMainSecret}
          />
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
          <p className={css.replyWriterName}>
            {isPrivate && !isLoginUser
              ? '비밀댓글입니다'
              : commentInfo.nickname}
          </p>
          <p className={css.replyDate}>{commentInfo.created_at}</p>
          {isPrivate && <div className={css.lock} />}
        </div>
        <textarea
          className={css.replyContent}
          disabled={isMyTextarea}
          rows={1}
          autoFocus={focus}
          onInput={handleResizeHeight}
          defaultValue={
            isPrivate && !isLoginUser
              ? '비밀 댓글은 댓글 작성자와 본문 작성자만 볼 수 있습니다.'
              : commentInfo.comment
          }
        />
        {handleModifyButton()}
      </div>
    </Fragment>
  );
};

export default Reply;
