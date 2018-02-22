// import bluebird from 'bluebird';
import config from 'app/config';
import ReconnectingWebSocket from 'reconnecting-websocket';
import * as actions from './dux';
import * as chartActions from 'routes/chart/dux';
import * as liveActions from 'routes/live/dux';

let ws = null;
let wsUrl = config.wsUrl;

export function connect(dispatch) {

  // don't allow to re-connect this way
  // otherwise will get connected multiple times and
  // use refresh for impersonate etc
  if (isConnected()) {
    return;
  }

  // dispatch(actions.connect());

  ws = new ReconnectingWebSocket(wsUrl, null, { connectionTimeout: 5000, maxReconnectionDelay: 5000, minReconnectionDelay: 2000 });
  // ws = new WebSocket(wsUrl, null, { connectionTimeout: 5000, maxReconnectionDelay: 5000, minReconnectionDelay: 2000 });

  ws.onopen = function() {
    onConnect(ws, dispatch);
  };
}

function onConnect(ws, dispatch) {
  console.log('ws: onConnect');
  // dispatch(actions.onConnect());
  handleEvents(ws, dispatch);
}

// need to re-attach events each time ws reconnects after server restart
function handleEvents(ws, dispatch) {

  ws.onmessage = function(event) {
    var action = JSON.parse(event.data);

    console.log(`WS Action: `, action);

    if (action.type === 'comment') {
      dispatch(actions.onComment(action.comment));
    }
    else if (action.type === 'ticker') {
      // dispatch(chartActions.onTicker(action.ticker));
    }
    else if (action.type === 'btc-price-now') {
      dispatch(liveActions.onBtcPriceNow(action.btc));
    }
  };

  ws.onerror = function(event) {
    // dispatch(actions.onError('Connection error'));
    // dispatch(toastr.error(`WS error`));
    console.error(event);
  };

  // need to reconnect each time server restarts
  ws.onclose = function() {
    // dispatch(actions.onError('Connection lost'));
  };

};

// Refresh the connection if still open (close and then re-open it).
// basically will reconnect after reconnectInterval
// used on impersonate, not instantaneous, but will be good enough
export function refresh() {
  if (ws) {
    ws.close();
  }
}

export function isConnected() {
  return !!(ws && ws.readyState === 1);
}
