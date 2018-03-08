import ReactGA from 'react-ga';

let categoryMap = {
  '/btc': 'btc',
  '/btc24': 'btc24',
  '/eth': 'eth',
  '/soc': 'socStats',
}

export default () => {

  let category = categoryMap[window.location.pathname] || 'missing';

  ReactGA.event({
    category,
    action: 'chartMouseover'
  });

}
