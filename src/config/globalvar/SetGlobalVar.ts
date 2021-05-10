import { CONFIG_DEFAULTS } from '../const';
import { ConfigStore } from '../ConfigStore';

export function SetGlobalVar (name: string): void
{
    ConfigStore.set(CONFIG_DEFAULTS.GLOBAL_VAR, name);
}
