export interface IGameObjectStore
{
    store: ArrayBuffer;
    indexes: Uint32Array;
    worldSize: number;
    offsets: number[];
    total: number;
    pointer: number;
    recycle: number[];

    vi32: Int32Array;
    vui32: Uint32Array;
    vf32: Float32Array;

    i32: Int32Array[];
    ui32: Uint32Array[];
    f32: Float32Array[];

    quad: Float32Array[];
}

export const GameObjectStore: IGameObjectStore = {

    store: null,
    indexes: null,
    worldSize: 0,
    offsets: [],
    total: 0,
    pointer: 0,
    recycle: [],

    vi32: null,
    vui32: null,
    vf32: null,

    i32: null,
    ui32: null,
    f32: null,

    quad: null

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
    WORLD: 1,
    PARENT: 1,
    NEXT: 1,
    PREV: 1,
    FIRST: 1,
    LAST: 1,
    NUM_CHILDREN: 1,
    DEPTH: 1
};

//  ui8
export const DIRTY = {
    CHILD: 1,
    CHILD_CACHE: 1,
    CHILD_TRANSFORM: 1,
    CHILD_WORLD_TRANSFORM: 1,
    CHILD_COLOR: 1,
    DISPLAY_LIST: 1,
    COLOR: 1
};

//  ui8
export const PERMISSION = {
    VISIBLE: 1,
    VISIBLE_CHILDREN: 1,
    WILL_UPDATE: 1,
    WILL_UPDATE_CHILDREN: 1,
    WILL_RENDER: 1,
    WILL_RENDER_CHILDREN: 1,
    WILL_CACHE_CHILDREN: 1,
    WILL_TRANSFORM_CHILDREN: 1,
    WILL_COLOR_CHILDREN: 1
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
    IS_ROOT: 1,
    DIRTY: 1,
    X: 1,
    Y: 1,
    ROTATION: 1,
    SCALE_X: 1,
    SCALE_Y: 1,
    SKEW_X: 1,
    SKEW_Y: 1,
    AXIS_ALIGNED: 1,
    FRAME_X1: 1,
    FRAME_Y1: 1,
    FRAME_X2: 1,
    FRAME_Y2: 1,
    FRAME_WIDTH: 1,
    FRAME_HEIGHT: 1,
    ORIGIN_X: 1,
    ORIGIN_Y: 1,
    LOCAL_A: 1,
    LOCAL_B: 1,
    LOCAL_C: 1,
    LOCAL_D: 1,
    LOCAL_TX: 1,
    LOCAL_TY: 1,
    WORLD_A: 1,
    WORLD_B: 1,
    WORLD_C: 1,
    WORLD_D: 1,
    WORLD_TX: 1,
    WORLD_TY: 1,
    BOUNDS_X1: 1,
    BOUNDS_Y1: 1,
    BOUNDS_X2: 1,
    BOUNDS_Y2: 1,
    DIRTY_WORLD: 1,
    IN_VIEW: 1,
    UPDATED: 1
};

/**
 * Buffer Structure:
 *
 * Triangle 1:
 *
 * Top Left Vert
 *
 * 0 - x position
 * 1 - y position
 * 2 - u0
 * 3 - v0
 * 4 - Texture Index
 * 5 - Red Component
 * 6 - Green Component
 * 7 - Blue Component
 * 8 - Alpha Component
 *
 * Bottom Left Vert
 *
 * 9 - x position
 * 10 - y position
 * 11 - u0
 * 12 - v1
 * 13 - Texture Index
 * 14 - Red Component
 * 15 - Green Component
 * 16 - Blue Component
 * 17 - Alpha Component
 *
 * Bottom Right Vert
 *
 * 18 - x position
 * 19 - y position
 * 20 - u1
 * 21 - v1
 * 22 - Texture Index
 * 23 - Red Component
 * 24 - Green Component
 * 25 - Blue Component
 * 26 - Alpha Component
 *
 * Triangle 2:
 *
 * Top Left Vert
 *
 * 27 - x position
 * 28 - y position
 * 29 - u0
 * 30 - v0
 * 31 - Texture Index
 * 32 - Red Component
 * 33 - Green Component
 * 34 - Blue Component
 * 35 - Alpha Component
 *
 * Bottom Right Vert
 *
 * 36 - x position
 * 37 - y position
 * 38 - u1
 * 39 - v1
 * 40 - Texture Index
 * 41 - Red Component
 * 42 - Green Component
 * 43 - Blue Component
 * 44 - Alpha Component
 *
 * Top Right Vert
 *
 * 45 - x position
 * 46 - y position
 * 47 - u1
 * 48 - v0
 * 49 - Texture Index
 * 50 - Red Component
 * 51 - Green Component
 * 52 - Blue Component
 * 53 - Alpha Component
 */

//  f32
export const QUAD = {
    VERTEX: 54
};

//  ui8c
// export const ColorComponent = defineComponent({
//     r: Types.ui8c,
//     g: Types.ui8c,
//     b: Types.ui8c,
//     a: Types.f32,
//     colorMatrix: [ Types.f32, 16 ],
//     colorOffset: [ Types.f32, 4 ]
// });

