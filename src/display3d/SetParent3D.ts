import { DepthFirstSearch3D } from './DepthFirstSearch3D';
import { IGameObject3D } from '../gameobjects3d/IGameObject3D';
import { RemoveChild3D } from './RemoveChild3D';
import { SetWorld3D } from './SetWorld3D';

export function SetParent3D (parent: IGameObject3D, ...children: IGameObject3D[]): IGameObject3D[]
{
    children.forEach(child =>
    {
        if (child.parent)
        {
            RemoveChild3D(child.parent, child);
        }

        child.parent = parent;
    });

    const parentWorld = parent.world;

    if (parentWorld)
    {
        //  Full list of all children, including sub-children
        SetWorld3D(parentWorld, ...DepthFirstSearch3D(parent));
    }

    return children;
}
