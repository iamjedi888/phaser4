export function BatchQuad (
    F32: Float32Array,
    offset: number,
    textureIndex: number,
    x1: number, y1: number,
    x2: number, y2: number,
    x3: number, y3: number,
    x4: number, y4: number,
    r: number, g: number, b: number, a: number): number
{
    F32.set([
        //  top left
        x1,
        y1,
        0,
        0,
        textureIndex,
        r,
        g,
        b,
        a,

        //  bottom left
        x2,
        y2,
        0,
        1,
        textureIndex,
        r,
        g,
        b,
        a,

        //  bottom right
        x3,
        y3,
        1,
        1,
        textureIndex,
        r,
        g,
        b,
        a,

        //  top left
        x1,
        y1,
        0,
        0,
        textureIndex,
        r,
        g,
        b,
        a,

        //  bottom right
        x3,
        y3,
        1,
        1,
        textureIndex,
        r,
        g,
        b,
        a,

        //  top right
        x4,
        y4,
        1,
        0,
        textureIndex,
        r,
        g,
        b,
        a
    ], offset);

    return offset + 54;
}
