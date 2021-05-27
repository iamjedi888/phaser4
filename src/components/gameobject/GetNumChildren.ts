import { GameObjectComponent } from './GameObjectComponent';

export function GetNumChildren (id: number): number
{
    return GameObjectComponent.numChildren[id];
}
