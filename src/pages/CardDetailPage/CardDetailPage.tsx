import React, { Fragment } from 'react';
import css from './CardDetailPage.module.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SideBar from '../../components/SideBar/SideBar';
import { Link } from 'react-router-dom';

const CardDetailPage = () => {
  return (
    <Fragment>
      <Header />
      <main className={css.mainContainer}>
        <SideBar />
        <div className={css.container}>
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
                  src="https://jeonghwan-kim.github.io/static/c5453a21722fae5121a6cd6acb30a2ce/bcec6/react-logo.png"
                  alt=""
                />
              </div>
              <div
                className={`${css.gridItem} ${css.title} ${css.companyName}`}
              >
                패스트파이브
              </div>
              <div className={`${css.gridItem} ${css.infoContent}`}>
                패스트파이브는 일하는 공간을 새롭게 정의합니다. 패스트파이브
                오피스 플랫폼은 부동산 시장의 수요와 공급을 혁신적으로 통합하며,
                공간을 채우는 콘텐츠로 기업과 오피스를 연결합니다.
              </div>
              <div className={`${css.gridItem} ${css.title}`}>업무분야</div>
              <div className={css.gridItem}>
                공유오피스, 라운지 멤버십, 프리미엄 오피스텔, 사옥 컨설팅
              </div>
              <div className={`${css.gridItem} ${css.title}`}>멤버 혜택</div>
              <div className={css.gridItem}>
                패스트파이브 멤버 컨택 시 10% 할인 제공
              </div>
              <div className={`${css.gridItem} ${css.title}`}>홈페이지</div>
              <div className={css.gridItem}>
                <a href="https://www.fastfive.co.kr/#enp_mbris">
                  https://www.fastfive.co.kr/#enp_mbris
                </a>
              </div>
              <div className={`${css.gridItem} ${css.title}`}>연락처</div>
              <div className={css.gridItem}>
                sample@fastfive.co.kr , 010-1234-1234 (홍길동 팀장)
              </div>
              <div className={`${css.gridItem} ${css.infoContent}`}>
                패스트파이브는 일하는 공간을 새롭게 정의합니다. 패스트파이브
                오피스 플랫폼은 부동산 시장의 수요와 공급을 혁신적으로 통합하며,
                공간을 채우는 콘텐츠로 기업과 오피스를 연결합니다.
                패스트파이브는 일하는 공간을 새롭게 정의합니다. 패스트파이브
                오피스 플랫폼은 부동산 시장의 수요와 공급을 혁신적으로 통합하며,
                공간을 채우는 콘텐츠로 기업과 오피스를 연결합니다.패스트파이브는
                일하는 공간을 새롭게 정의합니다. 패스트파이브 오피스 플랫폼은
                부동산 시장의 수요와 공급을 혁신적으로 통합하며, 공간을 채우는
                콘텐츠로 기업과 오피스를 연결합니다.
              </div>
              <div className={`${css.gridItem} ${css.title}`}>회사 소개서</div>
              <div className={css.gridItem}>패스트파이브 회사 소개서.pdf</div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </Fragment>
  );
};

export default CardDetailPage;
