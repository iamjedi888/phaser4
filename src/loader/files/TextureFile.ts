import { AtlasParser, KTXParser, PVRParser } from '../../textures/parsers';
import { TextureBaseFormat, TextureContainer } from '../../renderer/webgl1/textures/ICompressedTextures';

import { AtlasFile } from './AtlasFile';
import { File } from '../File';
import { GetCompressedTextureName } from '../../renderer/webgl1/textures/GetCompressedTextureName';
import { GetURL } from '../GetURL';
import { IGLTextureBindingConfig } from '../../renderer/webgl1/textures/IGLTextureBindingConfig';
import { ImageFile } from './ImageFile';
import { JSONFile } from './JSONFile';
import { ProcessBindingQueue } from '../../renderer/webgl1/renderpass';
import { SupportsCompressedTexture } from '../../renderer/webgl1/textures/SupportsCompressedTexture';
import { Texture } from '../../textures';
import { TextureManagerInstance } from '../../textures/TextureManagerInstance';
import { XHRLoader } from '../XHRLoader';

/*
    //  key = Compression Format (ETC, ASTC, etc) that the browser must support
    //  type = The Container Format (PVR or KTX) - if not given will try to extract from textureURL extension
    //  textureURL = URL of the texture file (todo: could also be base64 data?)
    //  atlasURL = optional - if given, will treat as an AtlasFile and load as JSON, otherwise an ImageFile

    ASTCs must be:
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

export interface ITextureFileEntry
{
    format?: TextureBaseFormat,
    type?: (TextureContainer | string),
    textureURL?: string,
    atlasURL?: string
}

//  TODO - Allow them to pass in an ArrayBuffer directly?

export interface ITextureFileFormat
{
    ETC?: ITextureFileEntry | string,
    ETC1?: ITextureFileEntry | string,
    ATC?: ITextureFileEntry | string,
    ASTC?: ITextureFileEntry | string,
    BPTC?: ITextureFileEntry | string,
    RGTC?: ITextureFileEntry | string,
    PVRTC?: ITextureFileEntry | string,
    S3TC?: ITextureFileEntry | string,
    S3TCSRGB?: ITextureFileEntry | string,
    IMG?: ITextureFileEntry | string
}

export function TextureFile (key: string, urls: ITextureFileFormat, glConfig: IGLTextureBindingConfig = {}): File
{
    const entry: ITextureFileEntry = {
        format: null,
        type: null,
        textureURL: null,
        atlasURL: null
    };

    for (const textureBaseFormat in urls)
    {
        if (SupportsCompressedTexture(textureBaseFormat))
        {
            const urlEntry = urls[ textureBaseFormat ];

            if (typeof urlEntry === 'string')
            {
                entry.textureURL = urlEntry;
            }
            else
            {
                Object.assign(entry, urlEntry);
            }

            entry.format = textureBaseFormat.toUpperCase() as TextureBaseFormat;

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

        if (!entry.type)
        {
            entry.type = (file.url.endsWith('.ktx')) ? 'KTX' : 'PVR';
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

                        if (textureData && SupportsCompressedTexture(entry.format, textureData.internalFormat))
                        {
                            textureData.format = GetCompressedTextureName(entry.format, textureData.internalFormat);

                            const texture = new Texture(null, textureData.width, textureData.height, Object.assign(glConfig, textureData));

                            textureManager.add(file.key, texture);

                            ProcessBindingQueue();

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
