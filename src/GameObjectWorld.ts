import { createWorld, setDefaultSize } from 'bitecs';

//  TODO - Move to Game Config somehow
if (window['defaultSize'])
{
    setDefaultSize(parseInt(window['defaultSize']));
}
else
{
    // setDefaultSize(10000);
    // setDefaultSize(100000);
    setDefaultSize(150000);
    // setDefaultSize(200000);
    // setDefaultSize(250000);
    // setDefaultSize(300000);
    // setDefaultSize(350000);
    // setDefaultSize(400000);
    // setDefaultSize(500000);
    // setDefaultSize(550000);
    // setDefaultSize(1000000);
    // setDefaultSize(2000000);
}

const world = createWorld();

export const GameObjectWorld = world;
