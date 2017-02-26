import * as types from './actionTypes';

export function updatePocket(pocket) {
  return {type: types.UPDATE_POCKET, pocket};
}
export function startRates(rates) {
  return {type: types.START_RATES, rates};
}
export function startRatesError(error) {
  return {type: types.START_RATES_ERROR, error};
}
export function startRatesAsync() {
  return {type: types.START_RATES_ASYNC};
}