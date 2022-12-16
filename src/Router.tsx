import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SubHome from './pages/SubHome/SubHome';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SubHome />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
