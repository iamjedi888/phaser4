import { IFile } from '../IFile';
import { IFileData } from '../IFileData';
import { RequestFile } from '../RequestFile';
import { XMLFile } from './XMLFile';

export async function LoadXMLFile (key: string, url?: string, fileData: IFileData = {}): Promise<IFile>
{
    const { onstart, preload, onload, fileData: parsedFileData } = XMLFile(key, url, fileData);

    return RequestFile(onstart(), preload, onload, parsedFileData);
}
