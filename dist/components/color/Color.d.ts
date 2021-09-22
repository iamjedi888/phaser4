export declare class Color {
    private id;
    colorMatrixEnabled: boolean;
    constructor(id: number, red?: number, green?: number, blue?: number, alpha?: number);
    set(red: number, green: number, blue: number, alpha: number): void;
    set tint(value: number);
    get tint(): number;
    set willColorChildren(value: boolean);
    get willColorChildren(): boolean;
    set colorMatrix(value: Float32List);
    get colorMatrix(): Float32Array;
    set colorOffset(value: Float32List);
    get colorOffset(): Float32Array;
    set red(value: number);
    get red(): number;
    set green(value: number);
    get green(): number;
    set blue(value: number);
    get blue(): number;
    set alpha(value: number);
    get alpha(): number;
}
//# sourceMappingURL=Color.d.ts.map