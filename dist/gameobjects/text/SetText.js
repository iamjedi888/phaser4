export function SetText(value, ...text) {
  text.forEach((entity) => {
    entity.setText(value);
  });
}
