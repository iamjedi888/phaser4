import { Changed, defineQuery, defineSystem } from 'bitecs';

import { Matrix2DComponent } from './Matrix2DComponent';
import { Transform2DComponent } from './Transform2DComponent';

const changedTransformQuery = defineQuery([ Changed(Transform2DComponent) ]);

const updateTransformSystem = defineSystem(world =>
{
    const entities = changedTransformQuery(world);

    for (let i = 0; i < entities.length; i++)
    {
        const id = entities[i];

        const x = Transform2DComponent.x[id];
        const y = Transform2DComponent.y[id];
        const rotation = Transform2DComponent.rotation[id];
        const scaleX = Transform2DComponent.scaleX[id];
        const scaleY = Transform2DComponent.scaleY[id];
        const skewX = Transform2DComponent.skewX[id];
        const skewY = Transform2DComponent.skewY[id];

        Matrix2DComponent.a[id] = Math.cos(rotation + skewY) * scaleX;
        Matrix2DComponent.b[id] = Math.sin(rotation + skewY) * scaleX;
        Matrix2DComponent.c[id] = -Math.sin(rotation - skewX) * scaleY;
        Matrix2DComponent.d[id] = Math.cos(rotation - skewX) * scaleY;
        Matrix2DComponent.tx[id] = x;
        Matrix2DComponent.ty[id] = y;
    }
});

export const UpdateTransform2DSystem = updateTransformSystem;
