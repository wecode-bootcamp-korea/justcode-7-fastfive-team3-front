import React, { Fragment, useEffect, useState } from 'react';
import { PropsType, ReplyType, CommentType } from '../Comment';
import {} from '../Comment';
import Reply from '../Reply/Reply/Reply';
import NestedReply from '../Reply/NestedReply/NestedReply';
import css from './CommentList.module.scss';
import WriteNestedReply from '../Reply/WriteNestedReply/WriteNestedReply';
export interface ReplyProps {
  loginId: string | null | number;
  setShowWriteTextarea: Function;
  showWriteTextarea: boolean;
  commentInfo: CommentType;
}

export interface NestedReplyProps {
  reply: ReplyType;
}
const CommentList: React.FC<PropsType> = ({ comment }) => {
  const [nestedReplyList, setNestedReplyList] = useState<ReplyType[]>([]);
  useEffect(() => {
    setNestedReplyList(comment.reply);
  }, []);
  const loginId: string | null = localStorage.getItem('id');
  const [showWriteTextarea, setShowWriteTextarea] = useState(false);
  return (
    <Fragment>
      <div className={css.commentList}>
        {comment && (
          <Reply
            loginId={loginId}
            setShowWriteTextarea={setShowWriteTextarea}
            showWriteTextarea={showWriteTextarea}
            commentInfo={comment}
          />
        )}
        {comment.rnk !== 0 &&
          nestedReplyList.map(reply => {
            return <NestedReply reply={reply} key={reply.reply_id} />;
          })}
      </div>
      {showWriteTextarea && <WriteNestedReply />}
    </Fragment>
  );
};

export default CommentList;
