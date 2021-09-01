import { AtlasFile } from './AtlasFile';
import { IFile } from '../IFile';
import { IFileData } from '../IFileData';

export async function LoadAtlasFile (key: string, textureURL?: string, atlasURL?: string, fileData: IFileData = {}): Promise<IFile>
{
    const load = AtlasFile(key, textureURL, atlasURL, fileData);

    return load();
}
