import { GetTexture } from '../../textures/GetTexture';
import { IFile } from '../IFile';
import { IFileData } from '../IFileData';
import { IFrameConfig } from '../../textures/IFrameConfig';
import { ImageFile } from './ImageFile';
import { SpriteSheetParser } from '../../textures/parsers/SpriteSheetParser';

export async function SpriteSheetFile (key: string, url: string, frameConfig: IFrameConfig, fileData: IFileData = {}): Promise<IFile>
{
    try
    {
        await ImageFile(key, url, Object.assign({}, fileData, { skipCache: false }));

        //  By this stage, the JSON and image are loaded and in the texture manager
        const texture = GetTexture(key);

        if (texture)
        {
            SpriteSheetParser(texture, 0, 0, texture.width, texture.height, frameConfig);
        }
    }
    catch (error)
    {
        return Promise.reject();
    }
}
