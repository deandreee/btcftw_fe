import styles from 'app/styles';
import md from 'utils/md';
import access from 'safe-access';

// (point: Array, params: Object|Array.<Object>, dom: HTMLDomElement, rect: Object, size: Object) => Array
// size:
// contentSize [465, 185]
// viewSize [1920, 500]
let positionDesktop = (pt, params, domElem, rect, size) => {

  // console.log(pt, rect, size);
  // console.log(pt);

  let [ x, y ] = pt;
  // return [ x - 10, y - 1 ];
  // return [ x, y ];

  let contentX = access(size, 'contentSize[0]');
  let viewX = access(size, 'viewSize[0]');

  if (!contentX || !viewX) { // just in case
    return [ x, y ];
  }
  else if (x + contentX > viewX) {
    return [ x - contentX, y ];
  }
  else {
    return [ x, y ];
  }

}

let positionMobile = (pt) => {
  return [30, 10];
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
