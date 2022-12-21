import React from 'react';
import css from './SideBar.module.scss';

const SideBar = () => {
  return (
    <>
      <aside className={css.sideBarContainer}>
        <div className={css.comunity}>커뮤니티</div>
        <div className={css.memberIntroduce}>멤버소개</div>
      </aside>
    </>
  );
};

export default SideBar;
