import { delay } from 'redux-saga';
import { actionChannel, call, take, put, race, takeEvery } from 'redux-saga/effects'
import * as actionTypes from './actions/actionTypes';
import * as exchangeActions from './actions/exchangeActions';

export function* incrementAsync() {
  yield delay(1000);
  yield put({ type: 'START_RATES' });
  yield put({ type: 'START_RATES_ASYNC' });
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* startRates() {
  yield takeEvery('START_RATES_ASYNC', incrementAsync)
}