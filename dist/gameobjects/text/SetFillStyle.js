export function SetFillStyle(style, ...text) {
  text.forEach((entity) => {
    entity.fillStyle = style;
    entity.updateText();
  });
}
