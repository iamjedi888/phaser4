var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { FlushBuffer } from "../../renderer/webgl1/renderpass";
import { GameObject3D } from "../GameObject3D";
import { Material } from "../material/Material";
import { SetTexture as RequestTexture } from "../../renderer/webgl1/renderpass/SetTexture";
import { SetFrame } from "./SetFrame";
import { SetTexture } from "./SetTexture";
export class Mesh extends GameObject3D {
  constructor(x = 0, y = 0, z = 0, geometry, material = new Material()) {
    super(x, y, z);
    __publicField(this, "texture");
    __publicField(this, "frame");
    __publicField(this, "hasTexture", false);
    __publicField(this, "geometry");
    __publicField(this, "material");
    __publicField(this, "cullFaces", true);
    this.geometry = geometry;
    this.material = material;
    this.setTexture("__WHITE");
  }
  setTexture(key, frame) {
    SetTexture(key, frame, this);
    return this;
  }
  setFrame(key) {
    SetFrame(this.texture, key, this);
    return this;
  }
  setMaterial(material) {
    this.material = material;
    return this;
  }
  renderGL(renderPass) {
    const shader = renderPass.currentShader.shader;
    shader.setUniform("uModelMatrix", this.transform.local.data);
    shader.setUniform("uNormalMatrix", this.transform.normal.data);
    if (this.hasTexture) {
      const textureIndex = RequestTexture(renderPass, this.texture);
      shader.setUniform("uTexture", textureIndex);
    }
    this.material.setUniforms(shader);
    FlushBuffer(renderPass, this.geometry.buffer);
  }
  destroy(reparentChildren) {
    super.destroy(reparentChildren);
    this.geometry = null;
    this.material = null;
    this.texture = null;
    this.frame = null;
    this.hasTexture = false;
  }
}
