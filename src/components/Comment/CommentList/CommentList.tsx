import React, { Fragment, useState } from 'react';
import Reply from '../Reply/Reply/Reply';
import NestedReply from '../Reply/NestedReply/NestedReply';
import css from './CommentList.module.scss';
import WriteNestedReply from '../Reply/WriteNestedReply/WriteNestedReply';
export interface LoginProps {
  loginId: string | null;
  setShowWriteTextarea: Function;
  showWriteTextarea: boolean;
}
const CommentList = () => {
  const loginId: string | null = localStorage.getItem('id');
  const [showWriteTextarea, setShowWriteTextarea] = useState(false);
  return (
    <Fragment>
      <div className={css.commentList}>
        <Reply
          loginId={loginId}
          setShowWriteTextarea={setShowWriteTextarea}
          showWriteTextarea={showWriteTextarea}
        />
        <NestedReply />
      </div>
      {showWriteTextarea && <WriteNestedReply />}
    </Fragment>
  );
};

export default CommentList;
