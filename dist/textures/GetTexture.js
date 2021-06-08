import { TextureManagerInstance } from "./TextureManagerInstance";
export function GetTexture(key) {
  return TextureManagerInstance.get().get(key);
}
