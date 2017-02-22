import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import exchangeReducer from './reducers/exchangeReducer';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './index.css';

const store = createStore(exchangeReducer);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
