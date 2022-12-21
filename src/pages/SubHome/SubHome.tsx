import React, { Fragment } from 'react';
import css from './SubHome.module.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SideBar from '../../components/SideBar/SideBar';
import SliderSubHome from '../../components/SliderSubHome/SliderSubHome';
import CardSubHome from '../../components/CardSubHome/CardSubHome';
// import CompanyCard from '../../components/CardSubHome/CompanyCard';
// import IntroduceCompany from '../../components/IntroduceCompany/IntroduceCompany';

function SubHome() {
  return (
    <Fragment>
      <Header />
      <main className={css.mainContainer}>
        <SideBar />
        <div className={css.container}>
          <div className={css.main}>
            <div className={css.content}>
              <SliderSubHome />
              {/* <IntroduceCompany /> */}
              <CardSubHome />
              {/* <CompanyCard /> */}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </Fragment>
  );
}

export default SubHome;
