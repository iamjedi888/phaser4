export function SetBackgroundStyle(style, cornerRadius, ...text) {
  text.forEach((entity) => {
    entity.backgroundStyle = style;
    if (cornerRadius !== null) {
      entity.cornerRadius = cornerRadius;
    }
    entity.updateText();
  });
}
