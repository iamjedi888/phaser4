export function SetLineDash(segments, ...text) {
  text.forEach((entity) => {
    entity.lineDash = segments;
    entity.updateText();
  });
}
