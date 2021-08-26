import { GameInstance } from '../../GameInstance';
import { RenderStats } from '../../scenes/RenderStats';

export class Time
{
    lastTick: number = 0;
    elapsed: number = 0;
    delta: number = 0;
    fps: number = 0;
    fpsCount: number = 0;
    frame: number = 0;
    ms: number = 0;
    prevFrame: number = 0;

    constructor ()
    {
        const now = performance.now();

        this.lastTick = now;
        this.prevFrame = now;
    }

    update (time: number): void
    {
        this.ms = time - this.lastTick;
    }

    updateDelta (time: number): number
    {
        //  Note that privacy.resistFingerprinting can round this value to 100us or more!
        const now = performance.now();

        //  How long it took to process this frame
        const delta = now - time;

        this.fpsCount++;

        if (now >= this.prevFrame + 1000)
        {
            this.fps = (this.fpsCount * 1000) / (now - this.prevFrame);
            this.prevFrame = now;
            this.fpsCount = 0;
        }

        this.lastTick = now;
        this.elapsed += delta;
        this.delta = delta;
        this.frame++;

        GameInstance.setFrame(this.frame);

        RenderStats.fps = this.fps;
        RenderStats.delta = delta;

        return this.frame;
    }

    resetLastTick (): void
    {
        this.lastTick = performance.now();
    }
}
