import { IAnimationConfig } from './IAnimationConfig';
import { IAnimationFrame } from './IAnimationFrame';

export class Animation
{
    key: string;
    frames: Set<IAnimationFrame>;

    msPerFrame: number;
    frameRate: number;
    duration: number;
    skipMissedFrames: boolean;
    delay: number;
    repeat: number;
    repeatDelay: number;
    yoyo: boolean;
    showOnStart: boolean;
    hideOnComplete: boolean;
    paused: boolean;

    constructor (config: IAnimationConfig)
    {
        const {
            key,
            frames = [],
            frameRate = null,
            duration = null,
            skipMissedFrames = true,
            delay = 0,
            repeat = 0,
            repeatDelay = 0,
            yoyo = false,
            showOnStart = false,
            hideOnComplete = false,
            paused = false
        } = config;

        this.key = key;
        this.skipMissedFrames = skipMissedFrames;
        this.delay = delay;
        this.repeat = repeat;
        this.repeatDelay = repeatDelay;
        this.yoyo = yoyo;
        this.showOnStart = showOnStart;
        this.hideOnComplete = hideOnComplete;
        this.paused = paused;

        this.frames = new Set(frames);

        this.calculateDuration(frameRate, duration);
    }

    calculateDuration (frameRate?: number, duration?: number): this
    {
        const totalFrames = this.frames.size;

        if (!Number.isFinite(duration) && !Number.isFinite(frameRate))
        {
            //  No duration or frameRate given, use default frameRate of 24fps
            this.frameRate = 24;
            this.duration = (24 / totalFrames) * 1000;
        }
        else if (duration && !Number.isFinite(frameRate))
        {
            //  Duration given but no frameRate, so set the frameRate based on duration
            //  I.e. 12 frames in the animation, duration = 4000 ms
            //  So frameRate is 12 / (4000 / 1000) = 3 fps
            this.duration = duration;
            this.frameRate = totalFrames / (duration / 1000);
        }
        else
        {
            //  frameRate given, derive duration from it (even if duration also specified)
            //  I.e. 15 frames in the animation, frameRate = 30 fps
            //  So duration is 15 / 30 = 0.5 * 1000 (half a second, or 500ms)
            this.frameRate = frameRate;
            this.duration = (totalFrames / frameRate) * 1000;
        }

        this.msPerFrame = 1000 / this.frameRate;

        return this;
    }

    getTotalFrames (): number
    {
        return this.frames.size;
    }

    addFrame (frame: IAnimationFrame): this
    {
        this.frames.add(frame);

        return this.calculateDuration(this.frameRate);
    }

    removeFrame (frame: IAnimationFrame): this
    {
        this.frames.delete(frame);

        return this.calculateDuration(this.frameRate);
    }

    destroy (): void
    {
        this.frames.clear();
    }
}
