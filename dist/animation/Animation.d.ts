import { IAnimation } from './IAnimation';
import { IAnimationConfig } from './IAnimationConfig';
import { IAnimationFrame } from './IAnimationFrame';
export declare class Animation implements IAnimation {
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
    constructor(config: IAnimationConfig);
    getTotalFrames(): number;
    destroy(): void;
}
//# sourceMappingURL=Animation.d.ts.map