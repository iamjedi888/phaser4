import { IContainer } from '../gameobjects/container/IContainer';
import { IFrame } from './IFrame';
import { SetExtent } from '../components/transform/SetExtent';

export function SetExtentFromFrame <C extends IContainer, F extends IFrame> (child: C, frame: F): C
{
    const originX = child.origin.x;
    const originY = child.origin.y;

    const sourceSizeWidth = frame.sourceSizeWidth;
    const sourceSizeHeight = frame.sourceSizeHeight;

    let x: number;
    let y: number;
    let width: number;
    let height: number;

    if (frame.trimmed)
    {
        x = frame.spriteSourceSizeX - (originX * sourceSizeWidth);
        y = frame.spriteSourceSizeY - (originY * sourceSizeHeight);

        width = frame.spriteSourceSizeWidth;
        height = frame.spriteSourceSizeHeight;
    }
    else
    {
        x = -originX * sourceSizeWidth;
        y = -originY * sourceSizeHeight;

        width = sourceSizeWidth;
        height = sourceSizeHeight;
    }

    SetExtent(child.id, x, y, width, height);

    return child;
}
