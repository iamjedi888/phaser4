import { IGameObject3D } from '../gameobjects3d/IGameObject3D';
import { SetParent3D } from './SetParent3D';

export function AddChild3D <T extends IGameObject3D> (parent: IGameObject3D, child: T): T
{
    parent.children.push(child);

    SetParent3D(parent, child);

    // child.transform.updateWorld();

    return child;
}
