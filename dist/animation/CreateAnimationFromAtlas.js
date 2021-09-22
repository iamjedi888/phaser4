var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
import { Animation } from "./Animation";
import { AnimationFrame } from "./AnimationFrame";
import { GetFramesInRange } from "../textures/GetFramesInRange";
import { GetTexture } from "../textures/GetTexture";
import { Texture } from "../textures/Texture";
export function CreateAnimationFromAtlas(config) {
  const texture = config.texture instanceof Texture ? config.texture : GetTexture(config.texture);
  const frames = [];
  GetFramesInRange(texture, config).forEach((frame) => {
    frames.push(new AnimationFrame(texture, frame));
  });
  return new Animation(__spreadValues({ frames }, config));
}
