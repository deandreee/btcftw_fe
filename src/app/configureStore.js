import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';
import apiMiddleware from './apiMiddleware';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import config from 'app/config';

let middleware = [
  thunk,
  apiMiddleware
];

// Redux middleware that detects mutations between and outside redux dispatches. For development use only.
if (config.isLocalHost) {
  middleware.push(reduxImmutableStateInvariant());
}

export default function configureStore() {
  return createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    compose(applyMiddleware(...middleware))
  );
}
