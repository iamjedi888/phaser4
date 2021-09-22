var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
export class InputComponent {
  constructor(entity) {
    __publicField(this, "entity");
    __publicField(this, "enabled", false);
    __publicField(this, "enabledChildren", true);
    __publicField(this, "hitArea");
    this.entity = entity;
  }
  destroy() {
    this.entity = null;
    this.hitArea = null;
  }
}
