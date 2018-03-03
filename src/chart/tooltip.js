import styles from 'app/styles';
import md from 'utils/md'

export default {
  show: true,
  // trigger: 'axis', // [ default: 'item' ]
  // triggerOn: 'click', // click mousemove // [ default: 'mousemove|click' ]
  borderColor: styles.colors.primary,
  borderWidth: 3,
  textStyle: { fontFamily: styles.fontFamily },
  backgroundColor: 'rgba(55,55,55,0.9)', // default opacity 0.7, let's make a bit more dark
  position: md.phone() ? function (pt) { return [10, 10]; } : null,
}
