import { IFile } from '../IFile';
import { IFileData } from '../IFileData';
import { OBJFile } from './OBJFile';

export async function LoadOBJFile (key: string, url?: string, fileData: IFileData = {}): Promise<IFile>
{
    const load = OBJFile(key, url, fileData);

    return load();
}
