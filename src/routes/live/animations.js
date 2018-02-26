import { spring, presets } from 'react-motion';

export function willEnter() {
  return {
    // height: spring(80, presets.gentle),
    // height: spring(0, presets.wobbly),
    height: 0,
    opacity: 1,
  };
};

export function willLeave() {
  return {
    height: spring(0),
    opacity: spring(0),
  };
};

export function getDefaultStyles(comments) {
  return comments.map(c => ({ key: c.permalink, data: c, style: { height: 88, opacity: 1 }}));
};

export function getStyles(comments) {
  return comments.map((c, i) => {
    return {
      key: c.permalink,
      data: c,
      style: {
        height: spring(88, presets.wobbly),
        // height: 88,
        // height: 88,
        // opacity: spring(1, presets.wobbly),
        opacity: 1,
      }
    };
  });
};
