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
  loginId: string | null | number;
  reply: ReplyType;
}
const CommentList: React.FC<PropsType> = ({ comment }) => {
  const [nestedReplyList, setNestedReplyList] = useState<ReplyType[]>([]);
  const [isFake, setIsFake] = useState(false);
  useEffect(() => {
    setNestedReplyList(comment.reply);
    setIsFake(comment.is_fake);
  }, []);
  const loginId: string | null | number = localStorage.getItem('id');
  const [showWriteTextarea, setShowWriteTextarea] = useState(false);

  const returnReply = () => {
    if (comment) {
      return (
        <Reply
          loginId={Number(loginId)}
          setShowWriteTextarea={setShowWriteTextarea}
          showWriteTextarea={showWriteTextarea}
          commentInfo={comment}
        />
      );
    }
  };

  return (
    <Fragment>
      <div className={css.commentList}>
        {returnReply()}
        {comment.rnk !== 0 &&
          nestedReplyList.map(reply => {
            return (
              <NestedReply
                loginId={Number(loginId)}
                reply={reply}
                key={reply.reply_id}
              />
            );
          })}
      </div>
      {showWriteTextarea && (
        <WriteNestedReply showWriteTextarea={showWriteTextarea} />
      )}
    </Fragment>
  );
};

export default CommentList;
