export function SetLineSpacing(spacing, ...text) {
  text.forEach((entity) => {
    entity.lineSpacing = spacing;
    entity.updateText();
  });
}
