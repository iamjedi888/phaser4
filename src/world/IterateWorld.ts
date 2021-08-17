import { GetFirstChildID } from '../components/hierarchy/GetFirstChildID';
import { IBaseWorld } from './IBaseWorld';
import { MoveNext } from '../components/hierarchy/MoveNext';

export function IterateWorld (world: IBaseWorld): number[]
{
    const output: number[] = [];

    const worldID = world.id;

    let next: number = GetFirstChildID(worldID);

    while (next > 0)
    {
        output.push(next);

        next = MoveNext(next, worldID);
    }

    return output;
}
