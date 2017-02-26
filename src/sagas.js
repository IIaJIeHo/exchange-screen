import { delay } from 'redux-saga';
import { actionChannel, call, take, put, race, takeEvery } from 'redux-saga/effects'
import * as actionTypes from './actions/actionTypes';
import * as exchangeActions from './actions/exchangeActions';
import fetch from 'isomorphic-fetch';
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
      yield put({type: "START_RATES", rates});
      yield put({ type: 'START_RATES_ASYNC' });
   } catch (error) {
      yield put({type: "START_RATES_ERROR", error});
   }
}

export function* startRates() {
  yield takeEvery('START_RATES_ASYNC', fetchData)
}