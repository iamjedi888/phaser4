import { KTXParser, PVRParser } from '../../textures/parsers';

import { File } from '../File';
import { GetURL } from '../GetURL';
import { IGLTextureBindingConfig } from '../../renderer/webgl1/textures/IGLTextureBindingConfig';
import { ImageTagLoader } from '../ImageLoader';
import { Texture } from '../../textures';
import { TextureManagerInstance } from '../../textures/TextureManagerInstance';
import { WebGLRendererInstance } from '../../renderer/webgl1/WebGLRendererInstance';
import { XHRLoader } from '../XHRLoader';

/*
    //  key = Compression Format (ETC, ASTC, etc) that the browser must support
    //  container = The Container Format (PVR or KTX) - if not given will try to extract from textureURL extension
    //  textureURL = URL of the texture file (todo: could also be base64 data?)
    //  atlasURL = optional - if given, will treat as an AtlasFile and load as JSON, otherwise an ImageFile

    TextureFile('pic', {
        ETC: { container: string, textureURL?: string, atlasURL?: string },
        ASTC: { container: string, textureURL?: string, atlasURL?: string },
        S3TC: { container: string, textureURL?: string, atlasURL?: string },
        IMG: { container: string, textureURL?: string, atlasURL?: string }
    });
*/

export enum TextureFormat { ETC = 'ETC', ETC1 = 'ETC1', ATC = 'ATC', ASTC = 'ASTC', BPTC = 'BPTC', RGTC = 'RGTC', PVRTC = 'PVRTC', S3TC = 'S3TC', S3TCSRGB = 'S3TCSRGB' }
export enum TextureContainer { PVR = 'PVR', KTX = 'KTX' }

type TextureFileEntry = {
    container: TextureContainer,
    textureURL?: string,
    atlasURL?: string
};

export function TextureFile (key: string, urls: Record<TextureFormat, TextureFileEntry>, glConfig?: IGLTextureBindingConfig): File
{
    //  Find out what compression formats the renderer supports
    const renderer = WebGLRendererInstance.get();

    if (!renderer)
    {
        //  Fallback to ImageFile for truecolor entry?
    }

    let container: string;
    let url: string;
    let formats: Record<GLenum, string>;

    for (const type in urls)
    {
        formats = renderer.compression[type.toUpperCase()];

        if (formats)
        {
            //  Found supported format
            url = urls[type];

            console.log('Browser supports', type, 'loading', url);

            continue;
        }
    }

    //  Fallback to ImageFile loader?

    const file = new File(key, url);

    file.load = (): Promise<File> =>
    {
        file.url = GetURL(file.key, file.url, '.png', file.loader);

        file.responseType = 'arraybuffer';

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
                XHRLoader(file).then(file =>
                {
                    if (type === '')

                    const textureData = PVRParser(file.data);

                    console.log(textureData);

                    const texture = new Texture(null, textureData.width, textureData.height, Object.assign(glConfig, textureData));

                    textureManager.add(file.key, texture);

                    resolve(file);

                }).catch(file =>
                {
                    reject(file);
                });
            }
        });
    };

    return file;
}
