import { BitmapTextParser } from '../../textures/parsers/BitmapTextParser';
import { GetTexture } from '../../textures/GetTexture';
import { IFile } from '../IFile';
import { IFileData } from '../IFileData';
import { ILoader } from '../ILoader';
import { ImageFile } from './ImageFile';
import { RequestFileType } from '../RequestFileType';
import { XMLFile } from './XMLFile';

export function BitmapTextFile (key: string, textureURL?: string, fontDataURL?: string, fileData: IFileData = {}): RequestFileType
{
    return async (loader?: ILoader): Promise<IFile> =>
    {
        try
        {
            const loadImage = ImageFile(key, textureURL, Object.assign({}, fileData, { skipCache: false }));
            const loadXML = XMLFile(key, fontDataURL, Object.assign({}, fileData, { skipCache: true }));

            const image = await loadImage(loader);
            const xml = await loadXML(loader);

            //  By this stage, the XML and image are loaded and in the texture manager
            const texture = GetTexture(key);

            const fontData = BitmapTextParser(texture, xml.data as XMLDocument);

            texture.data = fontData;

            return Promise.resolve(image);
        }
        catch (error)
        {
            return Promise.reject();
        }
    };
}
