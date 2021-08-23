import { DepthFirstSearch3D } from './DepthFirstSearch3D';
import { IGameObject3D } from '../gameobjects3d/IGameObject3D';

export function FindChild3DByName (parent: IGameObject3D, searchString: string): IGameObject3D | undefined
{
    const children = DepthFirstSearch3D(parent);
    const regex = RegExp(searchString);

    for (let i = 0; i < children.length; i++)
    {
        const child = children[i];

        if (regex.test(child.name))
        {
            return child;
        }
    }
}
