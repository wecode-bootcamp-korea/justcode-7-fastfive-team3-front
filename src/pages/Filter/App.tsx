import React, { useState } from 'react';
import Data from './Data';
// import './Cards.css';
import './Buttons.css';
import css from '../../components/CardSubHome/CardSubHome.module.scss';

const App = () => {
  const [item, setItem] = useState(Data);
  const menuItems = [...new Set(Data.map(Val => Val.category))];

  const filterItem = (card: string) => {
    const newItem = Data.filter(newVal => {
      return newVal.category === card;
    });
    setItem(newItem);
  };
  return (
    <div className={css.container}>
      <div className="row">
        <h1>업종별 살펴보기</h1>
        <div className="button-container">
          {menuItems.map((Val, category_id) => {
            return (
              <>
                <button onClick={() => filterItem(Val)} key={category_id}>
                  {Val}
                </button>
                {/* <select onClick={() => filterItem(Val)} key={category_id}>
                  <option>{Val}</option>
                  <option onClick={() => setItem(Data)}>All</option>
                </select> */}
              </>
            );
          })}
          <button onClick={() => setItem(Data)}>All</button>
        </div>
        <div className={css.cardWrap}>
          {item.map(Val => {
            return (
              <div className={css.cardContainer} key={Val.feed_id}>
                <div className={css.imageContainer}>
                  <img
                    className={css.cardImage}
                    src={Val.logo_img}
                    alt="회사 이미지"
                  />
                </div>
                <div className={css.contentContainer}>
                  <p className={css.companyName}>{Val.company_name}</p>
                  <p className={css.companyDesc}>{Val.introduction}</p>
                  <button className={css.moreBtn}>View More</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
