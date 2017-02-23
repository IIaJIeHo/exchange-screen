import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import exchangeReducer from './reducers/exchangeReducer';
import {startRates} from './sagas';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './index.css';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(exchangeReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(startRates);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
