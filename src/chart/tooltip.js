import styles from 'app/styles';
import md from 'utils/md'

let positionDesktop = (pt) => {
  // console.log(pt);
  let [ x, y ] = pt;
  // return [ x - 10, y - 1 ];
  return [ x, y ];
  // return [ x + 20, y + 20 ];
  // return null;
}

let positionMobile = (pt) => {
  return [10, 10];
}

export default {
  show: true,
  trigger: 'axis', // [ default: 'item' ]
  // triggerOn: 'click', // click mousemove // [ default: 'mousemove|click' ]
  borderColor: styles.colors.primary,
  borderWidth: 3,
  textStyle: { fontFamily: styles.fontFamily },
  backgroundColor: 'rgba(55,55,55,0.9)', // default opacity 0.7, let's make a bit more dark
  position: md.phone() ? positionMobile : positionDesktop,

  enterable: true, // need this so mouseover stops working while inside tooltip
  // showDelay: 500,
  hideDelay: 1000 // doesn't really change anything
}
