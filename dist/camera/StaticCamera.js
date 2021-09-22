var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { BaseCamera } from "./BaseCamera";
import { ClearDirtyTransform } from "../components/dirty/ClearDirtyTransform";
import { HasDirtyTransform } from "../components/dirty/HasDirtyTransform";
export class StaticCamera extends BaseCamera {
  constructor(width, height) {
    super(width, height);
    __publicField(this, "type", "StaticCamera");
  }
  preRender() {
    const id = this.id;
    if (HasDirtyTransform(id)) {
      this.isDirty = true;
      ClearDirtyTransform(id);
      return true;
    }
    return false;
  }
}
