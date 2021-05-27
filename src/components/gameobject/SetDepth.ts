import { GameObjectComponent } from './GameObjectComponent';

export function SetDepth (id: number, depth: number): void
{
    GameObjectComponent.depth[id] = depth;
}
