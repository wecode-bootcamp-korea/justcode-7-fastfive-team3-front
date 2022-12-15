import React, { Fragment, useEffect, useRef, useState } from 'react';
import css from './CardDetailPage.module.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SideBar from '../../components/SideBar/SideBar';
import { Link } from 'react-router-dom';

const CardDetailPage = () => {
  //1. 이메일 클릭 시 복사 기능 구현
  const [isModalOn, setIsModalOn] = useState(false);
  const [email, setEmail] = useState('');
  const emailRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setEmail(emailRef.current!.innerHTML);
  }, [email]);

  //navigator.clipboard는 localhost 또는 https환경에서만 작동
  const copyEmailInhttps = () => {
    setIsModalOn(true);
    navigator.clipboard.writeText(email).then(() => {
      setTimeout(function () {
        setIsModalOn(false);
      }, 1000);
      console.log(navigator.clipboard.readText);
    });
  };

  //http 환경에서도 작동하는 copyEmail 함수
  //배포 시 사용합니다.
  const copyEmailInhttp = () => {
    setIsModalOn(true);
    const textArea = document.createElement('textarea');
    document.body.appendChild(textArea);
    textArea.value = email;
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    if (document.execCommand('copy')) {
      setTimeout(function () {
        setIsModalOn(false);
      }, 1000);
    }
  };

  return (
    <Fragment>
      <Header />
      <main className={css.mainContainer}>
        <SideBar />
        <div className={css.container}>
          {isModalOn && (
            <div className={css.modalBg}>
              <div className={css.modalMain}>
                <p className={css.copyMessage}>이메일이 복사되었습니다.</p>
              </div>
            </div>
          )}

          <div className={css.main}>
            <div className={`${css.content} ${css.gridContainer}`}>
              <div className={`${css.gridItem} ${css.category}`}>
                <Link to="/list">전체보기</Link>
              </div>
              <div className={`${css.gridItem} ${css.crudBtns}`}>
                <span className={css.modify}>
                  <Link to="/postWritePage">수정</Link>
                </span>
                <span className={css.centerBar} />
                <span className={css.delete}>삭제</span>
              </div>
              <div className={`${css.gridItem} ${css.logo}`}>
                <img
                  className={css.logoImg}
                  src="https://www.fastfive.co.kr/wp-content/uploads/2020/01/191104_FASTFIVE_logo_BK_250.png"
                  alt=""
                />
              </div>
              <div
                className={`${css.gridItem} ${css.title} ${css.companyName}`}
              >
                <p>패스트파이브</p>
              </div>
              <div className={`${css.gridItem} ${css.infoContent}`}>
                <p>
                  패스트파이브는 일하는 공간을 새롭게 정의합니다. 패스트파이브
                  오피스 플랫폼은 부동산 시장의 수요와 공급을 혁신적으로
                  통합하며, 공간을 채우는 콘텐츠로 기업과 오피스를 연결합니다.
                </p>
              </div>
              <div className={`${css.gridItem} ${css.title}`}>
                <p>업무분야</p>
              </div>
              <div className={css.gridItem}>
                <p>공유오피스, 라운지 멤버십, 프리미엄 오피스텔, 사옥 컨설팅</p>
              </div>
              <div className={`${css.gridItem} ${css.title}`}>
                <p>멤버 혜택</p>
              </div>
              <div className={css.gridItem}>
                <p>패스트파이브 멤버 컨택 시 10% 할인 제공</p>
              </div>
              <div className={`${css.gridItem} ${css.title}`}>
                <p>홈페이지</p>
              </div>
              <div className={css.gridItem}>
                <p className={css.contactInfo}>
                  <a
                    href="https://www.fastfive.co.kr/#enp_mbris"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://www.fastfive.co.kr/#enp_mbris
                  </a>
                </p>
                <span className={css.alertMessage}>
                  주소를 클릭하면 페이지로 이동합니다.
                </span>
              </div>
              <div className={`${css.gridItem} ${css.title}`}>
                <p>연락처</p>
              </div>
              <div className={css.gridItem}>
                <p className={css.contactInfo}>
                  <span
                    className={css.copyEmail}
                    ref={emailRef}
                    onClick={copyEmailInhttps}
                  >
                    sample@fastfive.co.kr
                  </span>
                  / 010-1234-1234 (홍길동 팀장)
                </p>
                <span className={css.alertMessage}>
                  이메일을 클릭하면 복사됩니다.
                </span>
              </div>
              <div className={`${css.gridItem} ${css.infoContent}`}>
                <p>
                  패스트파이브는 일하는 공간을 새롭게 정의합니다. 패스트파이브
                  오피스 플랫폼은 부동산 시장의 수요와 공급을 혁신적으로
                  통합하며, 공간을 채우는 콘텐츠로 기업과 오피스를 연결합니다.
                  패스트파이브는 일하는 공간을 새롭게 정의합니다. 패스트파이브
                  오피스 플랫폼은 부동산 시장의 수요와 공급을 혁신적으로
                  통합하며, 공간을 채우는 콘텐츠로 기업과 오피스를
                  연결합니다.패스트파이브는 일하는 공간을 새롭게 정의합니다.
                  패스트파이브 오피스 플랫폼은 부동산 시장의 수요와 공급을
                  혁신적으로 통합하며, 공간을 채우는 콘텐츠로 기업과 오피스를
                  연결합니다.
                </p>
              </div>
              <div className={`${css.gridItem} ${css.title}`}>
                <p>회사 소개서</p>
              </div>
              <div className={css.gridItem}>
                <p>패스트파이브 회사 소개서.pdf</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </Fragment>
  );
};

export default CardDetailPage;
