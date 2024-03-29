const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

const isVlan = Boolean(
  window.location.hostname.startsWith('192.168')
);

let wsPrefix = isLocalhost || isVlan ? 'ws' : 'wss';
let wsPort = isLocalhost || isVlan ? '3001' : '443';

module.exports = {
  port: 3000,
  wsUrl: `${wsPrefix}://${window.location.hostname}:${wsPort}`,
  isLocalhost,
  env: {
    NODE_ENV: isLocalhost || isVlan ? 'development' : 'production'
  },
  trackingId: isLocalhost || isVlan ? 'UA-103323219-3' : 'UA-103323219-2'
}
