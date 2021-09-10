import { TRANSFORM, Transform2DComponent } from './Transform2DComponent';

import { ITransform2D } from './ITransform2D';

export function GetLocalTransform (id: number): ITransform2D
{
    const data = Transform2DComponent.data[id];

    return {
        a: data[TRANSFORM.LOCAL_A],
        b: data[TRANSFORM.LOCAL_B],
        c: data[TRANSFORM.LOCAL_C],
        d: data[TRANSFORM.LOCAL_D],
        tx: data[TRANSFORM.LOCAL_TX],
        ty: data[TRANSFORM.LOCAL_TY]
    };
}
