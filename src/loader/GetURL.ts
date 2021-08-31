import { ILoader } from './ILoader';
import { IsAbsoluteURI } from './IsAbsoluteURI';

export function GetURL (key: string, url: string, extension: string, loader?: ILoader): string
{
    if (!url)
    {
        url = `${key}.${extension}`;
    }

    if (IsAbsoluteURI(url))
    {
        return url;
    }
    else if (loader)
    {
        return `${loader.baseURL}${loader.path}${url}`;
    }
    else
    {
        return url;
    }
}
