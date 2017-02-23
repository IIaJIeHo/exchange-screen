import * as types from './actionTypes';

export function updateRates(rates) {
  return {type: types.UPDATE_RATES, rates};
}
export function updateCurrent(current) {
  return {type: types.UPDATE_CURRENT, current};
}
export function updateNext(next) {
  return {type: types.UPDATE_NEXT, next};
}
export function updatePocket(pocket) {
  return {type: types.UPDATE_POCKET, pocket};
}
export function startRates(rates) {
  return {type: types.START_RATES, rates};
}
export function startRatesAsync(error) {
  return {type: types.START_RATES_ASYNC, error};
}