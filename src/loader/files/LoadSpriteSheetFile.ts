import { IFile } from '../IFile';
import { IFileData } from '../IFileData';
import { IFrameConfig } from '../../textures/IFrameConfig';
import { SpriteSheetFile } from './SpriteSheetFile';

export async function LoadSpriteSheetFile (key: string, url: string, frameConfig: IFrameConfig, fileData: IFileData = {}): Promise<IFile>
{
    const load = SpriteSheetFile(key, url, frameConfig, fileData);

    return load();
}
