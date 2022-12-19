import React from 'react';
import Data from './Data';
import './Buttons.css';

const Buttons = ({ filterItem, setItem, menuItems }) => {
  return (
    <div className="button-container">
      {menuItems.map((Val, id) => {
        return (
          <button onClick={() => filterItem(Val)} key={id}>
            {Val}
          </button>
        );
      })}
      <button onClick={() => setItem(Data)}>All</button>

      {/* <button onClick={() => filterItem('Breakfast')}>Breakfast</button>
      <button onClick={() => filterItem('Lunch')}>Lunch</button>
      <button onClick={() => filterItem('Dinner')}>Dinner</button>
      <button onClick={() => setItem(Data)}>All</button> */}
    </div>
  );
};

export default Buttons;
