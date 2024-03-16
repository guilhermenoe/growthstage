import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import GrowthStage from './components/growthstage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GrowthStage />
  </React.StrictMode>
);