export function GetFramesInRange(texture, config) {
  const {
    prefix = "",
    start = 0,
    zeroPad = 0,
    suffix = ""
  } = config;
  let end = config.end;
  const output = [];
  const diff = start < end ? 1 : -1;
  end += diff;
  for (let i = start; i !== end; i += diff) {
    const frameKey = prefix + i.toString().padStart(zeroPad, "0") + suffix;
    output.push(texture.getFrame(frameKey));
  }
  return output;
}
