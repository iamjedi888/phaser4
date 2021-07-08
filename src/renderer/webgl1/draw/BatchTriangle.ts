import { GetTriBuffer } from './GetTriBuffer';

const buffer = GetTriBuffer();

export function BatchTriangle (
    F32: Float32Array,
    offset: number,
    textureIndex: number,
    x1: number, y1: number,
    x2: number, y2: number,
    x3: number, y3: number,
    r: number, g: number, b: number, a: number): number
{
    buffer[0] = x1;
    buffer[1] = y1;
    buffer[4] = textureIndex;
    buffer[5] = r;
    buffer[6] = g;
    buffer[7] = b;
    buffer[8] = a;

    buffer[9] = x2;
    buffer[10] = y2;
    buffer[13] = textureIndex;
    buffer[14] = r;
    buffer[15] = g;
    buffer[16] = b;
    buffer[17] = a;

    buffer[18] = x3;
    buffer[19] = y3;
    buffer[22] = textureIndex;
    buffer[23] = r;
    buffer[24] = g;
    buffer[25] = b;
    buffer[26] = a;

    F32.set(buffer, offset);

    return offset + 27;

    //  The above is more verbose but doesn't create any garbage, unlike the following way of doing it:

    // F32.set([
    //     x1, y1, 0, 1, textureIndex, red, green, blue, alpha,
    //     x2, y2, 0, 0, textureIndex, red, green, blue, alpha,
    //     x3, y3, 1, 0, textureIndex, red, green, blue, alpha
    // ], offset);
}
