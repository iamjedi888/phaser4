export declare class Time {
    lastTick: number;
    elapsed: number;
    delta: number;
    fps: number;
    fpsCount: number;
    frame: number;
    ms: number;
    prevFrame: number;
    constructor();
    update(time: number): void;
    updateDelta(time: number): number;
    resetLastTick(): void;
}
//# sourceMappingURL=Time.d.ts.map