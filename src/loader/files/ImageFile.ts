import { CreateFile } from '../CreateFile';
import { GetURL } from '../GetURL';
import { IFile } from '../IFile';
import { IFileData } from '../IFileData';
import { RequestFile } from '../RequestFile';
import { TextureManagerInstance } from '../../textures/TextureManagerInstance';

export async function ImageFile (key: string, url?: string, fileData: IFileData = {}): Promise<IFile>
{
    const file = CreateFile(key, GetURL(key, url, 'png'), fileData?.skipCache);

    const textureManager = TextureManagerInstance.get();

    const preload = () =>
    {
        return (textureManager && (!textureManager.has(key) || !textureManager.get(key).locked));
    };

    const onload = async (file: IFile) =>
    {
        const blob = await file.response.blob();

        let image;

        if (window && 'createImageBitmap' in window && !fileData?.getImage)
        {
            image = await createImageBitmap(blob);
        }
        else
        {
            image = await new Promise <HTMLImageElement> ((resolve, reject)  =>
            {
                const url = URL.createObjectURL(blob);

                const img = new Image();

                img.onload = (): void =>
                {
                    URL.revokeObjectURL(url);

                    resolve(img);
                };

                img.onerror = (): void =>
                {
                    reject();
                };

                img.src = url;

                // Image is immediately-available or cached

                if (img.complete && img.width && img.height)
                {
                    img.onload = null;
                    img.onerror = null;

                    resolve(img);
                }
            });
        }

        if (!image)
        {
            return false;
        }

        if (fileData.skipCache)
        {
            file.data = image;
        }
        else if (textureManager.has(key))
        {
            file.data = textureManager.update(key, image, fileData?.glConfig);
        }
        else
        {
            file.data = textureManager.add(key, image, fileData?.glConfig);
        }

        return true;
    };

    return RequestFile(file, preload, onload, fileData);
}
