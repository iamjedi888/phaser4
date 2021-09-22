export function GetKeyDownDuration(key) {
  if (key.isDown) {
    return key.timeUpdated - key.timeDown;
  } else {
    return key.timeUp - key.timeDown;
  }
}
