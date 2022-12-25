import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import css from './WriteNestedReply.module.scss';

interface TextareaType {
  showWriteTextarea: boolean;
  setTotalPages: Function;
  parentId: number;
  setComments: Function;
}

const WriteNestedReply: React.FC<TextareaType> = ({
  showWriteTextarea,
  setTotalPages,
  parentId,
  setComments,
}) => {
  const URI = process.env.REACT_APP_BACK_URL;
  const PORT = process.env.REACT_APP_BACK_DEFAULT_PORT;
  const [replyTextLength, setReplyTextLength] = useState(0);
  const [isSecret, setIsSecret] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const textareaDOM = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    textareaDOM.current?.focus();
  }, [showWriteTextarea]);
  const setSecret = () => {
    setIsSecret(!isSecret);
  };

  //등록 버튼 활성화 여부
  const textareaValue = textareaDOM.current?.value;

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
  const token: string | null = localStorage.getItem('token');
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');
  if (token) {
    requestHeaders.set('Authorization', token);
  }
  const params = useParams();
  let postId = params.id;

  const uploadReply = () => {
    fetch('http://' + URI + ':' + PORT + '/reply', {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify({
        feed_id: postId,
        comment: textareaValue,
        is_private: isSecret,
        parent_reply_id: parentId,
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.createdNewComment) {
          setTotalPages(Number(json.result.replyPageCnt));
          setComments(json.result.result);
          alert('답글 등록이 완료되었습니다.');
          if (textareaDOM.current?.value) {
            textareaDOM.current.value = '';
            setReplyTextLength(0);
          }
          window.location.reload();
        } else if (json.message.includes('ADMIN_ONLY')) {
          alert('권한이 없습니다.');
        } else {
          alert('다시 시도해주세요.');
        }
      });
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
          onClick={uploadReply}
        >
          등록
        </button>
      </div>
    </div>
  );
};

export default WriteNestedReply;
