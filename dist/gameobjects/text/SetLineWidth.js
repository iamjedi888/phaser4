export function SetLineWidth(width, ...text) {
  text.forEach((entity) => {
    entity.lineWidth = width;
    entity.updateText();
  });
}
