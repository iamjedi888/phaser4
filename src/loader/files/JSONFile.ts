import { Cache } from '../../cache/Cache';
import { CreateFile } from '../CreateFile';
import { GetURL } from '../GetURL';
import { IFile } from '../IFile';

export async function JSONFile (key: string, url?: string, requestInit?: RequestInit): Promise<IFile>
{
    const file = CreateFile(key, GetURL(key, url, '.json'));

    const cache = Cache.get('JSON');

    if (!cache || cache.has(key) && !file.skipCache)
    {
        return Promise.reject(file);
    }
    else
    {
        try
        {
            const request = new Request(file.url, Object.assign({}, requestInit));

            file.response = await fetch(request);

            if (file.response.ok)
            {
                file.data = await file.response.json();

                if (!file.skipCache)
                {
                    cache.set(key, file.data);
                }

                return Promise.resolve(file);
            }
            else
            {
                return Promise.reject(file);
            }
        }
        catch (error)
        {
            file.error = error;

            return Promise.reject(file);
        }
    }
}
