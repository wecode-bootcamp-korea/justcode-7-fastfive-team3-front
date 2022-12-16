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

  const branchArray = [
    { id: 1, branch: '강남1호점' },
    { id: 2, branch: '강남2호점' },
    { id: 3, branch: '강남3호점' },
    { id: 4, branch: '강남4호점' },
    { id: 5, branch: '강남5호점' },
    { id: 6, branch: '광화문점' },
    { id: 7, branch: '교대점' },
    { id: 8, branch: '구로1호점' },
    { id: 9, branch: '명동1호점' },
    { id: 10, branch: '삼성1호점' },
    { id: 11, branch: '삼성2호점' },
    { id: 12, branch: '삼성3호점' },
    { id: 13, branch: '삼성4호점' },
    { id: 14, branch: '서울숲점' },
    { id: 15, branch: '서초점' },
    { id: 16, branch: '선릉1호점' },
    { id: 17, branch: '선릉2호점' },
    { id: 18, branch: '선정릉점' },
    { id: 19, branch: '성수점' },
    { id: 20, branch: '시청1호점' },
    { id: 21, branch: '시청2호점' },
    { id: 22, branch: '신논현1호점' },
    { id: 23, branch: '신사점' },
    { id: 24, branch: '여의도점' },
    { id: 25, branch: '역삼1호점' },
    { id: 26, branch: '역삼2호점' },
    { id: 27, branch: '역삼3호점' },
    { id: 28, branch: '역삼4호점' },
    { id: 29, branch: '영등포점' },
    { id: 30, branch: '용산1호점' },
    { id: 31, branch: '을지로점' },
    { id: 32, branch: '합정점' },
    { id: 33, branch: '홍대1호점' },
    { id: 34, branch: '홍대2호점' },
  ];

  return (
    <div className={css.outWrapper}>
      <section className={css.titleWrapper}>
        <div className={css.title}>우리 회사 소개하기</div>
        <div className={css.autoSaveNoti}>
          우측*표시는 필수작성 항목입니다.
          <br />
          2021.10.13 18시 32분에 자동 저장되었습니다.
        </div>
      </section>
      <section className={css.contentWrapper}>
        <div className={css.typeOfBusinessWrapper}>
          <div className={css.subHeading}>업종 *</div>
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
          <div className={css.subHeading}>회사 이름 *</div>
          <input type="text" />
        </div>
        <div className={css.companyLogoWrapper}>
          <div className={css.subHeading}>회사 로고 or 대표 이미지*</div>
          <div className={css.logoUploadWrapper}>
            <div className={css.imgWrapper}>
              <input type="file" />
              <img src="" alt="" />
            </div>
            <div className={css.logoSizeNoti}>
              10mb 이하의 jpg, png 파일을 선택해주세요.
            </div>
          </div>
        </div>
        <div className={css.companyIntroduce}>
          <div className={css.subHeading}>회사 소개 *</div>
          <input
            type="text"
            placeholder="100자 이내로 간단하게 설명해주세요."
          />
        </div>
        <div className={css.companyUrl}>
          <div className={css.subHeading}>홈페이지</div>
          <input
            type="text"
            placeholder="우리회사의 홈페이지 주소를 알려주세요."
          />
        </div>
        <div className={css.mainWorkingFild}>
          <div className={css.subHeading}>주력 업무 분야 *</div>
          <input
            type="text"
            placeholder="5개 이하의 주요 업무를 쉼표로 구분하여 입력해주세요. ex) 디지털 마케팅, 콘텐츠 제작, 영상 제작"
          />
        </div>
        <div className={css.detailIntroduce}>
          <div className={css.subHeading}>자세한 소개 및 업무 레퍼런스</div>
          <input
            type="text"
            placeholder="우리 회사 소개, 패스트파이브 멤버들과 협업하고 싶은 프로젝트, 지금까지의 업무 레퍼런스 등\n자세한 내용을 공유해주세요."
          />
        </div>
        <div className={css.membership}>
          <div className={css.subHeading}>패스트파이브 멤버 혜택</div>
          <input
            type="text"
            placeholder="패스트파이브 멤버에게만 제공되는 혜택이 있다면 알려주세요.\n ex) 패스트파이브 멤버 컨택 시 견적의 10% 할인 제공"
          />
        </div>
        <div className={css.ceoInfo}>
          <div className={css.subHeading}>대표 연락처 *</div>
          <input
            type="text"
            placeholder="업무상 컨택이 가능한 연락처를 알려주세요. ex) sample@fastfive.co.kr, 010-1234-1234"
          />
        </div>
        <div className={css.companyIntroduceFile}>
          <div className={css.subHeading}>회사 소개서</div>
          <div className={css.fileUploadWrapper}>
            <input type="file" />
            <div className={css.fileSizeNoti}>
              30mb 이하의 pdf, jpg, png 파일을 선택해주세요.
            </div>
          </div>
        </div>
        <div className={css.usingBranch}>
          <div className={css.subHeading}>이용중인 지점 *</div>
          <select className={css.categorySelect} name="지점명" id="">
            {branchArray.map(branch => {
              return (
                <>
                  key={branch.id} value={branch.branch}
                  <option>{branch.branch}</option>
                </>
              );
            })}
          </select>
        </div>
        <div className={css.agreeWrapper}>
          <input type="checkbox" />
          <div className={css.agreeContent}>
            패스트파이브 서비스 이용약관에 동의하십니까? (필수)
          </div>
        </div>
        <section className={css.btnWrapper}>
          <button className={css.btn}>미리보기</button>
          <button className={css.btn}>등록하기</button>
          <button className={css.resetBtn}>취소</button>
        </section>
      </section>
    </div>
  );
};

export default PostWrite;
