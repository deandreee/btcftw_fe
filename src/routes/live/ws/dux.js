import createReducer from 'app/createReducer';

let initialState = {
  status: '', // 'connected', 'connecting', 'error',
  errorMsg: ''
}

export function connect() {
  return { type: 'WS/connect' };
}

export function onConnect() {
  return { type: 'WS/onConnect' };
}

export function onError(errorMsg) {
  return { type: 'WS/onError', errorMsg };
}

export default createReducer(initialState, {

  'WS/connect'(state, action) {
    return { ...state, status: 'connecting' };
  },
  'WS/onConnect'(state, action) {
    return { ...state, status: 'connected' };
  },
  'WS/onError'(state, action) {
    return { ...state, status: 'error', errorMsg: action.errorMsg };
  }

});
