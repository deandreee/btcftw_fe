import { CALL_API } from 'app/apiMiddleware';
import createReducer from 'app/createReducer';
import ms from 'ms';

let initialState = {
  comments: [],
  priceNow: { close: 0 },
  pricePrev: { close: 0 },
  price24h: { close: 0 },
  price1h: { close: 0 }
}

export function onComment(comment) {
  return { type: 'LIVE/onComment', comment };
}

export function loadComments() {
  return {
    [CALL_API]: {
      types: ['LIVE/loadComments'],
      endpoint: '/r/comments',
      method: 'GET'
    }
  };
}

export function onCurrentPriceChangeStart(price) {
  return { type: 'LIVE/onCurrentPriceChangeStart', price };
}

export function onCurrentPriceChangeEnd(price) {
  return { type: 'LIVE/onCurrentPriceChangeEnd', price };
}

export function onCurrentPriceChange(price) {
  return { type: 'LIVE/onCurrentPriceChange', price };
}

export function onBtcPriceNow(btc) {
  return { type: 'LIVE/onBtcPriceNow', btc };
}

export default createReducer(initialState, {

  'LIVE/onComment'(state, action) {
    return { ...state, comments: [ action.comment, ...state.comments ] }; // reverse
  },

  'LIVE/loadComments/SUCCESS'(state, action) {
    return { ...state, comments: action.comments };
  },

  'LIVE/onBtcPriceNow'(state, action) {
    return { ...state, priceNow: { time: Date.now(), close: action.btc.USD }, pricePrev: state.priceNow };
  },

  'BTC24/loadBtc24h/SUCCESS'(state, action) {
    let { btc } = action;

    let price24h = btc.Data[0]; // since we take 24h, this should be it
    let price1h = btc.Data.find(x => x.time * 1000 > Date.now() - ms('5h'));
    // let pricePrev = btc.Data.find(x => x.time * 1000 > Date.now() - 1000 * 60 * 5); // let's take 5 min for this
    let pricePrev = btc.Data[btc.Data.length - 2];
    let priceNow = btc.Data[btc.Data.length - 1];

    // console.log(`BTC24/loadBtc24h/SUCCESS |
    //   price24h ${price24h && price24h.close} |
    //   price1h ${price1h && price1h.close} |
    //   pricePrev ${pricePrev && pricePrev.close} |
    //   priceNow ${priceNow && priceNow.close}
    // `);

    return { ...state, priceNow, pricePrev, price24h, price1h };
  }

});
