import { WebGLRendererInstance } from "../WebGLRendererInstance";
export function GetCompressedTextureName(baseFormat, format) {
  const renderer = WebGLRendererInstance.get();
  if (renderer) {
    const supportedFormats = renderer.compression[baseFormat.toUpperCase()];
    if (format in supportedFormats) {
      return supportedFormats[format];
    }
  }
}
