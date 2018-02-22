import React from 'react';
import { ListItem } from 'material-ui/List';
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import md5 from 'blueimp-md5';
import styles from 'app/styles';
import shallowCompare from 'app/shallowCompare';

let lines2 = {
  display: 'block',
  textOverflow: 'ellipsis',
  wordWrap: 'break-word',
  overflow: 'hidden',
  maxHeight: '32px',
  lineHeight: '16px'
}

export default class Item extends React.PureComponent {

  // shouldComponentUpdate = (nextProps, nextState) => {
    // return shallowCompare(this, nextProps, nextState);
    // let res = shallowCompare(this, nextProps, nextState);
    // console.log('Item: shouldComponentUpdate', res);
    // return res;
  // }

  render() {

    // console.log('Item: render');

    let { comment, onClick } = this.props;

    let time = new Date(comment.created_utc * 1000);
    let timeDisplay = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    let hash = md5(comment.author);
    let imgSrc = `https://www.gravatar.com/avatar/${hash}?d=identicon`;

    return (

        <ListItem style={{ fontFamily: `'Saira', sans-serif`, backgroundColor: styles.colors.background }}
          leftAvatar={<Avatar src={imgSrc} />}
          primaryText={
            <span style={lines2}>
              {comment.author} ({timeDisplay}) @
              <a href={ 'https://reddit.com/' + comment.permalink } style={{ color: 'lightblue' }} target='_blank'>  {comment.link_title}</a>
            </span>
          }
          secondaryText={
            <p>
              {comment.body}
            </p>
          }
          secondaryTextLines={2}
          onClick={onClick}
          disableTouchRipple={true}
          disableFocusRipple={true}
        />

    );
  }
}
