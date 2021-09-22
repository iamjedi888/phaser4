export interface ITimerEventConfig {
    duration: number;
    repeat?: number;
    delay?: number;
    onStart?: () => void;
    onUpdate?: (delta?: number, progress?: number) => void;
    onRepeat?: (repeatCount?: number) => void;
    onComplete?: () => void;
}
//# sourceMappingURL=ITimerEventConfig.d.ts.map