import { Key } from '../Key';
import { Keyboard } from '../Keyboard';
export declare type WASDKeysConfig = {
    W: boolean;
    A: boolean;
    S: boolean;
    D: boolean;
    space: boolean;
};
export declare class WASDKeys {
    W: Key;
    A: Key;
    S: Key;
    D: Key;
    space: Key;
    constructor(keyboardManager: Keyboard, config?: WASDKeysConfig);
}
//# sourceMappingURL=WASDKeys.d.ts.map