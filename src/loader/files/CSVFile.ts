import { Cache } from '../../cache/Cache';
import { CreateFile } from '../CreateFile';
import { GetURL } from '../GetURL';
import { IFile } from '../IFile';
import { IFileData } from '../IFileData';
import { ILoader } from '../ILoader';
import { IRequestFile } from '../IRequestFile';

export function CSVFile (key: string, url?: string, fileData: IFileData = {}): IRequestFile
{
    const onstart = (loader?: ILoader) => CreateFile(key, GetURL(key, url, 'csv', loader), fileData.skipCache);

    const cache = Cache.get('CSV');

    const preload = (file: IFile) =>
    {
        return (cache && (!cache.has(key) || !file.skipCache));
    };

    const onload = async (file: IFile) =>
    {
        file.data = await file.response.text();

        if (!file.skipCache)
        {
            cache.set(key, file.data);
        }

        return true;
    };

    return { onstart, preload, onload, fileData };
}
