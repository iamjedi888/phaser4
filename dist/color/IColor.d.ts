export interface IColor {
    set(red: number, green: number, blue: number, alpha?: number): this;
    setColor(color: number): this;
    getColor(includeAlpha: boolean): number;
    rgba: Uint8ClampedArray;
    red: number;
    green: number;
    blue: number;
    alpha: number;
}
//# sourceMappingURL=IColor.d.ts.map