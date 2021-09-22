export interface IKey {
    capture: boolean;
    isDown: boolean;
    enabled: boolean;
    repeatRate: number;
    canRepeat: boolean;
    timeDown: number;
    timeUpdated: number;
    timeUp: number;
    downCallback?: (key: IKey) => void;
    upCallback?: (key: IKey) => void;
    getValue(): string;
    down(event: KeyboardEvent): void;
    up(event: KeyboardEvent): void;
    reset(): void;
    destroy(): void;
}
//# sourceMappingURL=IKey.d.ts.map