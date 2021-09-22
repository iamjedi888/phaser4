export function SetFilter(linear, ...textures) {
  textures.forEach((texture) => {
    if (texture.binding) {
      texture.binding.setFilter(linear);
    }
  });
  return textures;
}
