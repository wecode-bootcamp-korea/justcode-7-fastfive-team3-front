import React from 'react';
import './PostWritePage.module.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SideBar from '../../components/SideBar/SideBar';
import PostWriteDiv from '../../components/PostWriteDiv/PostWriteDiv';
import css from './PostWritePage.module.scss';

const PostWritePage = () => {
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
    <>
      <Header />
      <div className={css.pageWrapper}>
        <SideBar />
        <div className={css.footerWrapper}>
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
                <select className={css.categorySelect}>
                  <option value="none">카테고리</option>
                  {categoryValueArray.map(category => {
                    return (
                      <>
                        key={category.id} value={category.value}
                        <option>{category.value}</option>
                      </>
                    );
                  })}
                </select>
                <select className={css.detailSelect}>
                  <option value="none">상세</option>
                  {detailValueArray.map(detail => {
                    return (
                      <>
                        key={detail.id}
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
                <div className={css.subHeading}>회사 로고 or 대표 이미지 *</div>
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
              <PostWriteDiv />
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
                        key={branch.id}
                        <option>{branch.branch}</option>
                      </>
                    );
                  })}
                </select>
              </div>
              <div className={css.agreeWrapper}>
                <input type="checkbox" />
                <div className={css.agreeContent}>
                  패스트파이브
                  <span className={css.underline}> 서비스 이용약관</span>에
                  동의하십니까? (필수)
                </div>
              </div>
              <section className={css.btnWrapper}>
                <div className={css.btnInnerWrapper}>
                  <button className={css.btn}>미리보기</button>
                  <button className={css.btn}>등록하기</button>
                </div>
                <button className={css.resetBtn}>취소</button>
              </section>
            </section>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default PostWritePage;
