import { GetTexture } from '../../textures/GetTexture';
import { IFile } from '../IFile';
import { IFileData } from '../IFileData';
import { IFrameConfig } from '../../textures/IFrameConfig';
import { ILoader } from '../ILoader';
import { ImageFile } from './ImageFile';
import { RequestFileType } from '../RequestFileType';
import { SpriteSheetParser } from '../../textures/parsers/SpriteSheetParser';

export function SpriteSheetFile (key: string, url: string, frameConfig: IFrameConfig, fileData: IFileData = {}): RequestFileType
{
    return async (loader?: ILoader): Promise<IFile> =>
    {
        try
        {
            const load = ImageFile(key, url, Object.assign({}, fileData, { skipCache: false }));

            const file = await load(loader);

            //  By this stage the image is in the Texture Manager
            const texture = GetTexture(key);

            if (texture)
            {
                SpriteSheetParser(texture, 0, 0, texture.width, texture.height, frameConfig);
            }

            return Promise.resolve(file);
        }
        catch (error)
        {
            return Promise.reject();
        }
    };
}
