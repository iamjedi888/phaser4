import { CONFIG_DEFAULTS } from '../const';
import { ConfigStore } from '../ConfigStore';

export function GetWorldHeight (): number
{
    return ConfigStore.get(CONFIG_DEFAULTS.WORLD_HEIGHT);
}
