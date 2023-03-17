import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import { store } from './app/store';

import 'antd/dist/reset.css';

const root = createRoot(
  document.getElementById('root')
);

const element = (
  <Router>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </Router>

);
root.render(element);
