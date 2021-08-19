import { IWorld, Query, defineSystem } from 'bitecs';

import { BoundsComponent } from '../bounds/BoundsComponent';
import { ClearDirtyTransform } from '../dirty/ClearDirtyTransform';
import { Extent2DComponent } from './Extent2DComponent';
import { GameInstance } from '../../GameInstance';
import { HasDirtyTransform } from '../dirty/HasDirtyTransform';
import { SetQuadPosition } from '../vertices/SetQuadPosition';
import { Transform2DComponent } from './Transform2DComponent';

let entities: number[];
let total: number = 0;

const system = defineSystem(world =>
{
    const wasm = GameInstance.getWasm();

    //  100k!
    const maxQuads = 100000;

    const quadPointer = wasm.get_quad_pointer();
    const quadMem = new Float32Array(wasm.memory.buffer, quadPointer, 9 * maxQuads);

    const transformPointer = wasm.get_transform_pointer();
    const transformMem = new Float32Array(wasm.memory.buffer, transformPointer, 12 * maxQuads);

    let count = 0;
    let transformOffset = 0;

    for (let i = 0; i < entities.length; i++)
    {
        const id = entities[i];

        if (!HasDirtyTransform(id))
        {
            continue;
        }

        const transform = Transform2DComponent.data[id];
        const tx = transform[0];
        const ty = transform[1];
        const rotation = transform[2];
        const scaleX = transform[3];
        const scaleY = transform[4];
        const skewX = transform[5];
        const skewY = transform[6];

        const x = Extent2DComponent.x[id];
        const y = Extent2DComponent.y[id];
        const right = Extent2DComponent.right[id];
        const bottom = Extent2DComponent.bottom[id];

        transformMem[transformOffset + 0] = id;
        transformMem[transformOffset + 1] = tx;
        transformMem[transformOffset + 2] = ty;
        transformMem[transformOffset + 3] = rotation;
        transformMem[transformOffset + 4] = scaleX;
        transformMem[transformOffset + 5] = scaleY;
        transformMem[transformOffset + 6] = skewX;
        transformMem[transformOffset + 7] = skewY;
        transformMem[transformOffset + 8] = x;
        transformMem[transformOffset + 9] = y;
        transformMem[transformOffset + 10] = right;
        transformMem[transformOffset + 11] = bottom;

        transformOffset += 12;
        count++;

        if (count === maxQuads)
        {
            //  Process the batch
            wasm.calc_matrix();

            //  Ingest the results

            let quadOffset = 0;

            for (let j = 0; j < maxQuads; j++)
            {
                const eid = quadMem[quadOffset + 0];
                const x0 = quadMem[quadOffset + 1];
                const y0 = quadMem[quadOffset + 2];
                const x1 = quadMem[quadOffset + 3];
                const y1 = quadMem[quadOffset + 4];
                const x2 = quadMem[quadOffset + 5];
                const y2 = quadMem[quadOffset + 6];
                const x3 = quadMem[quadOffset + 7];
                const y3 = quadMem[quadOffset + 8];

                const bounds = BoundsComponent.global[eid];

                SetQuadPosition(eid, x0, y0, x1, y1, x2, y2, x3, y3);

                bounds[0] = x0;
                bounds[1] = y0;
                bounds[2] = x2;
                bounds[3] = y2;

                ClearDirtyTransform(eid);

                quadOffset += 9;

                total++;
            }

            count = 0;
            transformOffset = 0;
        }
    }

    return world;
});

//  All children of a World that have a dirty Transform2DComponent
//  are passed through this system and have their LocalMatrix2DComponent values set +
//  SetDirtyTransform + SetDirtyParents (which includes SetDirtyDisplayList for the World)

export const UpdateLocalTransformWASMBatch = (id: number, world: IWorld, query: Query): number =>
{
    total = 0;
    entities = query(world);

    if (entities.length > 0)
    {
        system(world);
    }

    return total;
};
