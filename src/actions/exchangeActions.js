import * as types from './actionTypes';

export function UPDATE_RATES(rates) {
  return {type: types.UPDATE_RATES, rates};
}
export function UPDATE_CURRENT(current) {
  return {type: types.UPDATE_CURRENT, current};
}
export function UPDATE_NEXT(next) {
  return {type: types.UPDATE_NEXT, next};
}
export function UPDATE_POCKET(pocket) {
  return {type: types.UPDATE_POCKET, pocket};
}