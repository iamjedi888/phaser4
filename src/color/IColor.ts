export interface IColor
{
    set (red: number, green: number, blue: number, alpha?: number): this;
    fromArray (rgba: number[]): this;
    getColor (): number;
    getColor32 (): number;
    red: number;
    green: number;
    blue: number;
    alpha: number;
}
