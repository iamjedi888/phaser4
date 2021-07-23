export function BatchTriangle (
    F32: Float32Array,
    offset: number,
    textureIndex: number,
    x1: number, y1: number,
    x2: number, y2: number,
    x3: number, y3: number,
    r: number, g: number, b: number, a: number): number
{
    F32.set([
        x1,
        y1,
        0,
        0,
        textureIndex,
        r,
        g,
        b,
        a,

        x2,
        y2,
        0,
        1,
        textureIndex,
        r,
        g,
        b,
        a,

        x3,
        y3,
        1,
        1,
        textureIndex,
        r,
        g,
        b,
        a
    ], offset);

    return offset + 27;
}
