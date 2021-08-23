import { DepthFirstSearch3D } from './DepthFirstSearch3D';
import { IGameObject3D } from '../gameobjects3d/IGameObject3D';

export function FindChildren3DByName (parent: IGameObject3D, searchString: string): IGameObject3D[]
{
    const children = DepthFirstSearch3D(parent);
    const regex = RegExp(searchString);

    const results: IGameObject3D[] = [];

    children.forEach(child =>
    {
        if (regex.test(child.name))
        {
            results.push(child);
        }
    });

    return results;
}
