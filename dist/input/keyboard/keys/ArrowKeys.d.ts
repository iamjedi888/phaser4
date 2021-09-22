import { Key } from '../Key';
import { Keyboard } from '../Keyboard';
export declare type ArrowKeysConfig = {
    left: boolean;
    right: boolean;
    up: boolean;
    down: boolean;
    space: boolean;
};
export declare class ArrowKeys {
    left: Key;
    right: Key;
    up: Key;
    down: Key;
    space: Key;
    constructor(keyboardManager: Keyboard, config?: ArrowKeysConfig);
}
//# sourceMappingURL=ArrowKeys.d.ts.map