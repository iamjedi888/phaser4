import { CreateFile } from '../CreateFile';
import { GetURL } from '../GetURL';
import { IFile } from '../IFile';
import { IGLTextureBindingConfig } from '../../renderer/webgl1/textures/IGLTextureBindingConfig';
import { TextureManagerInstance } from '../../textures/TextureManagerInstance';

export async function ImageFile (key: string, url?: string, requestInit?: RequestInit, glConfig?: IGLTextureBindingConfig): Promise<IFile>
{
    const file = CreateFile(key, GetURL(key, url, '.png'));

    const textureManager = TextureManagerInstance.get();

    if (!textureManager || textureManager.has(key))
    {
        return Promise.reject(file);
    }
    else
    {
        try
        {
            const request = new Request(file.url, Object.assign({}, requestInit));

            file.response = await fetch(request);

            if (file.response.ok)
            {
                const blob = await file.response.blob();

                const image = await createImageBitmap(blob);

                file.data = textureManager.add(key, image, glConfig);

                return Promise.resolve(file);
            }
            else
            {
                return Promise.reject(file);
            }
        }
        catch (error)
        {
            file.error = error;

            return Promise.reject(file);
        }
    }
}
