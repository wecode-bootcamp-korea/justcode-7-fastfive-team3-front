import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SubHome from './pages/SubHome/SubHome';
import PostWritePage from './pages/PostWritePage/PostWritePage';
import Login from './pages/Login/Login';
import CardDetailPage from './pages/CardDetailPage/CardDetailPage';
import ListPage from './pages/ListPage/ListPage';
import TestScroll from './pages/TestScroll';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SubHome />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/postWritePage" element={<PostWritePage />} />
        <Route path="/detail" element={<CardDetailPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<TestScroll />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
