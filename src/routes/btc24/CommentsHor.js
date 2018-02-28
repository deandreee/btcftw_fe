import React from 'react';
import { connect } from 'react-redux';
import * as chartActions from './dux';
import * as appActions from 'app/dux';
import bluebird from 'bluebird';
import { ChatFeed, Message } from 'react-chat-ui';
// import * as ws from './ws';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import md5 from 'blueimp-md5';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import Paper from 'material-ui/Paper';
import styles from 'app/styles';

class CommentsHor extends React.Component {

  render() {

      const horizontal = {
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
      };


      let comments = this.props.btc24.comments.slice(0, 10);

      return (

            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
              <Paper style={{ maxHeight: window.height, overflow: 'auto'}}>
              <List style={horizontal}>
                {comments.map((x, i) => {

                  let hash = md5(x.author);
                  let imgSrc = `https://www.gravatar.com/avatar/${hash}?d=identicon`

                  return (<div key={`${x.author}_${i}`}>
                    <ListItem style={{ fontFamily: styles.fontFamily, minWidth: '300px' }}
                      leftAvatar={<Avatar src={imgSrc} />}
                      primaryText={x.author}
                      secondaryText={
                        <p>
                          <span style={{color: darkBlack}}>
                            <a href={ 'https://reddit.com/' + x.permalink } style={{ color: 'lightblue' }} target='_blank'>View in Reddit</a>
                          </span> --
                          {x.body}
                        </p>
                      }
                      secondaryTextLines={2}
                    />
                    <Divider inset={true} />
                  </div>)
                }

                )}
              </List>
            </Paper>
            </MuiThemeProvider> )

  }
}

export default connect(state => state)(CommentsHor);
