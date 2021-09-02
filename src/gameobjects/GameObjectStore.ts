export interface IGameObjectStore
{
    store: ArrayBuffer;
    view: Float32Array;
    indexes: Uint32Array;
    worldSize: number;
    data: Float32Array[];
}

export const GameObjectStore: IGameObjectStore = {

    store: null,
    view: null,
    indexes: null,
    worldSize: 0,
    data: null

};

export function CreateWorld (worldSize: number): void
{
    const slotSize = 4;

    const store = new ArrayBuffer(worldSize * (slotSize * 4));
    const view = new Float32Array(store);
    const data: Float32Array[] = [];
    const indexes = new Uint32Array(worldSize);

    let begin = 0;

    for (let i = 0; i < worldSize; i++)
    {
        data[i] = view.subarray(begin, begin + slotSize);

        begin += slotSize;
    }

    Object.assign(GameObjectStore, { store, view, data, worldSize, indexes });
}

export function AddEntity (): number
{
    const id = GameObjectStore.indexes.findIndex(element => element === 0);

    if (id === -1)
    {
        throw new Error('GameObjectStore is full');
    }

    GameObjectStore.indexes[id] = 1;

    return id;
}

export function RemoveEntity (id: number): void
{
    GameObjectStore.data[id].fill(0);

    GameObjectStore.indexes[id] = 0;
}
