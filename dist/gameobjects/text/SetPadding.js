export function SetPadding(left, right, top, bottom, ...text) {
  text.forEach((entity) => {
    const padding = entity.padding;
    padding.left = left;
    padding.right = right;
    padding.top = top;
    padding.bottom = bottom;
    entity.updateText();
  });
}
