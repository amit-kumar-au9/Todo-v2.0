import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Index from './pages/Index';
import { Provider } from 'react-redux';
import store from './store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Index />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);