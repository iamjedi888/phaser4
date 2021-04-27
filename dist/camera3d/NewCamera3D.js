import {Clamp, DegToRad} from "../math";
import {FORWARD, RIGHT, UP, Vec3, Vec3Callback, Vec3Forward, Vec3Right, Vec3ScaleAndAdd, Vec3TransformMat4Zero, Vec3Up} from "../math/vec3";
import {Mat4FromRotationXYTranslation, Mat4Invert, Mat4Multiply, Mat4Perspective, Matrix4} from "../math/mat4";
import {QuatRotationYawPitchRoll, Quaternion} from "../math/quaternion";
import {GameInstance} from "../GameInstance";
import {Rectangle} from "../geom/rectangle";
export class NewCamera3D {
  constructor(fov = 45, near = 0.1, far = 1e3) {
    this.isOrbit = false;
    this.minDistance = 0;
    this.maxDistance = Infinity;
    this.minPolarAngle = 0;
    this.maxPolarAngle = Math.PI;
    this.minAzimuthAngle = -Infinity;
    this.maxAzimuthAngle = Infinity;
    this.dirtyRender = true;
    this.panRate = 5;
    this.zoomRate = 200;
    this.rotateRate = -3;
    this._yaw = 0;
    this._pitch = 0;
    this._roll = 0;
    this.type = "Camera3D";
    this._fov = fov;
    this._near = near;
    this._far = far;
    this.matrix = new Matrix4();
    this.viewMatrix = new Matrix4();
    this.projectionMatrix = new Matrix4();
    this.viewProjectionMatrix = new Matrix4();
    this.position = new Vec3Callback(() => this.update());
    this.rotation = new Quaternion();
    const game = GameInstance.get();
    const renderer = game.renderer;
    this.viewport = new Rectangle(0, 0, renderer.width, renderer.height);
    this.renderer = renderer;
    this.forward = Vec3Forward();
    this.up = Vec3Up();
    this.right = Vec3Right();
    this.start = new Vec3();
    this.setAspectRatio();
  }
  update() {
    const matrix = this.matrix;
    const view = this.viewMatrix;
    Mat4FromRotationXYTranslation(this.rotation, this.position, !this.isOrbit, matrix);
    Vec3TransformMat4Zero(FORWARD, matrix, this.forward);
    Vec3TransformMat4Zero(UP, matrix, this.up);
    Vec3TransformMat4Zero(RIGHT, matrix, this.right);
    Mat4Invert(matrix, view);
    Mat4Multiply(this.projectionMatrix, view, this.viewProjectionMatrix);
    return this;
  }
  panX(amount) {
    const pos = this.position;
    if (!this.isOrbit) {
      Vec3ScaleAndAdd(pos, this.right, amount, pos);
    }
    return this;
  }
  panY(amount) {
    const pos = this.position;
    const up = this.up;
    if (this.isOrbit) {
      pos.y += up.y * amount;
    } else {
      Vec3ScaleAndAdd(pos, up, amount, pos);
    }
    return this;
  }
  panZ(amount) {
    const pos = this.position;
    if (this.isOrbit) {
      pos.z += amount;
    } else {
      Vec3ScaleAndAdd(pos, this.forward, amount, pos);
    }
    return this;
  }
  begin(x, y) {
    this.start.set(x, y);
  }
  pan(x, y) {
    const dx = x - this.start.x;
    const dy = y - this.start.y;
    const viewport = this.viewport;
    this.panX(-dx * (this.panRate / viewport.width));
    this.panY(dy * (this.panRate / viewport.height));
    this.start.set(x, y);
  }
  rotate(x, y) {
    const dx = x - this.start.x;
    const dy = y - this.start.y;
    const viewport = this.viewport;
    this.rotation.x += dy * (this.rotateRate / viewport.height);
    this.rotation.y += dx * (this.rotateRate / viewport.width);
    this.start.set(x, y);
    this.update();
  }
  zoom(delta) {
    this.panZ(Clamp(delta, -1, 1) * (this.zoomRate / this.viewport.height));
  }
  setAspectRatio(value) {
    if (!value) {
      const renderer = this.renderer;
      value = renderer.width / renderer.height;
    }
    this.aspect = value;
    return this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    Mat4Perspective(DegToRad(this._fov), this.aspect, this._near, this._far, this.projectionMatrix);
    return this;
  }
  get fov() {
    return this._fov;
  }
  set fov(value) {
    this._fov = Clamp(value, 0, 180);
    this.updateProjectionMatrix();
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
  get yaw() {
    return this._yaw;
  }
  set yaw(value) {
    this._yaw = value;
    QuatRotationYawPitchRoll(value, this._pitch, this._roll, this.rotation);
  }
  get pitch() {
    return this._pitch;
  }
  set pitch(value) {
    this._pitch = value;
    QuatRotationYawPitchRoll(this._yaw, value, this._roll, this.rotation);
  }
  get roll() {
    return this._roll;
  }
  set roll(value) {
    this._roll = value;
    QuatRotationYawPitchRoll(this._yaw, this._pitch, value, this.rotation);
  }
}
