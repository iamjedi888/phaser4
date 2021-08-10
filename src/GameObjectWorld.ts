import { createWorld, setDefaultSize } from 'bitecs';

setDefaultSize(100000);
// setDefaultSize(250000);
// setDefaultSize(500000);

const world = createWorld();

export const GameObjectWorld = world;
