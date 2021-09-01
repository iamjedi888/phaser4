import { IFile } from '../IFile';
import { IFileData } from '../IFileData';
import { XMLFile } from './XMLFile';

export async function LoadXMLFile (key: string, url?: string, fileData: IFileData = {}): Promise<IFile>
{
    const load = XMLFile(key, url, fileData);

    return load();
}
