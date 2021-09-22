import { IEventInstance } from '../../events/IEventInstance';
import { IKey } from './IKey';
export declare class Key implements IKey {
    readonly value: string;
    events: Map<string, Set<IEventInstance>>;
    capture: boolean;
    isDown: boolean;
    enabled: boolean;
    repeatRate: number;
    canRepeat: boolean;
    timeDown: number;
    timeUpdated: number;
    timeUp: number;
    shiftKey: boolean;
    ctrlKey: boolean;
    altKey: boolean;
    downCallback: (key: IKey) => void;
    upCallback: (key: IKey) => void;
    constructor(value: string);
    getValue(): string;
    down(event: KeyboardEvent): void;
    up(event: KeyboardEvent): void;
    reset(): void;
    destroy(): void;
}
//# sourceMappingURL=Key.d.ts.map