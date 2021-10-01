import { IContainer } from '../../gameobjects/container/IContainer';
import { SetExtent } from './SetExtent';

export function SetExtentFromSize <C extends IContainer> (child: C, width: number, height: number): C
{
    const originX = child.origin.x;
    const originY = child.origin.y;

    const x = -originX * width;
    const y = -originY * height;

    SetExtent(child.id, x, y, width, height);

    return child;
}
