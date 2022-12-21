import React, { Fragment, useEffect, useState } from 'react';
import { PropsType, ReplyType, CommentType } from '../Comment';
import Reply from '../Reply/Reply/Reply';
import NestedReply from '../Reply/NestedReply/NestedReply';
import css from './CommentList.module.scss';
import WriteNestedReply from '../Reply/WriteNestedReply/WriteNestedReply';
export interface ReplyProps {
  loginId: string | null | number;
  setShowWriteTextarea: Function;
  showWriteTextarea: boolean;
  commentInfo: CommentType;
  setTotalPages: Function;
  setParentId: Function;
}

export interface NestedReplyProps {
  loginId: string | null | number;
  reply: ReplyType;
}
const CommentList: React.FC<PropsType> = ({
  comment,
  setTotalPages,
  setComments,
}) => {
  const [nestedReplyList, setNestedReplyList] = useState<ReplyType[]>([]);
  const [parentId, setParentId] = useState(0);
  console.log(parentId);
  const isFake = comment.is_fake;
  useEffect(() => {
    setNestedReplyList(comment.reply);
  }, []);
  const loginId: string | null | number = localStorage.getItem('id');
  const [showWriteTextarea, setShowWriteTextarea] = useState(false);
  const returnReply = () => {
    if (isFake === undefined) {
      return (
        <Reply
          loginId={Number(loginId)}
          setShowWriteTextarea={setShowWriteTextarea}
          showWriteTextarea={showWriteTextarea}
          commentInfo={comment}
          setTotalPages={setTotalPages}
          setParentId={setParentId}
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
        <WriteNestedReply
          comment={comment}
          showWriteTextarea={showWriteTextarea}
          setTotalPages={setTotalPages}
          parentId={parentId}
          setComments={setComments}
        />
      )}
    </Fragment>
  );
};

export default CommentList;
