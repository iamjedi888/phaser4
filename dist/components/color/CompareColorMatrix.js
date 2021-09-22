export function CompareColorMatrix(srcMatrix, srcOffset, targetMatrix, targetOffset) {
  for (let i = 0; i < srcOffset.length; i++) {
    if (srcOffset[i] !== targetOffset[i]) {
      return false;
    }
  }
  for (let i = 0; i < srcMatrix.length; i++) {
    if (srcMatrix[i] !== targetMatrix[i]) {
      return false;
    }
  }
  return true;
}
