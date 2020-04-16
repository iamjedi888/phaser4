import Sprite from '../sprite/Sprite';
export default class AnimatedSprite extends Sprite {
    constructor(x, y, texture, frame) {
        super(x, y, texture, frame);
        this.type = 'AnimatedSprite';
        this.anims = new Map();
        //  Holds all the data for the current animation only
        this.animData = {
            currentAnim: '',
            currentFrames: [],
            frameIndex: 0,
            animSpeed: 0,
            nextFrameTime: 0,
            repeatCount: 0,
            isPlaying: false,
            yoyo: false,
            pendingStart: false,
            playingForward: true,
            delay: 0,
            repeatDelay: 0,
            onStart: null,
            onRepeat: null,
            onComplete: null
        };
    }
    stop() {
        const data = this.animData;
        data.isPlaying = false;
        data.currentAnim = '';
        if (data.onComplete) {
            data.onComplete(this, data.currentAnim);
        }
        return this;
    }
    nextFrame() {
        const data = this.animData;
        data.frameIndex++;
        //  There are no more frames, do we yoyo or repeat or end?
        if (data.frameIndex === data.currentFrames.length) {
            if (data.yoyo) {
                data.frameIndex--;
                data.playingForward = false;
            }
            else if (data.repeatCount === -1 || data.repeatCount > 0) {
                data.frameIndex = 0;
                if (data.repeatCount !== -1) {
                    data.repeatCount--;
                }
                if (data.onRepeat) {
                    data.onRepeat(this, data.currentAnim);
                }
                data.nextFrameTime += data.repeatDelay;
            }
            else {
                data.frameIndex--;
                return this.stop();
            }
        }
        this.setFrame(data.currentFrames[data.frameIndex]);
        data.nextFrameTime += data.animSpeed;
        return this;
    }
    prevFrame() {
        const data = this.animData;
        data.frameIndex--;
        //  There are no more frames, do we repeat or end?
        if (data.frameIndex === -1) {
            if (data.repeatCount === -1 || data.repeatCount > 0) {
                data.frameIndex = 0;
                data.playingForward = true;
                if (data.repeatCount !== -1) {
                    data.repeatCount--;
                }
                if (data.onRepeat) {
                    data.onRepeat(this, data.currentAnim);
                }
                data.nextFrameTime += data.repeatDelay;
            }
            else {
                data.frameIndex = 0;
                return this.stop();
            }
        }
        this.setFrame(data.currentFrames[data.frameIndex]);
        data.nextFrameTime += data.animSpeed;
        return this;
    }
    update(delta, now) {
        super.update(delta, now);
        const data = this.animData;
        if (!data.isPlaying) {
            return;
        }
        data.nextFrameTime -= delta * 1000;
        //  Clamp to zero, otherwise a huge delta could cause animation playback issues
        data.nextFrameTime = Math.max(data.nextFrameTime, 0);
        //  It's time for a new frame
        if (data.nextFrameTime === 0) {
            //  Is this the start of our animation?
            if (data.pendingStart) {
                if (data.onStart) {
                    data.onStart(this, data.currentAnim);
                }
                data.pendingStart = false;
                data.nextFrameTime = data.animSpeed;
            }
            else if (data.playingForward) {
                this.nextFrame();
            }
            else {
                this.prevFrame();
            }
        }
    }
    get isPlaying() {
        return this.animData.isPlaying;
    }
    get isPlayingForward() {
        return (this.animData.isPlaying && this.animData.playingForward);
    }
    get currentAnimation() {
        return this.animData.currentAnim;
    }
    destroy(reparentChildren) {
        super.destroy(reparentChildren);
        this.anims.clear();
        this.animData = null;
    }
}
//# sourceMappingURL=AnimatedSprite.js.map