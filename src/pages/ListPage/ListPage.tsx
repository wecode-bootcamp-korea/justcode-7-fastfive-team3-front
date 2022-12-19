import React, { Fragment } from 'react';
import css from './ListPage.module.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SideBar from '../../components/SideBar/SideBar';
import CardSubHome from '../../components/CardSubHome/CardSubHome';
import IntroduceCompany from '../../components/IntroduceCompany/IntroduceCompany';

function ListPage() {
  return (
    <Fragment>
      <Header />
      <main className={css.mainContainer}>
        <SideBar />
        <div className={css.container}>
          <div className={css.main}>
            <div className={css.content}>
              <IntroduceCompany />
              <CardSubHome />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </Fragment>
  );
}

export default ListPage;
