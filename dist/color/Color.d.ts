import { IColor } from './IColor';
export declare class Color implements IColor {
    rgba: Uint8ClampedArray;
    constructor(red?: number, green?: number, blue?: number, alpha?: number);
    set(red: number, green: number, blue: number, alpha?: number): this;
    setColor(color: number): this;
    getColor(includeAlpha?: boolean): number;
    get red(): number;
    set red(value: number);
    get green(): number;
    set green(value: number);
    get blue(): number;
    set blue(value: number);
    get alpha(): number;
    set alpha(value: number);
    get r(): number;
    get g(): number;
    get b(): number;
    get a(): number;
}
//# sourceMappingURL=Color.d.ts.map