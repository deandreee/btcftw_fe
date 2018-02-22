import React from 'react';
import styles from 'app/styles';
import AnimatedNumber from 'react-animated-number';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';

const DiffLabel = ({ priceComp, priceNow, text }) => {

  let diff = priceNow && priceComp ? priceNow.close - priceComp.close : 0
  diff = Math.round(diff * 100) / 100;
  let diffColor = null;

  if (diff > 0) {
    diff = '+' + diff;
    diffColor = 'green';
  }
  else {
    diffColor = 'red';
  }

  return (
    <span style={{ fontFamily: styles.fontFamily, color: diffColor }}>{text} | {diff}</span>
  )
}

let priceAnimatedStyle = {
  transition: '0.8s ease-out',
  fontFamily: styles.fontFamily,
  fontSize: 20,
  color: 'white',
  transitionProperty: 'background-color, color, opacity'
}

let priceSimpleStyle = {
  fontFamily: styles.fontFamily,
  fontSize: 20,
  color: 'white',
}

const PriceAnimated = ({ price, text }) => {

  return (
    <AnimatedNumber component="text" value={price && price.close}
        style={priceAnimatedStyle}
        frameStyle={perc => (
            perc === 100 ? {} : { backgroundColor: styles.colors.primary, color: 'white' }
        )}
        duration={300}
        stepPrecision={2}
        formatValue={n => n}
        />
  )
}

const PriceSimple = ({ price, text }) =>
  <span style={priceSimpleStyle}>{price && price.close}</span>

export default ({ priceComp, priceNow, showNow, text }) => {

  let icon = text === 'now'
    ? <PriceAnimated price={showNow ? priceNow : priceComp} text={text} />
    : <PriceSimple price={showNow ? priceNow : priceComp} text={text} />

  return (
    <BottomNavigationItem
      label={<DiffLabel priceComp={priceComp} priceNow={priceNow} showNow={true} text={text} />}
      icon={icon}
    />
  )

}
