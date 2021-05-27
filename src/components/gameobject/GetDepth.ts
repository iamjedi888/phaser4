import { GameObjectComponent } from './GameObjectComponent';

export function GetDepth (id: number): number
{
    return GameObjectComponent.depth[id];
}
