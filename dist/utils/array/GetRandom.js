export function GetRandom(array, startIndex = 0, length) {
  if (!length) {
    length = array.length;
  }
  const randomIndex = startIndex + Math.floor(Math.random() * length);
  return array[randomIndex];
}
