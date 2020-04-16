export default interface IRectangle
{
    x: number;
    y: number;
    width: number;
    height: number;
    right: number;
    bottom: number;
    set (x: number, y: number, width: number, height: number): this;
    contains (x: number, y: number): boolean;
}
