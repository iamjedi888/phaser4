import { GetFirstChildID } from './GetFirstChildID';
import { GetNextSiblingID } from './GetNextSiblingID';
import { IGameObject } from '../../gameobjects/IGameObject';

export function GetChildIDsFromParent <T extends IGameObject> (parent: T): number[]
{
    let next = GetFirstChildID(parent.id);

    const output = [];

    while (next > 0)
    {
        output.push(next);

        next = GetNextSiblingID(next);
    }

    return output;
}
