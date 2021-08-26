import { QuadVertexComponent } from './QuadVertexComponent';

export function SetUV (id: number, u0: number, v0: number, u1: number, v1: number): void
{
    const data = QuadVertexComponent.values[id];

    //  top left
    data[2] = u0;
    data[3] = v0;

    //  bottom left
    data[11] = u0;
    data[12] = v1;

    //  bottom right
    data[20] = u1;
    data[21] = v1;

    //  top left
    data[29] = u0;
    data[30] = v0;

    //  bottom right
    data[38] = u1;
    data[39] = v1;

    //  top right
    data[47] = u1;
    data[48] = v0;
}
