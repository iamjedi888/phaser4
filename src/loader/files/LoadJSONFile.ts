import { IFile } from '../IFile';
import { IFileData } from '../IFileData';
import { JSONFile } from './JSONFile';
import { RequestFile } from '../RequestFile';

export async function LoadJSONFile (key: string, url?: string, fileData: IFileData = {}): Promise<IFile>
{
    const { onstart, preload, onload, fileData: parsedFileData } = JSONFile(key, url, fileData);

    return RequestFile(onstart(), preload, onload, parsedFileData);
}
