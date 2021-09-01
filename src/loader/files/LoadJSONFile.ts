import { IFile } from '../IFile';
import { IFileData } from '../IFileData';
import { JSONFile } from './JSONFile';

export async function LoadJSONFile (key: string, url?: string, fileData: IFileData = {}): Promise<IFile>
{
    const load = JSONFile(key, url, fileData);

    return load();
}
