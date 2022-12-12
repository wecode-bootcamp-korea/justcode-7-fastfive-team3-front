import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Router from './Router';

import './style/reset.scss';
import './style/common.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<Router />);
