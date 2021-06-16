import { GetChildrenFromParentID } from '../components/hierarchy';
import { IGameObject } from '../gameobjects/IGameObject';

export function GetLastChild <P extends IGameObject> (parent: P, property?: string | symbol, value?: never): IGameObject | undefined
{
    const children = GetChildrenFromParentID(parent.id);

    if (!property)
    {
        return children.pop();
    }

    for (let i = children.length; i >= 0; i--)
    {
        const child = children[i];

        if (property in child && (value === undefined || child[property] === value))
        {
            return child;
        }
    }
}
