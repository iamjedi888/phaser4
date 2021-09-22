import { ITextureFileFormat, TextureFile } from './TextureFile';

import { IFile } from '../IFile';
import { IFileData } from '../IFileData';

export async function LoadTextureFile (key: string, urls: ITextureFileFormat, fileData: IFileData = {}): Promise<IFile>
{
    const load = TextureFile(key, urls, fileData);

    return load();
}
