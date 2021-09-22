export function FromRotationMatrix(e, m, order = e.order) {
  const data = m.data;
  let x = 0;
  let y = 0;
  let z = 0;
  const epsilon = 0.99999;
  switch (order) {
    case "XYZ": {
      y = Math.asin(Math.min(Math.max(data[8], -1), 1));
      if (Math.abs(data[8]) < epsilon) {
        x = Math.atan2(-data[9], data[10]);
        z = Math.atan2(-data[4], data[0]);
      } else {
        x = Math.atan2(data[6], data[5]);
      }
      break;
    }
    case "YXZ": {
      x = Math.asin(-Math.min(Math.max(data[9], -1), 1));
      if (Math.abs(data[9]) < epsilon) {
        y = Math.atan2(data[8], data[10]);
        z = Math.atan2(data[1], data[5]);
      } else {
        y = Math.atan2(-data[2], data[0]);
      }
      break;
    }
    case "ZXY": {
      x = Math.asin(Math.min(Math.max(data[6], -1), 1));
      if (Math.abs(data[6]) < epsilon) {
        y = Math.atan2(-data[2], data[10]);
        z = Math.atan2(-data[4], data[5]);
      } else {
        z = Math.atan2(data[1], data[0]);
      }
      break;
    }
    case "ZYX": {
      y = Math.asin(-Math.min(Math.max(data[2], -1), 1));
      if (Math.abs(data[2]) < epsilon) {
        x = Math.atan2(data[6], data[10]);
        z = Math.atan2(data[1], data[0]);
      } else {
        z = Math.atan2(-data[4], data[5]);
      }
      break;
    }
    case "YZX": {
      z = Math.asin(Math.min(Math.max(data[1], -1), 1));
      if (Math.abs(data[1]) < epsilon) {
        x = Math.atan2(-data[9], data[5]);
        y = Math.atan2(-data[2], data[0]);
      } else {
        y = Math.atan2(data[8], data[10]);
      }
      break;
    }
    case "XZY": {
      z = Math.asin(-Math.min(Math.max(data[4], -1), 1));
      if (Math.abs(data[4]) < epsilon) {
        x = Math.atan2(data[6], data[5]);
        y = Math.atan2(data[8], data[0]);
      } else {
        x = Math.atan2(-data[9], data[10]);
      }
      break;
    }
  }
  return e.set(x, y, z);
}
