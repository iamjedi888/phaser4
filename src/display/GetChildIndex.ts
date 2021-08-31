import { GetPreviousSiblingID } from '../components/hierarchy/GetPreviousSiblingID';
import { IGameObject } from '../gameobjects/IGameObject';

export function GetChildIndex <T extends IGameObject> (child: T): number
{
    const childID = child.id;

    let index = 0;

    let prev = GetPreviousSiblingID(childID);

    while (prev > 0)
    {
        prev = GetPreviousSiblingID(childID);

        index++;
    }

    return index;
}
