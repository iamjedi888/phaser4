export interface IGameObjectStore
{
    store: ArrayBuffer;
    indexes: Uint32Array;
    worldSize: number;
    offsets: number[];

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
    offsets: [],

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

//  world = The ID of the World entity the owner of this component belongs to
//  parent = The ID of the Parent entity. If it has no parent, will match the world ID
//  next = The ID of the next entity in the display list (horizontally, the next sibling)
//  prev = The ID of the previous entity in the display list (horizontally, the previous sibling)
//  first = The ID of the left-most (first) child entity of this parent
//  last = The ID of the right-most (last) child entity of this parent
//  numChildren = The number of direct descendants this entity has
//  depth = Reserved to allow for per-child depth sorting outside of the display list index


//  ui32
export const HIERARCHY = {
    WORLD: 0,
    PARENT: 0,
    NEXT: 0,
    PREV: 0,
    FIRST: 0,
    LAST: 0,
    NUM_CHILDREN: 0,
    DEPTH: 0
};

//  ui8
export const DIRTY = {
    CHILD: 0,
    CHILD_CACHE: 0,
    CHILD_TRANSFORM: 0,
    CHILD_WORLD_TRANSFORM: 0,
    CHILD_COLOR: 0,
    DISPLAY_LIST: 0,
    COLOR: 0
};

//  ui8
export const PERMISSION = {
    VISIBLE: 0,
    VISIBLE_CHILDREN: 0,
    WILL_UPDATE: 0,
    WILL_UPDATE_CHILDREN: 0,
    WILL_RENDER: 0,
    WILL_RENDER_CHILDREN: 0,
    WILL_CACHE_CHILDREN: 0,
    WILL_TRANSFORM_CHILDREN: 0,
    WILL_COLOR_CHILDREN: 0
};

//  The A, B, C, D, TX, TY elements are a short-form of a 3x3 Matrix, with the last column ignored:

//  |----|----|----|
//  | a  | b  | 0  |
//  |----|----|----|
//  | c  | d  | 0  |
//  |----|----|----|
//  | tx | ty | 1  |
//  |----|----|----|

//  [0] = a - X scale
//  [1] = b - X skew
//  [2] = c - Y skew
//  [3] = d - Y scale
//  [4] = tx - X translation
//  [5] = ty - Y translation

//  f32
export const TRANSFORM = {
    IS_ROOT: 0,
    DIRTY: 0,
    X: 0,
    Y: 0,
    ROTATION: 0,
    SCALE_X: 0,
    SCALE_Y: 0,
    SKEW_X: 0,
    SKEW_Y: 0,
    AXIS_ALIGNED: 0,
    FRAME_X1: 0,
    FRAME_Y1: 0,
    FRAME_X2: 0,
    FRAME_Y2: 0,
    FRAME_WIDTH: 0,
    FRAME_HEIGHT: 0,
    ORIGIN_X: 0,
    ORIGIN_Y: 0,
    LOCAL_A: 0,
    LOCAL_B: 0,
    LOCAL_C: 0,
    LOCAL_D: 0,
    LOCAL_TX: 0,
    LOCAL_TY: 0,
    WORLD_A: 0,
    WORLD_B: 0,
    WORLD_C: 0,
    WORLD_D: 0,
    WORLD_TX: 0,
    WORLD_TY: 0,
    BOUNDS_X1: 0,
    BOUNDS_Y1: 0,
    BOUNDS_X2: 0,
    BOUNDS_Y2: 0,
    DIRTY_WORLD: 0,
    IN_VIEW: 0,
    UPDATED: 0
};

function AddComponents (components: Record<string, number>[]): number
{
    let index = 0;

    components.forEach(component =>
    {
        let offset = false;

        Object.keys(component).map(key =>
        {
            component[key] = index;

            if (!offset)
            {
                offset = true;
                GameObjectStore.offsets.push(index);
            }

            index++;
        });

        GameObjectStore.offsets.push(index);
    });

    return index;
}

export function CreateWorld (worldSize: number): void
{
    const slotSize = AddComponents([
        HIERARCHY,
        DIRTY,
        PERMISSION,
        TRANSFORM
    ]);

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
