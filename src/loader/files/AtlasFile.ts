import { AtlasParser } from '../../textures/parsers/AtlasParser';
import { File } from '../File';
import { GetTexture } from '../../textures/GetTexture';
import { GetURL } from '../GetURL';
import { IGLTextureBindingConfig } from '../../renderer/webgl1/textures/IGLTextureBindingConfig';
import { ImageFile } from './ImageFile';
import { JSONFile } from './JSONFile';

export function AtlasFile (key: string, textureURL?: string, atlasURL?: string, glConfig?: IGLTextureBindingConfig): File
{
    const json = JSONFile(key, atlasURL);
    const image = ImageFile(key, textureURL, glConfig);

    const file = new File(key, '');

    file.load = (): Promise<File> =>
    {
        //  If called via a Loader, it has been set into the file const
        json.url = GetURL(json.key, json.url, '.json', file.loader);
        image.url = GetURL(image.key, image.url, '.png', file.loader);

        return new Promise((resolve, reject) =>
        {
            json.skipCache = true;

            json.load().then(() =>
            {
                image.load().then(() =>
                {
                    //  By this stage, the JSON and image are loaded and in the texture manager
                    AtlasParser(GetTexture(key), json.data);

                    resolve(file);

                }).catch(() =>
                {
                    reject(file);
                });

            }).catch(() =>
            {
                reject(file);
            });
        });
    };

    return file;
}
