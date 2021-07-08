import { GetQuadBuffer } from './GetQuadBuffer';

const buffer = GetQuadBuffer();

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

    buffer[27] = x1;
    buffer[28] = y1;
    buffer[31] = textureIndex;
    buffer[32] = r;
    buffer[33] = g;
    buffer[34] = b;
    buffer[35] = a;

    buffer[36] = x3;
    buffer[37] = y3;
    buffer[40] = textureIndex;
    buffer[41] = r;
    buffer[42] = g;
    buffer[43] = b;
    buffer[44] = a;

    buffer[45] = x4;
    buffer[46] = y4;
    buffer[49] = textureIndex;
    buffer[50] = r;
    buffer[51] = g;
    buffer[52] = b;
    buffer[53] = a;

    F32.set(buffer, offset);

    return offset + 54;
}
