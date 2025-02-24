import { Cache } from '../../cache/Cache';
import { CreateFile } from '../CreateFile';
import { GetURL } from '../GetURL';
import { IFile } from '../IFile';
import { IFileData } from '../IFileData';
import { ILoader } from '../ILoader';
import { RequestFile } from '../RequestFile';
import { RequestFileType } from '../RequestFileType';

export function BinaryFile (key: string, url?: string, fileData: IFileData = {}): RequestFileType
{
    return (loader?: ILoader): Promise<IFile> =>
    {
        const file = CreateFile(key, GetURL(key, url, 'bin', loader), fileData.skipCache);

        const cache = Cache.get('Binary');

        const preload = (file: IFile) =>
        {
            return (cache && (!cache.has(key) || !file.skipCache));
        };

        const onload = async (file: IFile) =>
        {
            file.data = await file.response.arrayBuffer();

            if (!file.skipCache)
            {
                cache.set(key, file.data);
            }

            return true;
        };

        return RequestFile(file, preload, onload, fileData);
    };
}
