import { Frame } from '../../textures/Frame';
import { ISprite } from './ISprite';
import { SetExtentFromFrame } from '../../textures/SetExtentFromFrame';
import { SetVertexUVsFromFrame } from '../../textures/SetVertexUVsFromFrame';
import { Texture } from '../../textures/Texture';

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
    });

    return children;
}
