import { File } from '../File';
import { GetURL } from '../GetURL';
import { IFrameConfig } from '../../textures/IFrameConfig';
import { IGLTextureBindingConfig } from '../../renderer/webgl1/textures/IGLTextureBindingConfig';
import { ImageLoader } from '../ImageLoader';
import { SpriteSheetParser } from '../../textures/parsers/SpriteSheetParser';
import { TextureManagerInstance } from '../../textures/TextureManagerInstance';

export function SpriteSheetFile (key: string, url: string, frameConfig: IFrameConfig, glConfig?: IGLTextureBindingConfig): File
{
    const file = new File(key, url);

    file.load = (): Promise<File> =>
    {
        file.url = GetURL(file.key, file.url, '.png', file.loader);

        if (file.loader)
        {
            file.crossOrigin = file.loader.crossOrigin;
        }

        return new Promise((resolve, reject) =>
        {
            const textureManager = TextureManagerInstance.get();

            if (textureManager.has(file.key))
            {
                resolve(file);
            }
            else
            {
                ImageLoader(file).then(file =>
                {
                    const texture = textureManager.add(file.key, file.data, glConfig);

                    if (texture)
                    {
                        SpriteSheetParser(texture, 0, 0, texture.width, texture.height, frameConfig);

                        resolve(file);
                    }
                    else
                    {
                        reject(file);
                    }

                }).catch(file =>
                {
                    reject(file);
                });
            }
        });
    };

    return file;
}
