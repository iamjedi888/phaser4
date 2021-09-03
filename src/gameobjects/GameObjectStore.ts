export interface IGameObjectStore
{
    store: ArrayBuffer;
    indexes: Uint32Array;
    worldSize: number;

    vi8: Int8Array;
    vui8: Uint8Array;
    vui8c: Uint8ClampedArray;
    vi16: Int16Array;
    vui16: Uint16Array;
    vi32: Int32Array;
    vui32: Uint32Array;
    vf32: Float32Array;

    i8: Int8Array[];
    ui8: Uint8Array[];
    ui8c: Uint8ClampedArray[];
    i16: Int16Array[];
    ui16: Uint16Array[];
    i32: Int32Array[];
    ui32: Uint32Array[];
    f32: Float32Array[];
}

export const GameObjectStore: IGameObjectStore = {

    store: null,
    indexes: null,
    worldSize: 0,

    vi8: null,
    vui8: null,
    vui8c: null,
    vi16: null,
    vui16: null,
    vi32: null,
    vui32: null,
    vf32: null,

    i8: null,
    ui8: null,
    ui8c: null,
    i16: null,
    ui16: null,
    i32: null,
    ui32: null,
    f32: null

};

export function CreateWorld (worldSize: number): void
{
    const slotSize = 4;

    const store = new ArrayBuffer(worldSize * (slotSize * Float32Array.BYTES_PER_ELEMENT));
    const indexes = new Uint32Array(worldSize);

    const vi8 = new Int8Array(store);
    const vui8 = new Uint8Array(store);
    const vui8c = new Uint8ClampedArray(store);
    const vi16 = new Int16Array(store);
    const vui16 = new Uint16Array(store);
    const vi32 = new Int32Array(store);
    const vui32 = new Uint32Array(store);
    const vf32 = new Float32Array(store);

    const i8: Int8Array[] = [];
    const ui8: Uint8Array[] = [];
    const ui8c: Uint8ClampedArray[] = [];
    const i16: Int16Array[] = [];
    const ui16: Uint16Array[] = [];
    const i32: Int32Array[] = [];
    const ui32: Uint32Array[] = [];
    const f32: Float32Array[] = [];

    let begin = 0;

    for (let i = 0; i < worldSize; i++)
    {
        const end = begin + slotSize;

        i8[i] = vi8.subarray(begin, end);
        ui8[i] = vui8.subarray(begin, end);
        ui8c[i] = vui8c.subarray(begin, end);
        i16[i] = vi16.subarray(begin, end);
        ui16[i] = vui16.subarray(begin, end);
        i32[i] = vi32.subarray(begin, end);
        ui32[i] = vui32.subarray(begin, end);
        f32[i] = vf32.subarray(begin, end);

        begin += slotSize;
    }

    Object.assign(GameObjectStore, { store, worldSize, indexes, vi8, vui8, vui8c, vi16, vui16, vi32, vui32, vf32, i8, ui8, ui8c, i16, ui16, i32, ui32, f32 });
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
    GameObjectStore.f32[id].fill(0);

    GameObjectStore.indexes[id] = 0;
}