function AddComponents (components: Record<string, number>[]): number
{
    let index = 0;

    components.forEach(component =>
    {
        let offset = false;

        Object.keys(component).map(key =>
        {
            const size = component[key];

            component[key] = index;

            // console.log(key, index);

            if (!offset)
            {
                offset = true;
                GameObjectStore.offsets.push(index);
            }

            index += size;
        });
    });

    return index;
}

export function DebugStore (id: number, message: string = ''): void
{
    console.log('-=-=-=-=-=-=-=-=-=-=-');
    console.log('DebugStore', id, message);
    console.log('-=-=-=-=-=-=-=-=-=-=-');

    console.group('Hierarchy');
    console.log('WORLD', GameObjectStore.ui32[id][HIERARCHY.WORLD]);
    console.log('PARENT', GameObjectStore.ui32[id][HIERARCHY.PARENT]);
    console.log('NEXT', GameObjectStore.ui32[id][HIERARCHY.NEXT]);
    console.log('PREV', GameObjectStore.ui32[id][HIERARCHY.PREV]);
    console.log('FIRST', GameObjectStore.ui32[id][HIERARCHY.FIRST]);
    console.log('LAST', GameObjectStore.ui32[id][HIERARCHY.LAST]);
    console.log('NUM_CHILDREN', GameObjectStore.ui32[id][HIERARCHY.NUM_CHILDREN]);
    console.log('DEPTH', GameObjectStore.ui32[id][HIERARCHY.DEPTH]);
    console.groupEnd();

    console.groupCollapsed('Dirty');
    console.log('CHILD', GameObjectStore.ui32[id][DIRTY.CHILD]);
    console.log('CHILD_CACHE', GameObjectStore.ui32[id][DIRTY.CHILD_CACHE]);
    console.log('CHILD_TRANSFORM', GameObjectStore.ui32[id][DIRTY.CHILD_TRANSFORM]);
    console.log('CHILD_WORLD_TRANSFORM', GameObjectStore.ui32[id][DIRTY.CHILD_WORLD_TRANSFORM]);
    console.log('CHILD_COLOR', GameObjectStore.ui32[id][DIRTY.CHILD_COLOR]);
    console.log('DISPLAY_LIST', GameObjectStore.ui32[id][DIRTY.DISPLAY_LIST]);
    console.log('COLOR', GameObjectStore.ui32[id][DIRTY.COLOR]);
    console.groupEnd();

    console.groupCollapsed('Permission');
    console.log('VISIBLE', GameObjectStore.ui32[id][PERMISSION.VISIBLE]);
    console.log('VISIBLE_CHILDREN', GameObjectStore.ui32[id][PERMISSION.VISIBLE_CHILDREN]);
    console.log('WILL_UPDATE', GameObjectStore.ui32[id][PERMISSION.WILL_UPDATE]);
    console.log('WILL_UPDATE_CHILDREN', GameObjectStore.ui32[id][PERMISSION.WILL_UPDATE_CHILDREN]);
    console.log('WILL_RENDER', GameObjectStore.ui32[id][PERMISSION.WILL_RENDER]);
    console.log('WILL_RENDER_CHILDREN', GameObjectStore.ui32[id][PERMISSION.WILL_RENDER_CHILDREN]);
    console.log('WILL_CACHE_CHILDREN', GameObjectStore.ui32[id][PERMISSION.WILL_CACHE_CHILDREN]);
    console.log('WILL_TRANSFORM_CHILDREN', GameObjectStore.ui32[id][PERMISSION.WILL_TRANSFORM_CHILDREN]);
    console.log('WILL_COLOR_CHILDREN', GameObjectStore.ui32[id][PERMISSION.WILL_COLOR_CHILDREN]);
    console.groupEnd();

    console.groupCollapsed('Transform');
    console.log('IS_ROOT', GameObjectStore.f32[id][TRANSFORM.IS_ROOT]);
    console.log('DIRTY', GameObjectStore.f32[id][TRANSFORM.DIRTY]);
    console.log('X', GameObjectStore.f32[id][TRANSFORM.X]);
    console.log('Y', GameObjectStore.f32[id][TRANSFORM.Y]);
    console.log('ROTATION', GameObjectStore.f32[id][TRANSFORM.ROTATION]);
    console.log('SCALE_X', GameObjectStore.f32[id][TRANSFORM.SCALE_X]);
    console.log('SCALE_Y', GameObjectStore.f32[id][TRANSFORM.SCALE_Y]);
    console.log('SKEW_X', GameObjectStore.f32[id][TRANSFORM.SKEW_X]);
    console.log('SKEW_Y', GameObjectStore.f32[id][TRANSFORM.SKEW_Y]);
    console.log('AXIS_ALIGNED', GameObjectStore.f32[id][TRANSFORM.AXIS_ALIGNED]);
    console.log('FRAME_X1', GameObjectStore.f32[id][TRANSFORM.FRAME_X1]);
    console.log('FRAME_Y1', GameObjectStore.f32[id][TRANSFORM.FRAME_Y1]);
    console.log('FRAME_X2', GameObjectStore.f32[id][TRANSFORM.FRAME_X2]);
    console.log('FRAME_Y2', GameObjectStore.f32[id][TRANSFORM.FRAME_Y2]);
    console.log('FRAME_WIDTH', GameObjectStore.f32[id][TRANSFORM.FRAME_WIDTH]);
    console.log('FRAME_HEIGHT', GameObjectStore.f32[id][TRANSFORM.FRAME_HEIGHT]);
    console.log('ORIGIN_X', GameObjectStore.f32[id][TRANSFORM.ORIGIN_X]);
    console.log('ORIGIN_Y', GameObjectStore.f32[id][TRANSFORM.ORIGIN_Y]);
    console.log('LOCAL_A', GameObjectStore.f32[id][TRANSFORM.LOCAL_A]);
    console.log('LOCAL_B', GameObjectStore.f32[id][TRANSFORM.LOCAL_B]);
    console.log('LOCAL_C', GameObjectStore.f32[id][TRANSFORM.LOCAL_C]);
    console.log('LOCAL_D', GameObjectStore.f32[id][TRANSFORM.LOCAL_D]);
    console.log('LOCAL_TX', GameObjectStore.f32[id][TRANSFORM.LOCAL_TX]);
    console.log('LOCAL_TY', GameObjectStore.f32[id][TRANSFORM.LOCAL_TY]);
    console.log('WORLD_A', GameObjectStore.f32[id][TRANSFORM.WORLD_A]);
    console.log('WORLD_B', GameObjectStore.f32[id][TRANSFORM.WORLD_B]);
    console.log('WORLD_C', GameObjectStore.f32[id][TRANSFORM.WORLD_C]);
    console.log('WORLD_D', GameObjectStore.f32[id][TRANSFORM.WORLD_D]);
    console.log('WORLD_TX', GameObjectStore.f32[id][TRANSFORM.WORLD_TX]);
    console.log('WORLD_TY', GameObjectStore.f32[id][TRANSFORM.WORLD_TY]);
    console.log('BOUNDS_X1', GameObjectStore.f32[id][TRANSFORM.BOUNDS_X1]);
    console.log('BOUNDS_Y1', GameObjectStore.f32[id][TRANSFORM.BOUNDS_Y1]);
    console.log('BOUNDS_X2', GameObjectStore.f32[id][TRANSFORM.BOUNDS_X2]);
    console.log('BOUNDS_Y2', GameObjectStore.f32[id][TRANSFORM.BOUNDS_Y2]);
    console.log('DIRTY_WORLD', GameObjectStore.f32[id][TRANSFORM.DIRTY_WORLD]);
    console.log('IN_VIEW', GameObjectStore.f32[id][TRANSFORM.IN_VIEW]);
    console.log('UPDATED', GameObjectStore.f32[id][TRANSFORM.UPDATED]);
    console.groupEnd();
}

