import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import CardDetailPage from './pages/CardDetailPage/CardDetailPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/detail" element={<CardDetailPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
