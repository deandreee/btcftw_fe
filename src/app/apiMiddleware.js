// https://github.com/reactjs/redux/blob/ecb1bb453a60408543f5760bba0aa4c767650ba2/examples/real-world/middleware/api.js
import axios from 'axios';
import path from 'path';
import bluebird from 'bluebird';

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API');

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {

  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint } = callAPI;
  const { types, method, body } = callAPI;

  const actionWith = data => {
    const finalAction = { ...action, ...data };
    delete finalAction[CALL_API];
    return finalAction;
  };

  // automatically append for all three types
  let requestType = types + '/REQUEST';
  let successType = types + '/SUCCESS';
  let failureType = types + '/ERROR';
  let finalizedType = types + '/END';

  next(actionWith({ type: requestType, ...body }));

  let url = path.join('/api', endpoint);
  let xhr = method === 'POST'
    ? () => axios.post(url, body).then(x => x.data)
    : () => axios.get(url, body).then(x => x.data);

  return bluebird.resolve(xhr(endpoint, body, { method })) // bluebird wrap because looks like safario doesn't have .finally() ... :/
  .then(resp => {
    return next(actionWith({ ...resp, req: { ...body }, type: successType }));
  }).catch(error => {

    return next(actionWith({
      type: failureType,
      error: { message: `${error.message || 'Something just went wrong ... '}` },
      req: { ...body }
    }));

  }).finally(resp => {

    return next(actionWith({
      ...body,
      type: finalizedType
    }));

  }).catch(error => {

    return next(actionWith({
      type: failureType,
      error: { message: `${error.message || 'Something just went wrong ... '}` },
      req: { ...body }
    }));

  })
};
