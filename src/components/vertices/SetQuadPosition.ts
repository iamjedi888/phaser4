import { GameObjectStore } from '../../gameobjects/GameObjectStore';

export function SetQuadPosition (id: number, x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): void
{
    const data = GameObjectStore.quad[id];

    //  top left
    data[0] = x0;
    data[1] = y0;

    //  bottom left
    data[9] = x1;
    data[10] = y1;

    //  bottom right
    data[18] = x2;
    data[19] = y2;

    //  top left
    data[27] = x0;
    data[28] = y0;

    //  bottom right
    data[36] = x2;
    data[37] = y2;

    //  top right
    data[45] = x3;
    data[46] = y3;
}
