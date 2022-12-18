import { text } from 'node:stream/consumers';
import React, { useEffect, useRef, useState } from 'react';
import css from './Comment.module.scss';

const Comment = () => {
  //글자 수
  const [replyTextLength, setReplyTextLength] = useState(0);

  //textarea 처음에 비활성화 -> 수정 클릭 시 활성화

  //비밀 여부
  const [isSecret, setIsSecret] = useState(false);
  const setSecret = () => {
    setIsSecret(!isSecret);
  };

  //등록 버튼 활성화 여부
  const textareaDOM = useRef<HTMLTextAreaElement>(null);
  const textareaValue = textareaDOM.current?.value;
  const [isDisable, setIsDisable] = useState(true);
  useEffect(() => {
    if (textareaValue) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [textareaValue]);

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

  return (
    <div className={css.commentContainer}>
      <h1 className={css.commentTitle}>댓글</h1>
      <div className={css.gridContainer}>
        <div className={css.gridItem}>
          <div className={css.commentWriterInfo}>
            <p className={css.writerName}>작성자1</p>
            <p className={css.commentDate}>2022년 12월 12일 오후 11:30</p>
          </div>
          <textarea
            className={css.commentContent}
            disabled
            defaultValue={'저는 공개되어있는 댓글입니다..'}
          />
          <button className={css.newReply}>답글 달기</button>
        </div>

        <div className={css.gridItem}>
          <div className={css.commentWriterInfo}>
            <p className={css.writerName}>접니다</p>
            <p className={css.commentDate}>2022년 12월 13일 오후 11:30</p>
          </div>
          <textarea
            className={css.commentContent}
            disabled
            defaultValue={'사실 수정 삭제가 가능한 댓글이죠...'}
          />
          <div className={css.modifyAndDelete}>
            <button className={css.modify}>수정</button>
            <div className={css.centerBar} />
            <button className={css.delete}>삭제</button>
          </div>
          <button className={css.newReply}>답글 달기</button>
        </div>

        <div className={`${css.gridItem} ${css.reply}`}>
          <div className={css.commentWriterInfo}>
            <p className={css.writerName}>작성자3</p>
            <p className={css.commentDate}>2022년 12월 12일 오후 11:30</p>
          </div>
          <textarea
            className={css.commentContent}
            disabled
            defaultValue={
              '안녕! 내 이름은 대댓글. 댓글다는 사람이죠. 댓글은 언제나 하나! 안녕! 내 이름은 대댓글. 댓글다는 사람이죠. 댓글은 언제나 하나! 안녕! 내 이름은 대댓글. 댓글다는 사람이죠. 댓글은 언제나 하나! 안녕! 내 이름은 대댓글. 댓글다는 사람이죠. 댓글은 언제나 하나! 안녕! 내 이름은 대댓글. 댓글다는 사람이죠. 댓글은 언제나 하나! 안녕! 내 이름은 대댓글. 댓글다는 사람이죠. 댓글은 언제나 하나!'
            }
            rows={1}
          />
          <button className={css.newReply}>답글 달기</button>
        </div>

        <div className={`${css.gridItem} ${css.reply}`}>
          <textarea
            className={css.commentContent}
            placeholder="위 멤버에게 궁금한 점이나 제안하고 싶은 내용을 댓글로 남겨보세요."
            ref={textareaDOM}
            rows={1}
            onInput={handleResizeHeight}
          />
          <div className={css.countAndsend}>
            <span className={css.count}>{replyTextLength}</span>/1000
            <div
              className={isSecret ? css.unlock : css.lock}
              onClick={setSecret}
            />
            <button
              className={isDisable ? css.notSendReply : css.sendReply}
              disabled={isDisable}
            >
              등록
            </button>
          </div>
        </div>

        <div className={css.gridItem}>
          <div className={css.commentWriterInfo}>
            <p className={css.writerName}>작성자4</p>
            <p className={css.commentDate}>2022년 12월 12일 오후 11:30</p>
          </div>
          <textarea
            className={`${css.commentContent} ${css.secreatAlertMessage}`}
            defaultValue={
              '비밀 댓글은 댓글 작성자와 본문 작성자만 볼 수 있습니다.'
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Comment;
