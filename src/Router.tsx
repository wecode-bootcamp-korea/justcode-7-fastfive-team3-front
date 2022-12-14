import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import PostWritePage from './pages/PostWritePage/PostWritePage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route />
        <Route path="/app" element={<App />} />
        <Route path="/postWritePage" element={<PostWritePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
