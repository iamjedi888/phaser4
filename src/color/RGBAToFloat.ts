export function RGBAToFloat (red: number, green: number, blue: number, alpha: number): number
{
    return alpha << 24 | red << 16 | green << 8 | blue;
}
