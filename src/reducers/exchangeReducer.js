import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function exchangeReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_RATES:
      return Object.assign({}, state, {'rates': action.rates});

    case types.UPDATE_CURRENT:
      return Object.assign({}, state, {'current': action.current});
      
    case types.UPDATE_NEXT:
      return Object.assign({}, state, {'next': action.next});

    case types.UPDATE_POCKET:
      return Object.assign({}, state, {'pocket': action.pocket});

    default:
      return state;
  }
}
