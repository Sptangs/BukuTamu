// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'admin-lte/dist/css/adminlte.min.css';
// import 'admin-lte/plugins/fontawesome-free/css/all.min.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

