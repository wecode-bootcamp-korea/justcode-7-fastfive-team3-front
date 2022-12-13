import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import PostPage from './pages/PostPage/PostPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/app" element={<App />} />
        <Route path="/postPage" element={<PostPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
