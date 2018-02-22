export function getMinMax(values) {

  let min = Math.min(...values);
  let max = Math.max(...values);
  // console.log('minmax', min, max);

  min = min - (0.005 * max);
  max = max + (0.005 * max);

  return { min, max };
};
