import { Frame } from './Frame';
import { ISprite } from '../gameobjects/sprite/ISprite';
import { SetDirtyFrame } from '../components/dirty/SetDirtyFrame';
import { SetExtentFromFrame } from './SetExtentFromFrame';
import { SetVertexUVsFromFrame } from './SetVertexUVsFromFrame';
import { Texture } from './Texture';

export function SetFrame <T extends ISprite> (texture: Texture, key?: string | number | Frame, ...children: T[]): T[]
{
    const frame = texture.getFrame(key);

    const pivot = frame.pivot;

    children.forEach(child =>
    {
        if (!child || frame === child.frame)
        {
            return;
        }

        child.frame = frame;
        child.hasTexture = true;

        if (pivot)
        {
            child.origin.set(pivot.x, pivot.y);
        }

        SetExtentFromFrame(child, frame);

        //  This rarely changes, so we'll set it here, rather than every game step:
        SetVertexUVsFromFrame(child.id, frame);

        SetDirtyFrame(child.id);
    });

    return children;
}
