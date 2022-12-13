import React from 'react';
import css from './PostWrite.module.scss';

const PostWrite = () => {
  const categoryValueArray = [
    { id: 1, value: 'IT' },
    { id: 2, value: '광고·마케팅' },
    { id: 3, value: '콘텐츠' },
    { id: 4, value: '개발' },
    { id: 5, value: '디자인' },
    { id: 6, value: '기획·컨설팅' },
    { id: 7, value: '법률' },
    { id: 8, value: '세무회계' },
    { id: 9, value: '교육' },
    { id: 10, value: '금융' },
    { id: 11, value: '그외1' },
    { id: 12, value: '그외2' },
  ];

  const detailValueArray = [
    { id: 1, value: '예시1' },
    { id: 2, value: '예시2' },
    { id: 3, value: '예시3' },
    { id: 4, value: '예시4' },
    { id: 5, value: '예시5' },
    { id: 6, value: '예시6' },
  ];

  return (
    <div className={css.outWrapper}>
      <div className={css.titleWrapper}>
        <div className={css.title}>우리 회사 소개하기</div>
        <div className={css.autoSaveNoti}>
          우측*표시는 필수작성 항목입니다.
          <br />
          2021.10.13 18시 32분에 자동 저장되었습니다.
        </div>
      </div>
      <div className={css.contentWrapper}>
        <div className={css.typeOfBusinessWrapper}>
          <div className={css.subHeading}>업종*</div>
          <select className={css.categorySelect} name="카테고리" id="">
            {categoryValueArray.map(category => {
              return (
                <>
                  key={category.id} value={category.value}
                  <option>{category.value}</option>
                </>
              );
            })}
          </select>
          <select className={css.detailSelect} name="상세" id="">
            {detailValueArray.map(detail => {
              return (
                <>
                  key={detail.id} value={detail.value}
                  <option>{detail.value}</option>
                </>
              );
            })}
          </select>
        </div>
        <div className={css.companyNameWrapper}>
          <div className={css.subHeading}>회사 이름*</div>
          <input type="text" />
        </div>
        <div className={css.companyLogoWrapper}>
          <div className={css.subHeading}>회사 로고 or 대표 이미지*</div>
          <input type="file" />
        </div>
        <div className={css.companyIntroduce}>
          <div className={css.subHeading}>회사 소개*</div>
          <input
            type="text"
            placeholder="100자 이내로 간단하게 설명해주세요."
          />
        </div>
      </div>
    </div>
  );
};

export default PostWrite;
