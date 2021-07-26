import { GetWorldID } from '../components/hierarchy/GetWorldID';

export function CheckDirtyTransforms (worldID: number, list: number[]): boolean
{
    for (let i = 0; i < list.length; i++)
    {
        if (GetWorldID(list[i]) === worldID)
        {
            return true;
        }
    }

    return false;
}
