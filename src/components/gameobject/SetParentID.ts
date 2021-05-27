import { GameObjectComponent } from './GameObjectComponent';

export function SetParentID (id: number, parentID: number): void
{
    GameObjectComponent.parentID[id] = parentID;
}
