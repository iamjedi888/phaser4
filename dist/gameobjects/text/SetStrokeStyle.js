export function SetStrokeStyle(style, lineWidth, ...text) {
  text.forEach((entity) => {
    entity.strokeStyle = style;
    if (lineWidth) {
      entity.lineWidth = lineWidth;
    }
    entity.updateText();
  });
}
