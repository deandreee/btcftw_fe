import { spring, presets } from 'react-motion';

export function getDefaultStyles(comments) {
  return comments.map(todo => ({...todo, key: todo.permalink, data: todo, style: {height: 0, opacity: 1}}));
};

export function getStyles(comments) {
  return comments.map((todo, i) => {
    return {
      ...todo,
      key: todo.permalink,
      data: todo,
      style: {
        height: spring(60, presets.gentle),
        opacity: spring(1, presets.gentle),
      }
    };
  });
};

export function willEnter() {
  return {
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
