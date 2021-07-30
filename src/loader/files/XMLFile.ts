import { Cache } from '../../cache/Cache';
import { CreateFile } from '../CreateFile';
import { GetURL } from '../GetURL';
import { IFile } from '../IFile';
import { IFileData } from '../IFileData';
import { ParseXML } from '../../dom/ParseXML';
import { RequestFile } from '../RequestFile';

export async function XMLFile (key: string, url?: string, fileData: IFileData = {}): Promise<IFile>
{
    const file = CreateFile(key, GetURL(key, url, 'xml'), fileData.skipCache);

    const cache = Cache.get('XML');

    const preload = (file: IFile) =>
    {
        return (cache && (!cache.has(key) || !file.skipCache));
    };

    const onload = async (file: IFile) =>
    {
        const data = await file.response.text();

        const xml = ParseXML(data);

        if (xml !== null)
        {
            file.data = xml;

            if (!file.skipCache)
            {
                cache.set(key, xml);
            }

            return true;
        }
        else
        {
            return false;
        }
    };

    return RequestFile(file, preload, onload, fileData);
}