export function CreateWorld (worldSize: number): void
{
    const slotSize = AddComponents([
        HIERARCHY,
        DIRTY,
        PERMISSION,
        TRANSFORM,
        QUAD
    ]);

    // console.log('slotSize', slotSize);
    // console.log('hierarchy, dirty, permission, transform, quad');
    // console.log('offsets', GameObjectStore.offsets);
    // console.log(HIERARCHY);
    // console.log(DIRTY);
    // console.log(PERMISSION);
    // console.log(TRANSFORM);
    // console.log(QUAD);

    const store = new ArrayBuffer(worldSize * (slotSize * Float32Array.BYTES_PER_ELEMENT));
    const indexes = new Uint32Array(worldSize);
    const pointer = 0;
    const recycle: number[] = [];

    const vi32 = new Int32Array(store);
    const vui32 = new Uint32Array(store);
    const vf32 = new Float32Array(store);

    const i32: Int32Array[] = [];
    const ui32: Uint32Array[] = [];
    const f32: Float32Array[] = [];
    const quad: Float32Array[] = [];

    let begin = 0;
    const quadSize = 61;

    for (let i = 0; i < worldSize; i++)
    {
        const end = begin + slotSize;

        i32[i] = vi32.subarray(begin, end);
        ui32[i] = vui32.subarray(begin, end);
        f32[i] = vf32.subarray(begin, end);

        quad[i] = vf32.subarray(begin + quadSize, end);

        begin += slotSize;
    }

    Object.assign(GameObjectStore, { store, worldSize, indexes, pointer, recycle, vi32, vui32, vf32, i32, ui32, f32, quad });
}

export function AddEntity (): number
{
    if (GameObjectStore.total === GameObjectStore.worldSize)
    {
        throw new Error('GameObjectStore is full');
    }

    let id = GameObjectStore.recycle.pop();

    if (id === undefined)
    {
        id = GameObjectStore.pointer;

        GameObjectStore.pointer++;
    }

    GameObjectStore.total++;

    GameObjectStore.indexes[id] = 1;

    return id;
}

export function RemoveEntity (id: number): void
{
    GameObjectStore.f32[id].fill(0);

    GameObjectStore.total--;

    GameObjectStore.indexes[id] = 0;

    GameObjectStore.recycle.push(id);
}
