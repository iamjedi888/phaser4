import {FlushBuffer} from "../../renderer/webgl1/renderpass";
import {GameObject3D} from "../GameObject3D";
import {Material} from "../material/Material";
import {SetTexture as RequestTexture} from "../../renderer/webgl1/renderpass/SetTexture";
import {SetFrame} from "./SetFrame";
import {SetTexture} from "./SetTexture";
export class Mesh extends GameObject3D {
  constructor(x = 0, y = 0, z = 0, geometry, material = new Material()) {
    super(x, y, z);
    this.hasTexture = false;
    this.cullFaces = true;
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
