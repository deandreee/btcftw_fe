import { combineReducers } from 'redux';
import chart from 'routes/chart/dux';
import eth from 'routes/eth/dux';
import live from 'routes/live/dux';
import btc24 from 'routes/btc24/dux';
import ws from 'routes/live/ws/dux';
import soc from 'routes/socStats/dux';

const rootReducer = combineReducers({
  chart,
  eth,
  live,
  btc24,
  ws,
  soc
});

export default rootReducer;
