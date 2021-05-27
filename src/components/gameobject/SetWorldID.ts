import { GameObjectComponent } from './GameObjectComponent';

export function SetWorldID (id: number, worldID: number): void
{
    GameObjectComponent.worldID[id] = worldID;
}
