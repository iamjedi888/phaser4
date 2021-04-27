import {Flush, PopShader, SetShader} from "../renderer/webgl1/renderpass";
import {Light} from "../gameobjects3d/light/Light";
import {AmbientLightShader} from "../renderer/webgl1/shaders/AmbientLightShader";
import {BaseWorld3D} from "./BaseWorld3D";
import {CreateWorld3DRenderData} from "./CreateWorld3DRenderData";
import {NewCamera3D} from "../camera3d/NewCamera3D";
export class World3D extends BaseWorld3D {
  constructor(scene, x = 0, y = 0, z = 0, lightConfig) {
    super(scene);
    this.enableCameraCull = true;
    this.type = "World3D";
    this.camera = new NewCamera3D();
    this.camera.position.set(x, y, z);
    this.light = new Light(lightConfig);
    this.shader = new AmbientLightShader();
    this.renderData = CreateWorld3DRenderData(this, this.camera);
  }
  renderGL(renderPass) {
    Flush(renderPass);
    const shader = this.shader;
    const camera = this.camera;
    const gl = renderPass.renderer.gl;
    SetShader(renderPass, shader, 0);
    shader.setUniform("uViewProjectionMatrix", camera.viewProjectionMatrix.data);
    shader.setUniform("uCameraPosition", camera.position.toArray());
    this.light.setUniforms(shader);
    gl.enable(gl.DEPTH_TEST);
    this.renderList.forEach((entry) => {
      if (entry.children.length > 0) {
        this.renderNode(entry, renderPass);
      } else {
        entry.node.renderGL(renderPass);
      }
    });
  }
  postRenderGL(renderPass) {
    const gl = renderPass.renderer.gl;
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);
    PopShader(renderPass);
  }
}
