import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PostWritePage.module.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SideBar from '../../components/SideBar/SideBar';
import css from './PostWritePage.module.scss';

const PostWritePage = () => {
  const navigate = useNavigate();
  const focusRef = useRef<HTMLInputElement | null>(null);
  const focusTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [categoryEssentielCheck, setCategoryEssentielCheck] =
    useState<boolean>(false); //카테고리 필수 체크
  const [detailCategoryEssentielCheck, setDetailCategoryEssentielCheck] =
    useState<boolean>(false); //상세 카테고리 필수 체크
  const [branchEssentielCheck, setBranchEssentielCheck] =
    useState<boolean>(false); //지점 카테고리 필수 체크
  const [categoryArray, setCategoryArray] = useState<any[]>([]); //카테고리 배열
  const [detailCategoryArray, setDetailCategoryArray] = useState<any[]>([]); //상세 카테고리 배열

  const [categoryID, setCategoryID] = useState<string | number>(); //카테고리 아이디
  const [detailCategoryID, setDetailCategoryID] = useState<string | number>(); //상세 카테고리 아이디
  const [companyName, setCompanyName] = useState<boolean>(false); //회사이름
  const [companyLogo, setCompanyLogo] = useState<boolean>(); //회사로고 파일
  const [companyIntroduce, setCompanyIntroduce] = useState<boolean>(false); //회사소개
  const [homepage, setHomepage] = useState<string>(); //홈페이지 주소
  const [fiveLimit, setFiveLimit] = useState<string | boolean>(false); //,5개(주력 업무 분야)
  const [contact, setContact] = useState<string | boolean>(false); //ceo연락처
  const [branchArray, setBranchArray] = useState<any[]>([]); //지점 배열

  const [companyNames, setCompanyNames] = useState<string>(''); //회사이름 fetched
  const [companyLogoFetched, setCompanyLogoFetched] = useState<any>(); //회사로고 파일 fetched
  const [companyIntroduceFetched, setCompanyIntroduceFetched] =
    useState<string>(''); //회사소개 fetched
  const [mainFiled, setMainFiled] = useState<string>(''); //주력 업무 분야 fetched
  const [detailCompanyIntro, setDetailCompanyIntro] = useState<string>(); //자세한 소개 및 업무레퍼런스 fetched
  const [membership, setMembership] = useState<string>(); //멤버 혜택 fetched
  const [ceoContact, setCeoContact] = useState<string>(''); //ceo연락처fetched
  const [companyIntroFile, setCompanyIntroFile] = useState<any>(); //회사소개 파일 fetched
  const [branch, setBranch] = useState<string>(''); //지점 fetched

  const [agreeCheckBox, setAgreeCheckBox] = useState<boolean | undefined>(
    false
  );
  const [companyIntroduceTextLength, setCompanyIntroduceTextLength] = useState<
    number | undefined
  >(0);
  const [referenceTextLength, setReferenceTextLength] = useState<
    number | undefined
  >(0);
  const [membershipTextLength, setMembershipTextLength] = useState<
    number | undefined
  >(0);

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');
  requestHeaders.set(
    'Authorization',
    localStorage?.getItem('Authorization') || ''
  );

  const requestHeaderFormData: HeadersInit = new Headers();
  requestHeaderFormData.set('Content-Type', 'multipart/form-data');
  requestHeaderFormData.set(
    'Authorization',
    localStorage?.getItem('Authorization') || ''
  );

  console.log('카테고리', categoryArray);

  //작성 게시글 불러오기 GET
  useEffect(() => {
    fetch('http://localhost:8000/feed/posting', {
      headers: requestHeaders,
    })
      .then(res => res.json())
      .then(res => {
        setDetailCategoryID(res[0].category_id);
        setCategoryID(res[0].parent_category_id);
        setCompanyNames(res[0].title);
        companyLogoFetched(res[0].logo_img);
        setCompanyIntroduceFetched(res[0].introduction);
        setHomepage(res[0].website_url);
        setMainFiled(res[0].main_field[0].main_field);
        setDetailCompanyIntro(res[0].detail_introduction);
        setMembership(res[0].member_benefit);
        setCeoContact(res[0].contact);
        setCompanyIntroFile(res[0].file_name);
        setBranch(res[0].branch_name);
      });
  }, []);

  //default 회사이름 GET
  useEffect(() => {
    fetch('http://localhost:8000/user/checkauth', {
      headers: requestHeaders,
    })
      .then(res => res.json())
      .then(res => {
        setCompanyName(res.company_name);
      });
  }, []);

  //게시글 수정/등록 PUT
  const clikUpload = () => {
    if (
      categoryEssentielCheck === true &&
      companyName === true &&
      companyLogo === true &&
      companyIntroduce === true &&
      fiveLimit === true &&
      contact === true &&
      agreeCheckBox === true &&
      branchEssentielCheck === true
    ) {
      if (
        detailCategoryArray.length !== 0 &&
        detailCategoryEssentielCheck === true
      ) {
        fetch('http://localhost:8000/feed/posting', {
          method: 'PUT',
          headers: requestHeaderFormData,
          body: JSON.stringify({
            categoryId: categoryID,
            title: companyName,
            file: companyLogo && companyIntroFile,
            introduction: companyIntroduce,
            hompage: homepage,
            main_field: fiveLimit,
            detail_introduction: detailCompanyIntro,
            member_benefit: membership,
            contact: contact,
            branch: branch,
          }),
        })
          .then(res => res.json())
          .then(res => {});
        alert('게시글이 등록되었습니다.');
        navigate(`/list/${categoryID}`);
      }
      if (detailCategoryArray.length == 0) {
        // Form Data
        const formData = new FormData();
        // add file/file_id if there is one
        formData.append('file', companyLogoFetched);
        formData.append('file', companyIntroFile);
        //Basic form info
        formData.append('categoryId', JSON.stringify(categoryID));
        formData.append('title', JSON.stringify(companyName));
        formData.append('hompage', JSON.stringify(homepage));
        formData.append('main_field', JSON.stringify(fiveLimit));
        formData.append('introduction', JSON.stringify(companyIntroduce));
        formData.append(
          'detail_introduction',
          JSON.stringify(detailCompanyIntro)
        );
        formData.append('member_benefit', JSON.stringify(membership));
        formData.append('contact', JSON.stringify(contact));
        formData.append('branch', JSON.stringify(branch));
        fetch('http://localhost:8000/feed/posting', {
          method: 'PUT',
          headers: requestHeaderFormData,
          body: formData,
        })
          .then(res => res.json())
          .then(res => {});
        alert('게시글이 등록되었습니다.');
        navigate(`/list/${categoryID}`);
      }
    } else if (
      categoryEssentielCheck === true &&
      companyName === true &&
      companyLogo === true &&
      companyIntroduce === true &&
      fiveLimit === true &&
      contact === true &&
      branchEssentielCheck === true &&
      agreeCheckBox === false
    ) {
      if (
        detailCategoryArray.length !== 0 &&
        detailCategoryEssentielCheck === true
      ) {
        alert('서비스 이용약관에 동의해주세요.');
      }
      if (detailCategoryArray.length == 0) {
        alert('서비스 이용약관에 동의해주세요.');
      }
    } else if (
      categoryEssentielCheck === false ||
      companyName === false ||
      companyLogo === false ||
      companyIntroduce === false ||
      fiveLimit === false ||
      contact === false ||
      agreeCheckBox === false ||
      branchEssentielCheck === false
    ) {
      if (
        detailCategoryArray.length !== 0 &&
        detailCategoryEssentielCheck === false
      ) {
        // focusRef.current.focus();
        // focusTextareaRef.current.focus();
        alert('필수정보를 입력하세요.');
      }
      if (detailCategoryArray.length == 0) {
        // focusRef.current.focus();
        // focusTextareaRef.current.focus();
        alert('필수정보를 입력하세요.');
      }
    }
  };

  //카테고리 GET
  useEffect(() => {
    fetch('http://localhost:8000/category', {
      headers: requestHeaders,
    })
      .then(res => res.json())
      .then(res => {
        console.log('res', res);
        setCategoryArray(res);
      });
  }, []);

  //지점명 GET
  useEffect(() => {
    fetch('/data/branchData.json')
      .then(res => res.json())
      .then(res => {
        setBranchArray(res);
      });
  }, []);

  //주력업무분야 글자수 카운트
  const countingMainWorkingFild = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCompanyIntroduceTextLength(e.target.value.length);
    if (e.target.value.length > 100) {
      setCompanyIntroduceTextLength(e.target.value.slice(0, 100).length);
    }
    //필수항목 체크
    if (e.target.value) {
      setCompanyIntroduce(true);
    } else {
      setCompanyIntroduce(false);
    }
  };

  const countingReferenceTextLength = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReferenceTextLength(e.target.value.length);
    if (e.target.value.length > 1000) {
      setReferenceTextLength(e.target.value.slice(0, 1000).length);
    }
  };

  const countingMembershipTextLength = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMembershipTextLength(e.target.value.length);
    if (e.target.value.length > 100) {
      setMembershipTextLength(e.target.value.slice(0, 100).length);
    }
  };

  //회사이름 필수항목 체크
  const companyNameCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setCompanyName(true);
    } else {
      setCompanyName(false);
    }
  };

  //회사로고 필수항목 체크
  const companyLogoCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setCompanyLogo(true);
    } else {
      setCompanyLogo(false);
    }
  };

  //, 5개 검사
  const fiveLimitCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 필수항목 체크
    if (e.target.value && e.target.value.split(',').length > 5) {
      setFiveLimit('over');
    } else if (e.target.value) {
      setFiveLimit(true);
    } else if (!e.target.value) {
      setFiveLimit(false);
    }
  };

  //ceo 연락처 필수항목 체크
  const essentielCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setContact(true);
    } else {
      setContact(false);
    }
  };

  //카테고리 필수항목 체크
  const categoryCheck = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      setCategoryID(e.target.value);
      setCategoryEssentielCheck(true);
    } else {
      setCategoryEssentielCheck(false);
    }
  };

  //상세 카테고리 GET
  useEffect(() => {
    fetch('http://localhost:8000/category/' + categoryID, {
      headers: requestHeaders,
    })
      .then(res => res.json())
      .then(res => {
        setDetailCategoryArray(res);
      });
  }, [categoryID]);

  //상세 카테고리 필수항목 체크
  const detailCategoryCheck = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      setDetailCategoryEssentielCheck(true);
    } else {
      setDetailCategoryEssentielCheck(false);
    }
  };

  //지점 카테고리 필수항목 체크
  const branchCheck = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      setBranchEssentielCheck(true);
    } else {
      setBranchEssentielCheck(false);
    }
  };

  //enter => <br>
  // var text = document.getElementById('textarea').value;
  // text = text.replace(/(?:\r\n|\r|\n)/g, '<br>');

  //동의 체크
  const agreeCheck = () => {
    setAgreeCheckBox(!agreeCheckBox);
  };

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
                <select className={css.categorySelect} onChange={categoryCheck}>
                  <option value="">카테고리</option>
                  {categoryID && <option defaultValue={categoryID}></option>}
                  {categoryArray.map(category => {
                    return (
                      <>
                        key={category.category_id}
                        <option value={category.category_id}>
                          {category.category}
                        </option>
                      </>
                    );
                  })}
                </select>
                {detailCategoryArray.length !== 0 && (
                  <select
                    className={css.detailSelect}
                    onChange={detailCategoryCheck}
                  >
                    <option value="">상세</option>
                    {detailCategoryID && (
                      <option defaultValue={detailCategoryID}></option>
                    )}
                    {detailCategoryArray.map(detail => {
                      return (
                        <>
                          key={detail.id}
                          <option value={detail.id}>{detail.category}</option>
                        </>
                      );
                    })}
                  </select>
                )}
              </div>
              <div className={css.companyNameWrapper}>
                <span className={css.subHeading}>회사 이름 *</span>
                {companyNames ? (
                  <input
                    type="text"
                    value={companyNames}
                    onChange={companyNameCheck}
                    ref={focusRef}
                  />
                ) : (
                  <input
                    type="text"
                    onChange={companyNameCheck}
                    ref={focusRef}
                  />
                )}
                {companyName === false && (
                  <div className={css.essentiel}>필수 작성 항목입니다.</div>
                )}
              </div>
              <div className={css.companyLogoWrapper}>
                <div className={css.subHeading}>회사 로고 or 대표 이미지 *</div>
                <div className={css.logoUploadWrapper}>
                  <div className={css.imgWrapper}>
                    {companyLogoFetched ? (
                      <input
                        type="file"
                        onChange={companyLogoCheck}
                        value={companyLogoFetched}
                      />
                    ) : (
                      <input type="file" onChange={companyLogoCheck} />
                    )}
                  </div>
                  <div className={css.logoSizeNoti}>
                    10mb 이하의 jpg, png 파일을 선택해주세요.
                  </div>
                </div>
              </div>

              <div className={css.companyIntroduce}>
                <div className={css.subHeading}>회사 소개 *</div>
                <div className={css.textAreaWrapper}>
                  {companyIntroduceFetched ? (
                    <textarea
                      id="textarea"
                      placeholder={'100자 이내로 간단하게 설명해주세요.'}
                      onChange={countingMainWorkingFild}
                      maxLength={100}
                      value={companyIntroduceFetched}
                      // ref={focusTextareaRef}
                    />
                  ) : (
                    <textarea
                      id="textarea"
                      placeholder={'100자 이내로 간단하게 설명해주세요.'}
                      onChange={countingMainWorkingFild}
                      maxLength={100}
                      // ref={focusTextareaRef}
                    />
                  )}

                  {companyIntroduceTextLength &&
                  companyIntroduceTextLength > 99 ? (
                    <span className={css.redTextCountingSmall}>
                      {companyIntroduceTextLength}/100
                    </span>
                  ) : (
                    <span className={css.textCountingSmall}>
                      {companyIntroduceTextLength}/100
                    </span>
                  )}
                </div>
                {companyIntroduce === false && (
                  <div className={css.essentiel}>필수 작성 항목입니다.</div>
                )}
              </div>
              <div className={css.companyUrl}>
                <div className={css.subHeading}>홈페이지</div>
                {homepage ? (
                  <input
                    type="text"
                    placeholder={'우리회사의 홈페이지 주소를 알려주세요.'}
                    value={homepage}
                  />
                ) : (
                  <input
                    type="text"
                    placeholder={'우리회사의 홈페이지 주소를 알려주세요.'}
                  />
                )}
              </div>
              <div className={css.mainWorkingFild}>
                <div className={css.subHeading}>주력 업무 분야 *</div>
                {mainFiled ? (
                  <input
                    type="text"
                    placeholder={
                      '5개 이하의 주요 업무를 쉼표로 구분하여 입력해주세요. ex) 디지털 마케팅, 콘텐츠 제작, 영상 제작'
                    }
                    onChange={fiveLimitCheck}
                    ref={focusRef}
                    value={mainFiled}
                  />
                ) : (
                  <input
                    type="text"
                    placeholder={
                      '5개 이하의 주요 업무를 쉼표로 구분하여 입력해주세요. ex) 디지털 마케팅, 콘텐츠 제작, 영상 제작'
                    }
                    onChange={fiveLimitCheck}
                    ref={focusRef}
                  />
                )}

                {fiveLimit === 'over' && (
                  <div className={css.mainWorkingFildAlert}>
                    주요 업무는 5개 이하로 소개해주세요.
                  </div>
                )}
                {fiveLimit === false && (
                  <div className={css.essentiel}>필수 작성 항목입니다.</div>
                )}
              </div>
              <div className={css.detailIntroduce}>
                <div className={css.subHeading}>
                  자세한 소개 및 업무 레퍼런스
                </div>
                <div className={css.textAreaWrapper}>
                  {detailCompanyIntro ? (
                    <textarea
                      id="textarea"
                      placeholder={
                        '우리 회사 소개, 패스트파이브 멤버들과 협업하고 싶은 프로젝트, 지금까지의 업무 레퍼런스 등 자세한 내용을 공유해주세요.'
                      }
                      onChange={countingReferenceTextLength}
                      maxLength={1000}
                      value={detailCompanyIntro}
                    />
                  ) : (
                    <textarea
                      id="textarea"
                      placeholder={
                        '우리 회사 소개, 패스트파이브 멤버들과 협업하고 싶은 프로젝트, 지금까지의 업무 레퍼런스 등 자세한 내용을 공유해주세요.'
                      }
                      onChange={countingReferenceTextLength}
                      maxLength={1000}
                    />
                  )}

                  {referenceTextLength && referenceTextLength > 999 ? (
                    <span className={css.redTextCounting}>
                      {referenceTextLength}/1000
                    </span>
                  ) : (
                    <span className={css.textCounting}>
                      {referenceTextLength}/1000
                    </span>
                  )}
                </div>
              </div>
              <div className={css.membership}>
                <div className={css.subHeading}>패스트파이브 멤버 혜택</div>
                <div className={css.textAreaWrapper}>
                  {membership ? (
                    <textarea
                      id="textarea"
                      placeholder={
                        '패스트파이브 멤버에게만 제공되는 혜택이 있다면 알려주세요. ex) 패스트파이브 멤버 컨택 시 견적의 10% 할인 제공'
                      }
                      onChange={countingMembershipTextLength}
                      maxLength={100}
                      value={membership}
                    />
                  ) : (
                    <textarea
                      id="textarea"
                      placeholder={
                        '패스트파이브 멤버에게만 제공되는 혜택이 있다면 알려주세요. ex) 패스트파이브 멤버 컨택 시 견적의 10% 할인 제공'
                      }
                      onChange={countingMembershipTextLength}
                      maxLength={100}
                    />
                  )}

                  {membershipTextLength && membershipTextLength > 99 ? (
                    <span className={css.redTextCountingSmall}>
                      {membershipTextLength}/100
                    </span>
                  ) : (
                    <span className={css.textCountingSmall}>
                      {membershipTextLength}/100
                    </span>
                  )}
                </div>
              </div>
              <div className={css.ceoInfo}>
                <div className={css.subHeading}>대표 연락처 *</div>
                {ceoContact ? (
                  <input
                    type="text"
                    placeholder={
                      '업무상 컨택이 가능한 연락처를 알려주세요. ex) sample@fastfive.co.kr, 010-1234-1234'
                    }
                    onChange={essentielCheck}
                    ref={focusRef}
                    value={ceoContact}
                  />
                ) : (
                  <input
                    type="text"
                    placeholder={
                      '업무상 컨택이 가능한 연락처를 알려주세요. ex) sample@fastfive.co.kr, 010-1234-1234'
                    }
                    onChange={essentielCheck}
                    ref={focusRef}
                  />
                )}

                {contact === false && (
                  <div className={css.essentiel}>필수 작성 항목입니다.</div>
                )}
              </div>

              <div className={css.companyIntroduceFile}>
                <div className={css.subHeading}>회사 소개서</div>
                <div className={css.fileUploadWrapper}>
                  {companyIntroFile ? (
                    <input type="file" value={companyIntroFile} />
                  ) : (
                    <input type="file" />
                  )}
                  <div className={css.fileSizeNoti}>
                    30mb 이하의 pdf, jpg, png 파일을 선택해주세요.
                  </div>
                </div>
              </div>
              <div className={css.usingBranch}>
                <div className={css.subHeading}>이용중인 지점 *</div>
                <select className={css.categorySelect} onChange={branchCheck}>
                  <option value="">지점명</option>
                  {branch && <option defaultValue={branch}></option>}
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
                <input type="checkbox" onClick={agreeCheck} />
                <div className={css.agreeContent}>
                  패스트파이브
                  <span className={css.underline}> 서비스 이용약관</span>에
                  동의하십니까? (필수)
                </div>
              </div>
              <section className={css.btnWrapper}>
                <div className={css.btnInnerWrapper}>
                  <button className={css.btn}>미리보기</button>
                  {/* {type === modify ? (
                    <button className={css.btn} onClick={clikUpload}>
                      수정하기
                    </button>
                  ) : ( */}
                  <button className={css.btn} onClick={clikUpload}>
                    등록하기
                  </button>
                  {/* )} */}
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
