import { text } from 'node:stream/consumers';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import css from './Comment.module.scss';

const Comment = () => {
  //글자 수
  const [replyTextLength, setReplyTextLength] = useState(0);
  const [replyMainTextLength, setReplyMainTextLength] = useState(0);

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
  //답글 비밀 여부
  const [isSecret, setIsSecret] = useState(false);
  const setSecret = () => {
    setIsSecret(!isSecret);
  };

  //rnk : 0이면 일반댓글
  //rnk : 1이면 일반댓글

  //답글 등록 버튼 활성화 여부
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
        <div className={css.gridItem}>
          <div className={css.commentWriterInfo}>
            <p className={css.writerName}>작성자1</p>
            <p className={css.commentDate}>2022년 12월 12일 오후 11:30</p>
          </div>
          <textarea
            className={css.commentContent}
            disabled
            rows={1}
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
            disabled={isMyTextarea}
            ref={myTextarea}
            rows={1}
            defaultValue={'사실 수정 삭제가 가능한 댓글이죠...'}
          />
          {isMyTextarea ? (
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
          ) : (
            <button className={css.setModify}>수정하기</button>
          )}
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
              className={isSecret ? css.lock : css.unlock}
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
