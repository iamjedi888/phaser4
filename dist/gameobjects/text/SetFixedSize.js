export function SetFixedSize(width, height, ...text) {
  text.forEach((entity) => {
    entity.fixedWidth = width;
    entity.fixedHeight = height;
    entity.updateText();
  });
}
