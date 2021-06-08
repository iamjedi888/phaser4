var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { CreateAnimData } from "../../animation/CreateAnimData";
import { Sprite } from "../sprite/Sprite";
export class AnimatedSprite extends Sprite {
  constructor(x, y, texture, frame) {
    super(x, y, texture, frame);
    __publicField(this, "currentAnimation");
    __publicField(this, "currentFrame");
    __publicField(this, "animData");
    __publicField(this, "hasStarted", false);
    __publicField(this, "forward", true);
    __publicField(this, "inReverse", false);
    __publicField(this, "accumulator", 0);
    __publicField(this, "nextTick", 0);
    __publicField(this, "delayCounter", 0);
    __publicField(this, "repeatCounter", 0);
    __publicField(this, "pendingRepeat", false);
    __publicField(this, "paused", false);
    __publicField(this, "wasPlaying", false);
    __publicField(this, "pendingStop", 0);
    __publicField(this, "pendingStopValue", 0);
    this.currentAnimation;
    this.animData = CreateAnimData();
  }
  handleStart() {
    if (this.animData.showOnStart) {
      this.visible = true;
    }
    this.setCurrentFrame(this.currentFrame);
    this.hasStarted = true;
  }
  handleRepeat() {
    this.pendingRepeat = false;
  }
  handleStop() {
    this.pendingStop = 0;
    this.animData.isPlaying = false;
  }
  handleComplete() {
    this.pendingStop = 0;
    this.animData.isPlaying = false;
    if (this.animData.hideOnComplete) {
      this.visible = false;
    }
  }
  reverse() {
    if (this.isPlaying) {
      this.inReverse = !this.inReverse;
      this.forward = !this.forward;
    }
    return this;
  }
  getProgress() {
    const frame = this.currentFrame;
    if (!frame) {
      return 0;
    }
    let p = frame.progress;
    if (this.inReverse) {
      p *= -1;
    }
    return p;
  }
  stop() {
    this.pendingStop = 0;
    this.animData.isPlaying = false;
    if (this.currentAnimation) {
      this.handleStop();
    }
    return this;
  }
  update(delta, now) {
    super.update(delta, now);
    const data = this.animData;
    const anim = this.currentAnimation;
    if (!anim || !data.isPlaying || anim.paused) {
      return;
    }
    this.accumulator += delta * data.timeScale;
    if (this.pendingStop === 1) {
      this.pendingStopValue -= delta;
      if (this.pendingStopValue <= 0) {
        this.stop();
        return;
      }
    }
    if (!this.hasStarted) {
      if (this.accumulator >= this.delayCounter) {
        this.accumulator -= this.delayCounter;
        this.handleStart();
      }
    } else if (this.accumulator >= this.nextTick) {
      if (this.forward) {
        this.nextFrame();
      } else {
        this.prevFrame();
      }
      if (data.isPlaying && this.pendingStop === 0 && anim.skipMissedFrames && this.accumulator > this.nextTick) {
        let safetyNet = 0;
        do {
          if (this.forward) {
            this.nextFrame();
          } else {
            this.prevFrame();
          }
          safetyNet++;
        } while (data.isPlaying && this.accumulator > this.nextTick && safetyNet < 60);
      }
    }
  }
  nextFrame() {
    const frame = this.currentFrame;
    const data = this.animData;
    if (frame.isLast) {
      if (data.yoyo) {
        this.handleYoyoFrame(false);
      } else if (this.repeatCounter > 0) {
        if (this.inReverse && this.forward) {
          this.forward = false;
        } else {
          this.repeatAnimation();
        }
      } else {
        this.complete();
      }
    } else {
      this.setCurrentFrame(this.currentFrame.nextFrame);
      this.getNextTick();
    }
    return this;
  }
  repeatAnimation() {
    if (this.pendingStop === 2) {
      if (this.pendingStopValue === 0) {
        return this.stop();
      } else {
        this.pendingStopValue--;
      }
    }
    const data = this.animData;
    if (data.repeatDelay > 0 && !this.pendingRepeat) {
      this.pendingRepeat = true;
      this.accumulator -= this.nextTick;
      this.nextTick += data.repeatDelay;
    } else {
      this.repeatCounter--;
      if (this.forward) {
        this.setCurrentFrame(this.currentFrame.nextFrame);
      } else {
        this.setCurrentFrame(this.currentFrame.prevFrame);
      }
      if (this.isPlaying) {
        this.getNextTick();
        this.handleRepeat();
      }
    }
  }
  setCurrentFrame(animFrame) {
    this.currentFrame = animFrame;
    this.setTexture(animFrame.texture, animFrame.frame);
  }
  getNextTick() {
    this.accumulator -= this.nextTick;
    this.nextTick = this.currentAnimation.msPerFrame + this.currentFrame.duration;
  }
  handleYoyoFrame(isReverse = false) {
    const animData = this.animData;
    if (this.inReverse === !isReverse && this.repeatCounter > 0) {
      if (animData.repeatDelay === 0 || this.pendingRepeat) {
        this.forward = isReverse;
      }
      this.repeatAnimation();
      return;
    }
    if (this.inReverse !== isReverse && this.repeatCounter === 0) {
      this.complete();
      return;
    }
    this.forward = isReverse;
    if (isReverse) {
      this.setCurrentFrame(this.currentFrame.nextFrame);
    } else {
      this.setCurrentFrame(this.currentFrame.prevFrame);
    }
    this.getNextTick();
  }
  prevFrame() {
    const frame = this.currentFrame;
    const animData = this.animData;
    if (frame.isFirst) {
      if (animData.yoyo) {
        this.handleYoyoFrame(true);
      } else if (this.repeatCounter > 0) {
        if (this.inReverse && !this.forward) {
          this.repeatAnimation();
        } else {
          this.forward = true;
          this.repeatAnimation();
        }
      } else {
        this.complete();
      }
    } else {
      this.setCurrentFrame(frame.prevFrame);
      this.getNextTick();
    }
    return this;
  }
  complete() {
    this.pendingStop = 0;
    this.animData.isPlaying = false;
    if (this.currentAnimation) {
      this.handleComplete();
    }
  }
  play() {
    const data = this.animData;
    if (data.repeat === -1) {
      this.repeatCounter = Number.MAX_VALUE;
    }
    data.isPlaying = true;
    if (data.delay === 0) {
      this.setTexture(this.currentFrame.texture, this.currentFrame.frame);
      if (data.onStart) {
        data.onStart(this, this.currentAnimation);
      }
    } else {
      data.pendingStart = true;
    }
    return this;
  }
  pause(atFrame) {
    if (!this.paused) {
      this.paused = true;
      this.wasPlaying = this.isPlaying;
      this.animData.isPlaying = false;
    }
    if (atFrame) {
      this.setCurrentFrame(atFrame);
    }
    return this;
  }
  resume(fromFrame) {
    if (this.paused) {
      this.paused = false;
      this.animData.isPlaying = this.wasPlaying;
    }
    if (fromFrame) {
      this.setCurrentFrame(fromFrame);
    }
    return this;
  }
  get isPlaying() {
    return this.animData.isPlaying;
  }
  get isPlayingForward() {
    return this.animData.isPlaying && this.forward;
  }
  destroy(reparentChildren) {
    super.destroy(reparentChildren);
    this.animData = null;
  }
}
