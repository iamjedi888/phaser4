import { EventEmitter } from '../../events/EventEmitter';
import { IKey } from './IKey';
export declare class Keyboard extends EventEmitter {
    keys: Map<string, IKey>;
    private keydownHandler;
    private keyupHandler;
    private blurHandler;
    keyConversion: {
        [key: string]: string;
    };
    constructor();
    addKeys(...keys: IKey[]): void;
    clearKeys(): void;
    private onBlur;
    private getKeyValue;
    private onKeyDown;
    private onKeyUp;
    destroy(): void;
}
//# sourceMappingURL=Keyboard.d.ts.map