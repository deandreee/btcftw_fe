import React from 'react';

export () => {
  let linkStyle = { color: this.getColor(), fontFamily: `'Saira', sans-serif` };

  return (
    <div style={{ paddingLeft: '10px', paddingTop: '10px', fontColor: this.getColor() }}>
      <Link to="/btc" style={{ textDecoration: 'none' }}><span style={linkStyle}>BTC</span></Link>
      <span>  |  </span>
      <Link to="/eth" style={{ textDecoration: 'none' }}><span style={linkStyle}>ETH</span></Link>
      <span>  |  </span>
      <Link to="/live" style={{ textDecoration: 'none' }}><span style={linkStyle}>LIVE</span></Link>
    </div>
  )
}
