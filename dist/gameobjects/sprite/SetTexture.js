import {Frame} from "../../textures/Frame";
import {GetTexture} from "../../textures/GetTexture";
import {SetFrame} from "./SetFrame";
import {Texture} from "../../textures/Texture";
export function SetTexture(key, frame, ...children) {
  if (!key) {
    children.forEach((child) => {
      child.texture = null;
      child.frame = null;
      child.hasTexture = false;
    });
  } else {
    let texture;
    if (key instanceof Frame) {
      frame = key;
      texture = key.texture;
    } else if (key instanceof Texture) {
      texture = key;
    } else {
      texture = GetTexture(key);
    }
    if (!texture) {
      console.warn(`Invalid Texture key: ${key}`);
    } else {
      children.forEach((child) => {
        child.texture = texture;
      });
      SetFrame(texture, frame, ...children);
    }
  }
  return children;
}
