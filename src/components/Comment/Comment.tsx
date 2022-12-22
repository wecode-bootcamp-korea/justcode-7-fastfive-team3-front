import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Pagination } from '@mui/material';
import CommentList from './CommentList/CommentList';
import css from './Comment.module.scss';

export interface ReplyType {
  reply_id: number;
  feed_id: number;
  feed_user_id: number;
  is_private: boolean;
  is_deleted: boolean;
  comment: string;
  parent_reply_id: number;
  parent_user_id: number | null;
  reply_group: number;
  rnk: number;
  reply_user_id: number;
  company_name: string;
  nickname: string;
  email: string;
  position_name: string;
  is_admin: number;
  created_at: string;
}
export interface CommentType {
  reply_id: number;
  feed_id: number;
  feed_user_id: number;
  is_private: boolean;
  is_deleted: boolean;
  is_fake: boolean;
  comment: string;
  parent_reply_id: number;
  parent_user_id: number | null;
  reply_group: number;
  rnk: number;
  reply_user_id: number;
  company_name: string;
  nickname: string;
  email: string;
  position_name: string;
  is_admin: number;
  created_at: string;
  reply: Array<ReplyType>;
}
export interface PropsType {
  comment: CommentType;
  setTotalPages: Function;
  setComments: Function;
}
const Comment = () => {
  const URI = process.env.REACT_APP_BASE_URL;
  //메인 댓글 실시간 내용
  const [mainCommentText, setMainCommentText] = useState('');
  //글자 수
  const [replyMainTextLength, setReplyMainTextLength] = useState(0);
  //메인 비밀 여부
  const [isMainSecret, setMainIsSecret] = useState(false);
  //메인 등록 버튼 활성화 여부
  const [isMainDisable, setIsMainDisable] = useState(true);
  //메인 글자수 제한
  const [isDisableWrite, setIsDisableWrite] = useState(false);
  //페이지네이션-MUI
  const [currPage, setCurrPage] = useState('');
  //전체 페이지 수
  const [totalPages, setTotalPages] = useState(0);
  //댓글 전체 데이터
  const [comments, setComments] = useState<CommentType[]>([]);

  const params = useParams();
  let postId = params.id;

  //댓글 데이터 불러오기
  const token: string | null = localStorage.getItem('token');
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');
  if (token) {
    requestHeaders.set('Authorization', token);
  }
  useEffect(() => {
    fetch(`http://` + URI + `:8000/reply/${postId}?page=${currPage}`, {
      method: 'GET',
      headers: requestHeaders,
    })
      .then(response => response.json())
      .then(json => {
        setTotalPages(Number(json.replyPageCnt));
        setComments(json.result);
      });
  }, [currPage]);

  const mainTextareaDOM = useRef<HTMLTextAreaElement>(null);
  let mainTextareaValue = mainTextareaDOM.current?.value;

  useEffect(() => {
    if (mainTextareaValue) {
      setIsMainDisable(false);
    } else {
      setIsMainDisable(true);
    }
  }, [mainTextareaValue]);

  useEffect(() => {
    if (replyMainTextLength == 1000) {
      setIsDisableWrite(true);
      setIsMainDisable(true);
    } else {
      setIsDisableWrite(false);
    }
  }, [replyMainTextLength]);

  const setMainSecret = () => {
    setMainIsSecret(!isMainSecret);
  };

  const handleMainResizeHeight = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    //textarea 내용에 따른 높이 변경
    e.target.style.height = '1px';
    e.target.style.height = e.target.scrollHeight + 'px';
    //글자수 count
    const currentTextareaText = e.target.value;
    setMainCommentText(currentTextareaText);
    if (currentTextareaText) {
      setReplyMainTextLength(currentTextareaText.length);
    } else if (!currentTextareaText) {
      setReplyMainTextLength(0);
    }
  };

  const handlePagination = (e: React.ChangeEvent<any>) => {
    setCurrPage(e.target.textContent);
  };

  console.log(postId);
  console.log(mainCommentText);
  console.log(isMainSecret);

  const uploadComment = () => {
    fetch('http://' + URI + ':8000/reply', {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify({
        feed_id: postId,
        comment: mainCommentText,
        is_private: isMainSecret,
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.createdNewComment) {
          setTotalPages(Number(json.result.replyPageCnt));
          setComments(json.result.result);
          alert('댓글 등록이 완료되었습니다.');
          if (mainTextareaDOM.current?.value) {
            mainTextareaDOM.current.value = '';
            setReplyMainTextLength(0);
          }
        } else if (json.message.includes('ADMIN_ONLY')) {
          alert('권한이 없습니다.');
        } else {
          alert('다시 시도해주세요.');
        }
      });
  };

  return (
    <div className={css.commentContainer}>
      <h1 className={css.commentTitle}>댓글</h1>
      <div className={css.gridContainer}>
        {comments.map(comment => {
          return (
            <CommentList
              comment={comment}
              key={comment.reply_id}
              setTotalPages={setTotalPages}
              setComments={setComments}
            />
          );
        })}
        <div className={css.pagenation}>
          {totalPages !== 0 && (
            <Pagination count={totalPages} onChange={handlePagination} />
          )}
        </div>
        <div
          className={`${css.gridItem} ${css.mainReply}`}
          onClick={e => e.preventDefault()}
        >
          <textarea
            className={css.commentContent}
            placeholder="위 멤버에게 궁금한 점이나 제안하고 싶은 내용을 댓글로 남겨보세요."
            ref={mainTextareaDOM}
            rows={1}
            onInput={handleMainResizeHeight}
            maxLength={1000}
          />
          <div className={css.countAndsend}>
            <span className={isDisableWrite ? css.stopCount : css.count}>
              {replyMainTextLength}
            </span>
            /1000
            <div
              className={isMainSecret ? css.lock : css.unlock}
              onClick={setMainSecret}
            />
            <button
              className={isMainDisable ? css.notSendReply : css.sendReply}
              disabled={isMainDisable}
              onClick={uploadComment}
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
