export function SetKeyRepeatRate(rate, ...keys) {
  keys.forEach((key) => {
    key.repeatRate = rate;
  });
  return keys;
}
