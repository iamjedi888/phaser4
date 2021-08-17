import { GetParentID } from './GetParentID';
import { GetWorldID } from './GetWorldID';

export function IsRoot (id: number): boolean
{
    return (GetWorldID(id) === GetParentID(id));
}
