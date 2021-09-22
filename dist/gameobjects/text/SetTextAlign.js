export function SetTextAlign(align, ...text) {
  text.forEach((entity) => {
    entity.textAlign = align;
    entity.updateText();
  });
}
