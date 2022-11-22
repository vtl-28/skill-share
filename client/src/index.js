import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-calendar/dist/Calendar.css';
import './index.css';
import App from './App';
import TalkProvider from '../src/Context/TalkProvider'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <TalkProvider>
        <App />
      </TalkProvider>
    </BrowserRouter>
  </React.StrictMode>
);
