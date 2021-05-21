import { IWorld, defineSystem } from 'bitecs';

import { GameObjectWorld } from './GameObjectWorld';

export function DefineSystem (update: (world: IWorld) => void, world: IWorld = GameObjectWorld): () => void
{
    const system = defineSystem(update);

    return () => system(world);
}
