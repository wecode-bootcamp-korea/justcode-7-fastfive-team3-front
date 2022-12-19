import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const TestScroll = () => {
  const [items, setItems] = useState(Array.from({ length: 40 }));
  const fetchData = () => {
    setTimeout(() => {
      setItems(items.concat(Array.from({ length: 20 })));
    }, 1500);
  };

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchData}
      hasMore={true}
      loader={<h4>Loading...</h4>}
    >
      {items.map((i, index) => (
        <div key={index}>div - #{index}</div>
      ))}
    </InfiniteScroll>
  );
};

export default TestScroll;
