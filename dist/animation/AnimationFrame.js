export class AnimationFrame {
  constructor(texture, frame) {
    this.isFirst = false;
    this.isLast = false;
    this.isKeyFrame = false;
    this.duration = 0;
    this.progress = 0;
    this.texture = texture;
    this.frame = frame;
  }
  destroy() {
    this.texture = null;
    this.frame = null;
    this.nextFrame = null;
    this.prevFrame = null;
  }
}
