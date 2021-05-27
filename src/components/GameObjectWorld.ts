import { addEntity, createWorld } from 'bitecs';

const world = createWorld();

//  Lock out entity zero, so nothing else can ever be assigned to it

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const zeroEntity = addEntity(world);

export const GameObjectWorld = world;
