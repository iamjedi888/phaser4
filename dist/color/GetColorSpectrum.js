import { Color } from "./Color";
export function GetColorSpectrum(limit = 1024) {
  const colors = [];
  const range = 255;
  let i;
  let r = 255;
  let g = 0;
  let b = 0;
  for (i = 0; i <= range; i++) {
    colors.push(new Color(r, i, b));
  }
  g = 255;
  for (i = range; i >= 0; i--) {
    colors.push(new Color(i, g, b));
  }
  r = 0;
  for (i = 0; i <= range; i++, g--) {
    colors.push(new Color(r, g, i));
  }
  g = 0;
  b = 255;
  for (i = 0; i <= range; i++, b--, r++) {
    colors.push(new Color(r, g, b));
  }
  if (limit === 1024) {
    return colors;
  } else {
    const out = [];
    let t = 0;
    const inc = 1024 / limit;
    for (i = 0; i < limit; i++) {
      out.push(colors[Math.floor(t)]);
      t += inc;
    }
    return out;
  }
}
