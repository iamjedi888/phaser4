var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { GameObject } from "../GameObject";
import { SetWillCacheChildren } from "../../components/permissions/SetWillCacheChildren";
import { SetWillTransformChildren } from "../../components/permissions/SetWillTransformChildren";
export class Layer extends GameObject {
  constructor() {
    super();
    __publicField(this, "type", "Layer");
    const id = this.id;
    SetWillTransformChildren(id, false);
    SetWillCacheChildren(id, false);
  }
}
