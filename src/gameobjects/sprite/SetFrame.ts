import { Frame } from '../../textures/Frame';
import { ISprite } from './ISprite';
import { Texture } from '../../textures';

export function SetFrame <T extends ISprite> (texture: Texture, key?: string | number | Frame, ...children: T[]): T[]
{
    const frame = texture.getFrame(key);

    const pivot = frame.pivot;

    children.forEach(child =>
    {
        //  TODO - If frame is dirty, reset it anyway
        if (!child || frame === child.frame)
        {
            return;
        }

        child.frame = frame;
        child.hasTexture = true;

        if (pivot)
        {
            child.setOrigin(pivot.x, pivot.y);
        }

        frame.copyToExtent(child);

        //  This rarely changes, so we'll set it here, rather than every game step:
        frame.copyToVertices(child.id);
    });

    return children;
}
