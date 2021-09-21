import { BinaryFile } from './BinaryFile';
import { IFile } from '../IFile';
import { IFileData } from '../IFileData';

export async function LoadBinaryFile (key: string, url?: string, fileData: IFileData = {}): Promise<IFile>
{
    const load = BinaryFile(key, url, fileData);

    return load();
}
