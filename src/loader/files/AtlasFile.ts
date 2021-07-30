import { AtlasParser } from '../../textures/parsers/AtlasParser';
import { GetTexture } from '../../textures/GetTexture';
import { IFile } from '../IFile';
import { IFileData } from '../IFileData';
import { ImageFile } from './ImageFile';
import { JSONFile } from './JSONFile';

export async function AtlasFile (key: string, textureURL?: string, atlasURL?: string, fileData: IFileData = {}): Promise<IFile>
{
    try
    {
        await ImageFile(key, textureURL, Object.assign({}, fileData, { skipCache: false }));

        const json = await JSONFile(key, atlasURL, Object.assign({}, fileData, { skipCache: true }));

        //  By this stage, the JSON and image are loaded and in the texture manager
        AtlasParser(GetTexture(key), json.data);
    }
    catch (error)
    {
        return Promise.reject();
    }
}
