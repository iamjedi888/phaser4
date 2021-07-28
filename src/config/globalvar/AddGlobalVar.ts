import { CONFIG_DEFAULTS } from '../const';
import { ConfigStore } from '../ConfigStore';
import { Game } from '../../Game';

export function AddGlobalVar (game: Game): void
{
    const globalVar = ConfigStore.get(CONFIG_DEFAULTS.GLOBAL_VAR);

    if (globalVar && window)
    {
        (window as unknown)[globalVar] = game;
    }
}
