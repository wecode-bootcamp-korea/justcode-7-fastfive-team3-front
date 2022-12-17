import React from 'react';
import css from './PostWriteDiv.module.scss';

const PostWriteDiv = () => {
  type divType = {
    id: number;
    classname: string;
    subheading: string;
    placeholder: string;
  };
  const divArray: divType[] = [
    {
      id: 1,
      classname: css.companyIntroduce,
      subheading: '회사 소개 *',
      placeholder: '100자 이내로 간단하게 설명해주세요.',
    },
    {
      id: 2,
      classname: css.companyUrl,
      subheading: '홈페이지',
      placeholder: '우리회사의 홈페이지 주소를 알려주세요.',
    },
    {
      id: 3,
      classname: css.mainWorkingFild,
      subheading: '주력 업무 분야 *',
      placeholder:
        '5개 이하의 주요 업무를 쉼표로 구분하여 입력해주세요. ex) 디지털 마케팅, 콘텐츠 제작, 영상 제작',
    },
    {
      id: 4,
      classname: css.detailIntroduce,
      subheading: '자세한 소개 및 업무 레퍼런스',
      placeholder:
        '우리 회사 소개, 패스트파이브 멤버들과 협업하고 싶은 프로젝트, 지금까지의 업무 레퍼런스 등 자세한 내용을 공유해주세요.',
    },
    {
      id: 5,
      classname: css.membership,
      subheading: '패스트파이브 멤버 혜택',
      placeholder:
        '패스트파이브 멤버에게만 제공되는 혜택이 있다면 알려주세요.\n ex) 패스트파이브 멤버 컨택 시 견적의 10% 할인 제공',
    },
    {
      id: 6,
      classname: css.ceoInfo,
      subheading: '대표 연락처 *',
      placeholder:
        '업무상 컨택이 가능한 연락처를 알려주세요. ex) sample@fastfive.co.kr, 010-1234-1234',
    },
  ];

  return (
    <>
      {divArray.map(div => {
        return (
          <div className={div.classname}>
            <div className={css.subHeading}>{div.subheading}</div>
            {div.id == 1 || div.id == 4 || div.id == 5 ? (
              <textarea placeholder={div.placeholder}></textarea>
            ) : (
              <input type="text" placeholder={div.placeholder} />
            )}
          </div>
        );
      })}
    </>
  );
};

export default PostWriteDiv;
