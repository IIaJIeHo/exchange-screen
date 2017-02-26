import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function exchangeReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_POCKET:
      return Object.assign({}, state, {'pocket': action.pocket});

    case types.START_RATES:
      return Object.assign({}, state, {'rates': action.rates});

    case types.START_RATES_ERROR:
      console.log('start rates error');
      return state;

    default:
      return state;
  }
}
