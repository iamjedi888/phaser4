import { DIRTY_CONST } from '../../gameobjects/DIRTY_CONST';
import { IGameObject } from '../../gameobjects/IGameObject';
import { PackColors } from '../../renderer/webgl1/colors/PackColors';
import { UpdateVertices } from './UpdateVertices';

export function PreRenderVertices <T extends IGameObject> (gameObject: T): T
{
    const vertices = gameObject.vertices;

    if (gameObject.isDirty(DIRTY_CONST.COLORS))
    {
        PackColors(vertices);

        gameObject.clearDirty(DIRTY_CONST.COLORS);
    }

    if (gameObject.isDirty(DIRTY_CONST.TRANSFORM))
    {
        UpdateVertices(vertices, gameObject.worldTransform, gameObject.transformExtent);

        gameObject.clearDirty(DIRTY_CONST.TRANSFORM);
    }

    return gameObject;
}
