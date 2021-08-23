import { IGameObject3D } from '../gameobjects3d/IGameObject3D';

export function RemoveChild3DAt (parent: IGameObject3D, index: number): IGameObject3D | undefined
{
    const children = parent.children;
    let child: IGameObject3D;

    if (index >= 0 && index < children.length)
    {
        const removed = children.splice(index, 1);

        if (removed[0])
        {
            child = removed[0];
            child.parent = null;
        }
    }

    return child;
}
