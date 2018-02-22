import React from 'react'
import { AppBar, Tabs, Tab } from 'material-ui'

class Nav extends React.Component {
  render() {
    return (
      <AppBar title="My App">
        <Tabs>
          <Tab label="&nbsp;Item 1&nbsp;" />
          <Tab label="&nbsp;Item 2&nbsp;" />
          <Tab label="&nbsp;Item 3&nbsp;" />
          <Tab label="&nbsp;Item 4&nbsp;" />
        </Tabs>
      </AppBar>
    )
  }
}

export default Nav;
