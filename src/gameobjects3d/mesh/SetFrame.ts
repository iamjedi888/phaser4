import { Frame } from '../../textures/Frame';
import { IMesh } from './IMesh';
import { Texture } from '../../textures';

export function SetFrame <T extends IMesh> (texture: Texture, key?: string | number | Frame, ...children: T[]): T[]
{
    const frame = texture.getFrame(key);

    children.forEach(child =>
    {
        if (!child || frame === child.frame)
        {
            return;
        }

        child.frame = frame;
        child.hasTexture = true;
    });

    return children;
}
