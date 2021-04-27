import {Mat4FromRotationTranslationScale, Mat4Invert, Mat4Transpose, Matrix4} from "../../../math/mat4";
import {QuatRotateX, QuatRotateY, QuatRotateZ, Quaternion} from "../../../math/quaternion";
import {Vec3Callback, Vec3Forward, Vec3Right, Vec3Up} from "../../../math/vec3";
import {DIRTY_CONST} from "../../../gameobjects/DIRTY_CONST";
export class Transform3DComponent {
  constructor(entity, x = 0, y = 0, z = 0) {
    this.passthru = false;
    this.entity = entity;
    this.local = new Matrix4();
    this.world = new Matrix4();
    this.normal = new Matrix4();
    this.position = new Vec3Callback(() => this.update(), x, y, z);
    this.scale = new Vec3Callback(() => this.update(), 1, 1, 1);
    this.origin = new Vec3Callback(() => this.update());
    this.rotation = new Quaternion();
    this.rotation.onChange = () => this.update();
    this.forward = Vec3Forward();
    this.up = Vec3Up();
    this.right = Vec3Right();
    this.update();
  }
  rotateX(angle) {
    QuatRotateX(this.rotation, angle, this.rotation);
  }
  rotateY(angle) {
    QuatRotateY(this.rotation, angle, this.rotation);
  }
  rotateZ(angle) {
    QuatRotateZ(this.rotation, angle, this.rotation);
  }
  update() {
    const model = this.local;
    const normal = this.normal;
    Mat4FromRotationTranslationScale(this.rotation, this.position, this.scale, model);
    Mat4Invert(model, normal);
    Mat4Transpose(normal, normal);
  }
  updateLocal() {
    this.entity.setDirty(DIRTY_CONST.TRANSFORM, DIRTY_CONST.BOUNDS);
  }
  updateWorld() {
    const entity = this.entity;
    entity.setDirty(DIRTY_CONST.TRANSFORM, DIRTY_CONST.BOUNDS);
    if (entity.numChildren) {
      this.updateChildren();
    }
  }
  updateChildren() {
    const children = this.entity.children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
    }
  }
  destroy() {
    this.position.destroy();
    this.scale.destroy();
    this.origin.destroy();
    this.rotation.destroy();
    this.entity = null;
    this.local = null;
    this.world = null;
    this.position = null;
    this.scale = null;
    this.origin = null;
    this.rotation = null;
  }
}
