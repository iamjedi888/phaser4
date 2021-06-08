var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { Clamp } from "../../math";
import { RGBCallback } from "../../math/vec3";
export class Material {
  constructor(config = {}) {
    __publicField(this, "ambient");
    __publicField(this, "diffuse");
    __publicField(this, "specular");
    __publicField(this, "isDirty", false);
    __publicField(this, "_shine");
    const {
      ambient = [1, 1, 1],
      diffuse = [1, 1, 1],
      specular = [1, 1, 1],
      shine = 0.25
    } = config;
    const onChange = () => this.update();
    this.ambient = new RGBCallback(onChange).fromArray(ambient);
    this.diffuse = new RGBCallback(onChange).fromArray(diffuse);
    this.specular = new RGBCallback(onChange).fromArray(specular);
    this._shine = shine;
  }
  get shine() {
    return this._shine;
  }
  set shine(value) {
    this._shine = Clamp(value, 0, 1);
    this.isDirty = true;
  }
  update() {
    this.isDirty = true;
  }
  setUniforms(shader) {
    shader.setUniform("uMaterialAmbient", this.ambient.toArray());
    shader.setUniform("uMaterialDiffuse", this.diffuse.toArray());
    shader.setUniform("uMaterialSpecular", this.specular.toArray());
    shader.setUniform("uMaterialShine", this._shine * 256);
  }
  destroy() {
    this.ambient.destroy();
    this.diffuse.destroy();
    this.specular.destroy();
  }
}
