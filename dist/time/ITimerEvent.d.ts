export interface ITimerEvent {
    duration: number;
    repeat: number;
    elapsed: number;
    delay: number;
    update: (delta: number) => boolean;
    onStart: () => void;
    onUpdate: (delta: number, progress: number) => void;
    onRepeat: (repeatCount: number) => void;
    onComplete: () => void;
}
//# sourceMappingURL=ITimerEvent.d.ts.map