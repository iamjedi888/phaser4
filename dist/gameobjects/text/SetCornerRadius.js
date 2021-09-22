export function SetCornerRadius(cornerRadius, ...text) {
  text.forEach((entity) => {
    entity.cornerRadius = cornerRadius;
    entity.updateText();
  });
}
