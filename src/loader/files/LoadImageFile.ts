import { IFile } from '../IFile';
import { IFileData } from '../IFileData';
import { ImageFile } from './ImageFile';

export async function LoadImageFile (key: string, url?: string, fileData: IFileData = {}): Promise<IFile>
{
    const load = ImageFile(key, url, fileData);

    return load();
}
