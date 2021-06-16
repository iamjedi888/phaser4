import { GetChildrenFromParentID } from '../components/hierarchy';
import { IGameObject } from '../gameobjects/IGameObject';

export function CountMatchingChildren <T extends IGameObject> (parent: T, property: string | symbol, value?: never): number
{
    const children = GetChildrenFromParentID(parent.id);

    let total = 0;

    children.forEach(child =>
    {
        if (property in child && (value === undefined || child[property] === value))
        {
            total++;
        }
    });

    return total;
}
