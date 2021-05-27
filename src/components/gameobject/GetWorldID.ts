import { GameObjectComponent } from './GameObjectComponent';

export function GetWorldID (id: number): number
{
    return GameObjectComponent.worldID[id];
}
