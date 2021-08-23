import { IGameObject3D } from '../gameobjects3d/IGameObject3D';
import { SetParent3D } from './SetParent3D';

export function AddChild3DAt <T extends IGameObject3D> (parent: IGameObject3D, index: number, child: T): T
{
    const children = parent.children;

    if (index >= 0 && index <= children.length)
    {
        SetParent3D(parent, child);

        children.splice(index, 0, child);

        // child.transform.updateWorld();
    }

    return child;
}
