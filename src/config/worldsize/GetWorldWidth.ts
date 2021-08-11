import { CONFIG_DEFAULTS } from '../const';
import { ConfigStore } from '../ConfigStore';

export function GetWorldWidth (): number
{
    return ConfigStore.get(CONFIG_DEFAULTS.WORLD_WIDTH);
}
