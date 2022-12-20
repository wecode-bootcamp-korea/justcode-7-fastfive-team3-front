import React, { useEffect, useRef, useState } from 'react';
import css from './WriteNestedReply.module.scss';

interface TextareaType {
  showWriteTextarea: boolean;
}

const WriteNestedReply: React.FC<TextareaType> = ({ showWriteTextarea }) => {
  const [replyTextLength, setReplyTextLength] = useState(0);
  //답글 비밀 여부
  const [isSecret, setIsSecret] = useState(false);
  const textareaDOM = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    textareaDOM.current?.focus();
  }, [showWriteTextarea]);
  const setSecret = () => {
    setIsSecret(!isSecret);
  };

  //등록 버튼 활성화 여부
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
    <div className={`${css.writeReplyContainer} ${css.reply}`}>
      <textarea
        className={css.writeCommentContent}
        placeholder="위 멤버에게 궁금한 점이나 제안하고 싶은 내용을 댓글로 남겨보세요."
        ref={textareaDOM}
        rows={1}
        onInput={handleResizeHeight}
      />
      <div className={css.writeCountAndsend}>
        <span className={css.count}>{replyTextLength}</span>/1000
        <div className={isSecret ? css.lock : css.unlock} onClick={setSecret} />
        <button
          className={isDisable ? css.notSendReply : css.sendReply}
          disabled={isDisable}
        >
          등록
        </button>
      </div>
    </div>
  );
};

export default WriteNestedReply;
