var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { Mat4LookAt, Mat4Perspective, Mat4TranslateFromFloats, Matrix4 } from "../math/mat4";
import { QuatSetAxisAngle, Quaternion } from "../math/quaternion";
import { UP, Vec3, Vec3Add, Vec3Callback, Vec3CrossNormalize, Vec3Left, Vec3Normalize, Vec3Subtract, Vec3TransformQuat, Vec3Up } from "../math/vec3";
import { DegToRad } from "../math";
import { GameInstance } from "../GameInstance";
export class Camera3D {
  constructor(x = 0, y = 0, z = 0, fov = 45, near = 0.1, far = 1e3) {
    __publicField(this, "type");
    __publicField(this, "renderer");
    __publicField(this, "position");
    __publicField(this, "direction");
    __publicField(this, "up");
    __publicField(this, "left");
    __publicField(this, "aspectRatio");
    __publicField(this, "viewMatrix");
    __publicField(this, "projectionMatrix");
    __publicField(this, "dirtyRender", true);
    __publicField(this, "_lookAtPosition");
    __publicField(this, "_lookAtView");
    __publicField(this, "_axis");
    __publicField(this, "_fov");
    __publicField(this, "_near");
    __publicField(this, "_far");
    const game = GameInstance.get();
    this.renderer = game.renderer;
    this.position = new Vec3Callback(() => this.update(), x, y, z);
    this.direction = new Vec3Callback(() => this.update(), 0, 1, 0);
    this._lookAtPosition = new Vec3();
    this._lookAtView = new Matrix4();
    this._axis = new Quaternion();
    this.up = Vec3Up();
    this.left = Vec3Left();
    this._fov = fov;
    this._near = near;
    this._far = far;
    this.aspectRatio = this.renderer.width / this.renderer.height;
    this.viewMatrix = new Matrix4();
    this.projectionMatrix = Mat4Perspective(DegToRad(fov), this.aspectRatio, near, far);
    this.lookAt(new Vec3());
  }
  updateProjectionMatrix() {
    Mat4Perspective(DegToRad(this._fov), this.aspectRatio, this._near, this._far, this.projectionMatrix);
    return this;
  }
  lookAt(point) {
    const pos = this.position;
    const dir = this.direction;
    const left = this.left;
    Vec3Subtract(point, pos, dir);
    Vec3Normalize(dir, dir);
    Vec3CrossNormalize(UP, dir, left);
    Vec3CrossNormalize(dir, left, this.up);
    return this.update();
  }
  rotateOnAxis(axisVec, angle) {
    const dir = this.direction;
    const left = this.left;
    const up = this.up;
    const q = QuatSetAxisAngle(axisVec, angle, this._axis);
    Vec3TransformQuat(dir, q, dir);
    Vec3TransformQuat(left, q, left);
    Vec3TransformQuat(up, q, up);
    Vec3Normalize(up, up);
    Vec3Normalize(left, left);
    Vec3Normalize(dir, dir);
    return this.update();
  }
  yaw(angle) {
    return this.rotateOnAxis(this.up, angle);
  }
  pitch(angle) {
    return this.rotateOnAxis(this.left, angle);
  }
  roll(angle) {
    return this.rotateOnAxis(this.direction, angle);
  }
  forward(s) {
    const pos = this.position;
    const { x: px, y: py, z: pz } = pos;
    const { x: dx, y: dy, z: dz } = this.direction;
    pos.set(px - s * dx, py - s * dy, pz - s * dz);
    return this.update();
  }
  update() {
    const lookPosition = this._lookAtPosition;
    const lookView = this._lookAtView;
    const pos = this.position;
    Vec3Add(pos, this.direction, lookPosition);
    Mat4LookAt(pos, lookPosition, this.up, lookView);
    Mat4TranslateFromFloats(lookView, -pos.x, -pos.y, -pos.z, this.viewMatrix);
    return this;
  }
  reset() {
  }
  destroy() {
    this.position.destroy();
    this.direction.destroy();
    this.up = null;
    this.left = null;
    this.viewMatrix = null;
    this.projectionMatrix = null;
    this._lookAtPosition = null;
    this._lookAtView = null;
    this._axis = null;
  }
  get fov() {
    return this._fov;
  }
  set fov(value) {
    if (value > 0 && value < 180) {
      this._fov = value;
      this.updateProjectionMatrix();
    }
  }
  get near() {
    return this._near;
  }
  set near(value) {
    if (value > 0) {
      this._near = value;
      this.updateProjectionMatrix();
    }
  }
  get far() {
    return this._far;
  }
  set far(value) {
    if (value > 0) {
      this._far = value;
      this.updateProjectionMatrix();
    }
  }
}
