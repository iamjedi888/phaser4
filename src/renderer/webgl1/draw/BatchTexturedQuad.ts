import { GetQuadBuffer } from './GetQuadBuffer';

const buffer = GetQuadBuffer();

export function BatchTexturedQuad (
    F32: Float32Array,
    offset: number,
    textureIndex: number,
    x1: number, y1: number,
    x2: number, y2: number,
    x3: number, y3: number,
    x4: number, y4: number,
    u0: number, v0: number, u1: number, v1: number,
    r: number, g: number, b: number, a: number): number
{
    //  top left
    buffer[0] = x1;
    buffer[1] = y1;
    buffer[2] = u0;
    buffer[3] = v0;
    buffer[4] = textureIndex;
    buffer[5] = r;
    buffer[6] = g;
    buffer[7] = b;
    buffer[8] = a;

    //  bottom left
    buffer[9] = x2;
    buffer[10] = y2;
    buffer[11] = u0;
    buffer[12] = v1;
    buffer[13] = textureIndex;
    buffer[14] = r;
    buffer[15] = g;
    buffer[16] = b;
    buffer[17] = a;

    //  bottom right
    buffer[18] = x3;
    buffer[19] = y3;
    buffer[20] = u1;
    buffer[21] = v1;
    buffer[22] = textureIndex;
    buffer[23] = r;
    buffer[24] = g;
    buffer[25] = b;
    buffer[26] = a;

    //  top left
    buffer[27] = x1;
    buffer[28] = y1;
    buffer[29] = u0;
    buffer[30] = v0;
    buffer[31] = textureIndex;
    buffer[32] = r;
    buffer[33] = g;
    buffer[34] = b;
    buffer[35] = a;

    //  bottom right
    buffer[36] = x3;
    buffer[37] = y3;
    buffer[38] = u1;
    buffer[39] = v1;
    buffer[40] = textureIndex;
    buffer[41] = r;
    buffer[42] = g;
    buffer[43] = b;
    buffer[44] = a;

    //  top right
    buffer[45] = x4;
    buffer[46] = y4;
    buffer[47] = u1;
    buffer[48] = v0;
    buffer[49] = textureIndex;
    buffer[50] = r;
    buffer[51] = g;
    buffer[52] = b;
    buffer[53] = a;

    F32.set(buffer, offset);

    return offset + 54;
}
