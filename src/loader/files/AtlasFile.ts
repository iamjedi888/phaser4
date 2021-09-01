import { AtlasParser } from '../../textures/parsers/AtlasParser';
import { GetTexture } from '../../textures/GetTexture';
import { IFile } from '../IFile';
import { IFileData } from '../IFileData';
import { ILoader } from '../ILoader';
import { ImageFile } from './ImageFile';
import { JSONFile } from './JSONFile';
import { RequestFileType } from '../RequestFileType';

export function AtlasFile (key: string, textureURL?: string, atlasURL?: string, fileData: IFileData = {}): RequestFileType
{
    return async (loader?: ILoader): Promise<IFile> =>
    {
        try
        {
            const loadImage = ImageFile(key, textureURL, Object.assign({}, fileData, { skipCache: false }));
            const loadJSON = JSONFile(key, atlasURL, Object.assign({}, fileData, { skipCache: true }));

            const image = await loadImage(loader);
            const json = await loadJSON(loader);

            //  By this stage, the JSON and image are loaded and in the texture manager
            AtlasParser(GetTexture(key), json.data);

            return Promise.resolve(image);
        }
        catch (error)
        {
            return Promise.reject();
        }
    };
}
