import React from 'react';
import { render } from 'react-dom';
import './app/index.css';
import App from './app/App';
import registerServiceWorker, { unregister } from './app/registerServiceWorker';
import configureStore from './app/configureStore';
import { Provider } from 'react-redux';

const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// registerServiceWorker();
unregister();
