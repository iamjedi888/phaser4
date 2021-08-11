import { CONFIG_DEFAULTS } from '../const';
import { ConfigStore } from '../ConfigStore';

//  Set the maximum width and depth a single World can be.
//  These values  are the total number of Game Objects allowed per width and the total depth of nesting they can have.
//  It is NOT the pixel size of the world.

export function SetWorldSize (width: number = 17592186, height: number = 512): void
{
    if (width * height > 9007199254)
    {
        throw new Error('Invalid world size');
    }

    ConfigStore.set(CONFIG_DEFAULTS.WORLD_WIDTH, width);
    ConfigStore.set(CONFIG_DEFAULTS.WORLD_HEIGHT, height);
    ConfigStore.set(CONFIG_DEFAULTS.WORLD_SIZE, width * height);
}
