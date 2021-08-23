import { IGameObject3D } from '../gameobjects3d/IGameObject3D';
import { SetParent3D } from './SetParent3D';

export function AddChildren3DAt (parent: IGameObject3D, index: number, ...children: IGameObject3D[]): IGameObject3D[]
{
    const parentChildren = parent.children;

    if (index >= 0 && index <= parentChildren.length)
    {
        children.reverse().forEach(child =>
        {
            children.splice(index, 0, child);

            SetParent3D(parent, child);

            // child.transform.updateWorld();
        });
    }

    return children;
}
