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

    const quadPointer = wasm.get_quad_pointer();
    const quadMem = new Float32Array(wasm.memory.buffer, quadPointer, 8);

    for (let i = 0; i < entities.length; i++)
    {
        const id = entities[i];

        if (!HasDirtyTransform(id))
        {
            continue;
        }

        const tx = Transform2DComponent.x[id];
        const ty = Transform2DComponent.y[id];
        const rotation = Transform2DComponent.rotation[id];
        const scaleX = Transform2DComponent.scaleX[id];
        const scaleY = Transform2DComponent.scaleY[id];
        const skewX = Transform2DComponent.skewX[id];
        const skewY = Transform2DComponent.skewY[id];

        const x = Extent2DComponent.x[id];
        const y = Extent2DComponent.y[id];
        const right = Extent2DComponent.right[id];
        const bottom = Extent2DComponent.bottom[id];

        const bounds = BoundsComponent.global[id];

        wasm.load_matrix(tx, ty, rotation, scaleX, scaleY, skewX, skewY, x, y, right, bottom);

        const x0 = quadMem[0];
        const y0 = quadMem[1];
        const x1 = quadMem[2];
        const y1 = quadMem[3];
        const x2 = quadMem[4];
        const y2 = quadMem[5];
        const x3 = quadMem[6];
        const y3 = quadMem[7];

        SetQuadPosition(id, x0, y0, x1, y1, x2, y2, x3, y3);

        bounds[0] = x0;
        bounds[1] = y0;
        bounds[2] = x2;
        bounds[3] = y2;

        ClearDirtyTransform(id);

        total++;
    }

    return world;
});

//  All children of a World that have a dirty Transform2DComponent
//  are passed through this system and have their LocalMatrix2DComponent values set +
//  SetDirtyTransform + SetDirtyParents (which includes SetDirtyDisplayList for the World)

export const UpdateLocalTransformWASM = (id: number, world: IWorld, query: Query): number =>
{
    total = 0;
    entities = query(world);

    if (entities.length > 0)
    {
        system(world);
    }

    return total;
};
