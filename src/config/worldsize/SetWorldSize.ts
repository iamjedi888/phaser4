import { CONFIG_DEFAULTS } from '../const';
import { ConfigStore } from '../ConfigStore';

export function SetWorldSize (size: number): void
{
    ConfigStore.set(CONFIG_DEFAULTS.WORLD_SIZE, size);
}
