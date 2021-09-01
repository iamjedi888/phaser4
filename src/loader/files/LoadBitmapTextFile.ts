import { BitmapTextFile } from './BitmapTextFile';
import { IFile } from '../IFile';
import { IFileData } from '../IFileData';

export async function LoadBitmapTextFile (key: string, textureURL?: string, fontDataURL?: string, fileData: IFileData = {}): Promise<IFile>
{
    const load = BitmapTextFile(key, textureURL, fontDataURL, fileData);

    return load();
}
