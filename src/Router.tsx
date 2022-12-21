import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PostWritePage from './pages/PostWritePage/PostWritePage';
import Login from './pages/Login/Login';
import CardDetailPage from './pages/CardDetailPage/CardDetailPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/postWritePage" element={<PostWritePage />} />
        <Route path="/detail/:id" element={<CardDetailPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
