export function GetQuadBuffer (): Float32Array
{
    //  Buffer Format:

    //  top left vert = x, y, u, v, texture index, r, g, b, a
    //  bottom left vert = x, y, u, v, texture index, r, g, b, a
    //  bottom right vert = x, y, u, v, texture index, r, g, b, a

    //  top left vert = x, y, u, v, texture index, r, g, b, a
    //  bottom right vert = x, y, u, v, texture index, r, g, b, a
    //  top right vert = x, y, u, v, texture index, r, g, b, a

    return new Float32Array([
        //  tri 1
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 0, 0, 0,
        0, 0, 1, 1, 0, 0, 0, 0, 0,
        //  tri 2
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 1, 1, 0, 0, 0, 0, 0,
        0, 0, 1, 0, 0, 0, 0, 0, 0
    ]);
}
