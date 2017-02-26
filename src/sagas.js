import { delay } from 'redux-saga';
import {call, put, takeEvery } from 'redux-saga/effects'
import * as actionTypes from './actions/actionTypes';
import * as exchangeActions from './actions/exchangeActions';
import axios from 'axios';

const openExchangeRatesId = '8d857aef43674ee58b6ca51077b1ab96';

function fetchVersion(){
  return axios({
    method: 'get',
    url: 'https://openexchangerates.org/api/latest.json?app_id='+openExchangeRatesId
  });
}

export function* fetchData(action) {
   try {
      const data = yield call(fetchVersion);
      let rates = data.data.rates;
      yield put(exchangeActions.startRates(rates));
      yield delay(30000);
      yield put(exchangeActions.startRatesAsync());
   } catch (error) {
      yield put(exchangeActions.startRatesError(error));
   }
}

export function* startRates() {
  yield takeEvery(actionTypes.START_RATES_ASYNC, fetchData)
}