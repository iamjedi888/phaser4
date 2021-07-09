import { QuadVertexComponent } from './QuadVertexComponent';

export function SetQuadColor (id: number, red: number, green: number, blue: number, alpha: number): void
{
    const data = QuadVertexComponent.values[id];

    data[5] = red;
    data[6] = green;
    data[7] = blue;
    data[8] = alpha;

    data[14] = red;
    data[15] = green;
    data[16] = blue;
    data[17] = alpha;

    data[23] = red;
    data[24] = green;
    data[25] = blue;
    data[26] = alpha;

    data[32] = red;
    data[33] = green;
    data[34] = blue;
    data[35] = alpha;

    data[41] = red;
    data[42] = green;
    data[43] = blue;
    data[44] = alpha;

    data[50] = red;
    data[51] = green;
    data[52] = blue;
    data[53] = alpha;
}
