import { IAnimationFrame } from './IAnimationFrame';

export interface IAnimation
{
    key: string;
    frames: Set<IAnimationFrame>;
    firstFrame: IAnimationFrame;
    msPerFrame: number;
    frameRate: number;
    duration: number;
    skipMissedFrames: boolean;
    delay: number;
    hold: number;
    repeat: number;
    repeatDelay: number;
    yoyo: boolean;
    showOnStart: boolean;
    hideOnComplete: boolean;
    paused: boolean;

    getTotalFrames (): number;
    destroy (): void;
}
