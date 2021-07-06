import { AtlasParser, KTXParser, PVRParser } from '../../textures/parsers';

import { AtlasFile } from './AtlasFile';
import { File } from '../File';
import { GetTexture } from '../../textures/GetTexture';
import { GetURL } from '../GetURL';
import { IGLTextureBindingConfig } from '../../renderer/webgl1/textures/IGLTextureBindingConfig';
import { ImageFile } from './ImageFile';
import { JSONFile } from './JSONFile';
import { Texture } from '../../textures';
import { TextureManagerInstance } from '../../textures/TextureManagerInstance';
import { WebGLRendererInstance } from '../../renderer/webgl1/WebGLRendererInstance';
import { XHRLoader } from '../XHRLoader';

/*
    //  key = Compression Format (ETC, ASTC, etc) that the browser must support
    //  type = The Container Format (PVR or KTX) - if not given will try to extract from textureURL extension
    //  textureURL = URL of the texture file (todo: could also be base64 data?)
    //  atlasURL = optional - if given, will treat as an AtlasFile and load as JSON, otherwise an ImageFile

    ASTCs have to have
    Channel Type: Unsigned Normalized Bytes (UNorm)
    Color Space: Linear RGB

    Texture Formats should be ordered in alphabetical / GPU priority order, with IMG last

    TextureFile('pic', {
        ASTC: { type: string, textureURL?: string, atlasURL?: string },
        ETC: { type: string, textureURL?: string, atlasURL?: string },
        S3TC: { type: string, textureURL?: string, atlasURL?: string },
        IMG: { type: string, textureURL?: string, atlasURL?: string }
    });
*/

export type TextureFormat = 'ETC' | 'ETC1' | 'ATC' | 'ASTC' | 'BPTC' | 'RGTC' | 'PVRTC' | 'S3TC' | 'S3TCSRGB' | 'IMG';
export type TextureContainer = 'PVR' | 'KTX';

export interface ITextureFileEntry
{
    format?: TextureFormat,
    type?: (TextureContainer | string),
    textureURL?: string,
    atlasURL?: string
}

export interface ITextureFormat
{
    ETC?: ITextureFileEntry,
    ETC1?: ITextureFileEntry,
    ATC?: ITextureFileEntry,
    ASTC?: ITextureFileEntry,
    BPTC?: ITextureFileEntry,
    RGTC?: ITextureFileEntry,
    PVRTC?: ITextureFileEntry,
    S3TC?: ITextureFileEntry,
    S3TCSRGB?: ITextureFileEntry,
    IMG?: ITextureFileEntry
}

export function TextureFile (key: string, urls: ITextureFormat, glConfig: IGLTextureBindingConfig = {}): File
{
    //  Find out what compression formats the renderer supports
    const renderer = WebGLRendererInstance.get();

    //  No WebGL, but we have an IMG entry, so use that
    if (!renderer && urls[ 'IMG' ])
    {
        //  Fallback to ImageFile for truecolor entry
        return ImageFile(key, urls[ 'IMG' ].textureURL);
    }

    let formats: Record<GLenum, string>;
    let entry: ITextureFileEntry;

    for (const textureFormat in urls)
    {
        formats = renderer.compression[ textureFormat.toUpperCase() ];

        if (formats)
        {
            //  Found supported texture format
            entry = urls[ textureFormat ];

            entry.format = textureFormat.toUpperCase() as TextureFormat;

            console.log('Browser supports', textureFormat, 'entry:', entry);

            break;
        }
    }

    if (!entry)
    {
        console.warn(`TextureFile: ${key} = No supported format or IMG fallback`);

        return;
    }

    if (entry.format === 'IMG')
    {
        if (entry.atlasURL)
        {
            return AtlasFile(key, entry.textureURL, entry.atlasURL, glConfig);
        }
        else
        {
            return ImageFile(key, entry.textureURL, glConfig);
        }
    }

    const file = new File(key, entry.textureURL);

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
                XHRLoader(file).then(async file =>
                {
                    if (file.hasLoaded)
                    {
                        let textureData;

                        if (entry.type === 'PVR')
                        {
                            textureData = PVRParser(file.data);
                        }
                        else if (entry.type === 'KTX')
                        {
                            textureData = KTXParser(file.data);
                        }

                        if (textureData && textureData.internalFormat in formats)
                        {
                            textureData.format = formats[ textureData.internalFormat ];

                            const texture = new Texture(null, textureData.width, textureData.height, Object.assign(glConfig, textureData));

                            textureManager.add(file.key, texture);

                            if (entry.atlasURL)
                            {
                                const json = JSONFile(key, entry.atlasURL);

                                json.url = GetURL(json.key, json.url, '.json', file.loader);
                                json.skipCache = true;

                                await json.load();

                                if (json.data)
                                {
                                    AtlasParser(texture, json.data);

                                    resolve(file);
                                }
                            }
                            else
                            {
                                resolve(file);
                            }
                        }
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
