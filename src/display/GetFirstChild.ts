import { GetChildrenFromParentID } from '../components/hierarchy/GetChildrenFromParentID';
import { IGameObject } from '../gameobjects/IGameObject';

export function GetFirstChild <P extends IGameObject> (parent: P, property?: string | symbol, value?: never): IGameObject | undefined
{
    const children = GetChildrenFromParentID(parent.id);

    if (!property)
    {
        return children[0];
    }

    for (let i = 0; i < children.length; i++)
    {
        const child = children[i];

        if (property in child && (value === undefined || child[property] === value))
        {
            return child;
        }
    }
}
