import { IFile } from '../IFile';
import { IFileData } from '../IFileData';
import { ImageFile } from './ImageFile';
import { RequestFile } from '../RequestFile';

export async function LoadImageFile (key: string, url?: string, fileData: IFileData = {}): Promise<IFile>
{
    const { onstart, preload, onload, fileData: parsedFileData } = ImageFile(key, url, fileData);

    return RequestFile(onstart(), preload, onload, parsedFileData);
}
