import { GameObject } from '../GameObject';
import { IContainer } from './IContainer';
export declare class Container extends GameObject implements IContainer {
    protected _alpha: number;
    constructor(x?: number, y?: number);
    get alpha(): number;
    set alpha(value: number);
}
//# sourceMappingURL=Container.d.ts.map