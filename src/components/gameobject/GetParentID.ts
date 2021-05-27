import { GameObjectComponent } from './GameObjectComponent';

export function GetParentID (id: number): number
{
    return GameObjectComponent.parentID[id];
}
