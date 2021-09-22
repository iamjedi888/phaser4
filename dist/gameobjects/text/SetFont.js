export function SetFont(font, ...text) {
  text.forEach((entity) => {
    entity.font = font;
    entity.updateText();
  });
}
