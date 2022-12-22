import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SubHome from './pages/SubHome/SubHome';
import PostWritePage from './pages/PostWritePage/PostWritePage';
import Login from './pages/Login/Login';
import CardDetailPage from './pages/CardDetailPage/CardDetailPage';
import ListPage from './pages/ListPage/ListPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/subhome" element={<SubHome />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/postwritepage" element={<PostWritePage />} />
        <Route path="/detail/:id" element={<CardDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
