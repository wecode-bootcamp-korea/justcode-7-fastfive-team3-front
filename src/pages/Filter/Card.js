import React from 'react';
import './Cards.css';

const Card = ({ item }) => {
  return (
    <div className="card-container">
      {item.map(Val => {
        return (
          <div className="card" key={Val.id}>
            <div className="card-body">
              <img src={Val.img} alt={Val.title} className="photo" />
              <div className="card-title">
                {Val.title}
                {Val.price}
              </div>
              <div className="card-text">{Val.desc}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
