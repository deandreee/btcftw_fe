const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

let wsPrefix = isLocalhost ? 'ws' : 'wss';

module.exports = {
  port: 3000,
  wsUrl: `${wsPrefix}://${window.location.hostname}:3001`,
  isLocalhost,
  env: {
    NODE_ENV: isLocalhost ? 'development' : 'production'
  },
  trackingId: isLocalhost ? 'UA-103323219-3' : 'UA-103323219-2'
}
