import { gl } from "../GL";
export function CreateAttributes(program, config) {
  const attributes = new Map();
  const defaultSettings = {
    size: 1,
    type: gl.FLOAT,
    normalized: false,
    stride: 0,
    offset: 0
  };
  const total = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
  for (let i = 0; i < total; i++) {
    const attrib = gl.getActiveAttrib(program, i);
    if (!attrib) {
      break;
    }
    const name = attrib.name;
    const index = gl.getAttribLocation(program, name);
    gl.enableVertexAttribArray(index);
    const setting = config.hasOwnProperty(name) ? config[name] : {};
    const {
      size = defaultSettings.size,
      type = defaultSettings.type,
      normalized = defaultSettings.normalized,
      stride = defaultSettings.stride,
      offset = defaultSettings.offset
    } = setting;
    attributes.set(name, { index, size, type, normalized, stride, offset });
  }
  return attributes;
}
