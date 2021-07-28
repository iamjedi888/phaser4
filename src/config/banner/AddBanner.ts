/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { CONFIG_DEFAULTS } from '../const';
import { ConfigStore } from '../ConfigStore';

export function AddBanner (): void
{
    const { title, version, url, color, background } = ConfigStore.get(CONFIG_DEFAULTS.BANNER);

    if (title !== '')
    {
        const str = `${title} ${version}`.trimEnd();

        console.log(
            `%c${str}%c ${url}`,
            `padding: 4px 16px; color: ${color}; background: ${background}`,
            ''
        );
    }
}
