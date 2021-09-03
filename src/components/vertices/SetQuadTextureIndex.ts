import { GameObjectStore } from '../../gameobjects/GameObjectStore';

export function SetQuadTextureIndex (id: number, textureIndex: number): void
{
    const data = GameObjectStore.quad[id];

    if (data[4] !== textureIndex)
    {
        data[4] = textureIndex;
        data[13] = textureIndex;
        data[22] = textureIndex;
        data[31] = textureIndex;
        data[40] = textureIndex;
        data[49] = textureIndex;
    }
}
