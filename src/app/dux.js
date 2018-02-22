import { CALL_API } from 'app/apiMiddleware';
import createReducer from 'app/createReducer';

let initialState = {
}

export function log(msg) {
  return {
    [CALL_API]: {
      types: ['APP/log'],
      endpoint: '/r/log',
      method: 'POST',
      body: { msg }
    }
  };
}

export default createReducer(initialState, {

});
