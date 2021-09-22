function GetValue(node, attribute) {
  return parseInt(node.getAttribute(attribute), 10);
}
export function BitmapTextParser(texture, xml, frame) {
  const xSpacing = 0;
  const ySpacing = 0;
  const info = xml.getElementsByTagName("info")[0];
  const common = xml.getElementsByTagName("common")[0];
  const data = {
    font: info.getAttribute("face"),
    size: GetValue(info, "size"),
    lineHeight: GetValue(common, "lineHeight") + ySpacing,
    chars: {}
  };
  const letters = xml.getElementsByTagName("char");
  for (let i = 0; i < letters.length; i++) {
    const node = letters[i];
    const charCode = GetValue(node, "id");
    const x = GetValue(node, "x");
    const y = GetValue(node, "y");
    const width = GetValue(node, "width");
    const height = GetValue(node, "height");
    data.chars[charCode] = {
      x,
      y,
      width,
      height,
      xOffset: GetValue(node, "xoffset"),
      yOffset: GetValue(node, "yoffset"),
      xAdvance: GetValue(node, "xadvance") + xSpacing,
      kerning: {}
    };
    texture.addFrame(charCode, x, y, width, height);
  }
  const kernings = xml.getElementsByTagName("kerning");
  for (let i = 0; i < kernings.length; i++) {
    const kern = kernings[i];
    const first = GetValue(kern, "first");
    const second = GetValue(kern, "second");
    const amount = GetValue(kern, "amount");
    data.chars[second].kerning[first] = amount;
  }
  return data;
}
