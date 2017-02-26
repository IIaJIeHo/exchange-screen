import { delay } from 'redux-saga';
import {call, put, takeEvery } from 'redux-saga/effects'
import * as actionTypes from './actions/actionTypes';
import * as exchangeActions from './actions/exchangeActions';
import axios from 'axios';

function fetchVersion(){
  return axios({
    method: 'get',
    url: 'https://openexchangerates.org/api/latest.json?app_id=96'
  });
}

export function* fetchData(action) {
   try {
      yield delay(30000);
      const data = yield call(fetchVersion);
      console.log('fetchData');
      let rates = data.data.rates;
      yield put(exchangeActions.startRates(rates));
      yield put(exchangeActions.startRatesAsync());
   } catch (error) {
      yield put(exchangeActions.startRatesError(error));
   }
}

export function* startRates() {
  yield takeEvery(actionTypes.START_RATES_ASYNC, fetchData)
}