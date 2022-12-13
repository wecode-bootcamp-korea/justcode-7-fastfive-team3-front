import React from 'react';
import './PostWrite.module.scss';

const PostWrite = () => {
  // const categoryValue = [{
  //   value: "IT",
  //   value: "IT",
  //   value: "IT",
  //   value: "IT",
  //   value: "IT",
  //   value: "IT",
  // }]

  return (
    <div>
      <div>
        <div>우리 회사 소개하기</div>
        <div>
          우측*표시는 필수작성 항목입니다.
          <br />
          2021.10.13 18시 32분에 자동 저장되었습니다.
        </div>
      </div>
      <div>
        <div>
          <div>업종*</div>
          <select name="카테고리" id="">
            <option value="IT"></option>
            <option value="광고·마케팅"></option>
            <option value="콘텐츠"></option>
            <option value="개발"></option>
            <option value="디자인"></option>
            <option value="기획·컨설팅"></option>
            <option value="법률"></option>
            <option value="세무회계"></option>
            <option value="교육"></option>
            <option value="금융"></option>
            <option value="그외1"></option>
            <option value="그외2"></option>
          </select>
          <select name="상세" id="">
            <option value="예시1"></option>
            <option value="예시2"></option>
            <option value="예시3"></option>
            <option value="예시4"></option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PostWrite;
