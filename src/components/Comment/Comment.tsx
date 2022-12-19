import React, { useEffect, useRef, useState } from 'react';
import Reply from './Reply/Reply/Reply';
import NestedReply from './Reply/NestedReply/NestedReply';
import WriteReply from './Reply/WriteNestedReply/WriteNestedReply';
import css from './Comment.module.scss';

export interface LoginProps {
  loginId: string | null;
}
const Comment = () => {
  const loginId: string | null = localStorage.getItem('id');

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

  return (
    <div className={css.commentContainer}>
      <h1 className={css.commentTitle}>댓글</h1>
      <div className={css.gridContainer}>
        <Reply loginId={loginId} />
        <NestedReply />
        <WriteReply />
        <div className={css.gridItem}>
          <div className={css.commentWriterInfo}>
            <p className={css.writerName}>작성자4</p>
            <p className={css.commentDate}>2022년 12월 12일 오후 11:30</p>
          </div>
          <textarea
            className={`${css.commentContent} ${css.secreatAlertMessage}`}
            defaultValue="비밀 댓글은 댓글 작성자와 본문 작성자만 볼 수 있습니다."
            disabled
          />
        </div>
        <div>페이지네이션~</div>
        <div className={`${css.gridItem} ${css.mainReply}`}>
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
