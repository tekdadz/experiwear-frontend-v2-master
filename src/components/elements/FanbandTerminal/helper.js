export const quadOut = (t) => {
  const val = -t * (t - 2.0);
  return val < 0 ? 0 : val > 1 ? 1 : val;
};
