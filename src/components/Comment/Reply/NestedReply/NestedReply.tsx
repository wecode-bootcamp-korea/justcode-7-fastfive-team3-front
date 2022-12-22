import React, { Fragment, useEffect, useRef, useState } from 'react';
import { NestedReplyProps } from '../../CommentList/CommentList';
import css from './NestedReply.module.scss';

const NestedReply: React.FC<NestedReplyProps> = ({ loginId, reply }) => {
  const URI = process.env.REACT_APP_BACK_URL;
  const PORT = process.env.REACT_APP_BACK_DEFAULT_PORT;
  //textarea 처음에 비활성화 -> 수정 클릭 시 활성화
  const [isMyTextarea, setIsMyTextarea] = useState(true);
  const [isPrivate, setIsPrivate] = useState(false);
  const [replyTextLength, setReplyTextLength] = useState(0);
  const [isMainSecret, setMainIsSecret] = useState(false);
  const [feedUser, setFeedUser] = useState(0);
  const myTextarea = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    setIsPrivate(reply.is_private);
    setFeedUser(reply.feed_user_id);
  }, []);
  const doModify = () => {
    setIsMyTextarea(false);
    myTextarea.current?.focus();
  };
  const noModify = () => {
    setIsMyTextarea(true);
  };
  const setMainSecret = () => {
    setMainIsSecret(!isMainSecret);
  };
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
      fetch('http://l' + URI + ':' + PORT + '/reply', {
        method: 'DELETE',
        headers: requestHeaders,
        body: JSON.stringify({
          reply_id: reply.reply_id,
        }),
      })
        .then(response => response.json())
        .then(json => {
          if (json.message) {
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
  const replyUserId = reply.reply_user_id;
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
  const modifyNestedReply = () => {
    fetch('http://' + URI + ':' + PORT + '/reply', {
      method: 'PATCH',
      headers: requestHeaders,
      body: JSON.stringify({
        reply_id: reply.reply_id,
        comment: myTextarea.current?.value,
        is_private: isMainSecret,
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.result) {
          alert('답글 수정이 완료되었습니다.');
          window.location.reload();
        } else {
          alert('다시 시도해주세요.');
        }
      });
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
        </Fragment>
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
          <button className={css.setModify} onClick={modifyNestedReply}>
            수정하기
          </button>
        </div>
      );
    }
  };
  return (
    <Fragment>
      <div className={`${css.nestedReplyContainer} ${css.reply}`}>
        <div className={css.nestedReplyWriterInfo}>
          <p className={css.nestedReplywriterName}>
            {(isPrivate && !isLoginUser) || (isPrivate && feedUser !== loginId)
              ? '비밀답글입니다'
              : reply.nickname}
          </p>
          <p className={css.nestedReplyDate}>{reply.created_at}</p>
          {isPrivate && <div className={css.lock} />}
        </div>
        <textarea
          className={css.nestedReplyContent}
          disabled={isMyTextarea}
          ref={myTextarea}
          onChange={handleResizeHeight}
          defaultValue={
            (isPrivate && !isLoginUser) || (isPrivate && feedUser !== loginId)
              ? '비밀 댓글은 댓글 작성자와 본문 작성자만 볼 수 있습니다.'
              : reply.comment
          }
          maxLength={1000}
        />
        {handleModifyButton()}
      </div>
    </Fragment>
  );
};

export default NestedReply;
