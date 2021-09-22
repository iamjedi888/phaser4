import { AtlasFile } from './AtlasFile';
import { AtlasParser } from '../../textures/parsers/AtlasParser';
import { BinaryFile } from './BinaryFile';
import { GetCompressedTextureName } from '../../renderer/webgl1/textures/GetCompressedTextureName';
import { IFile } from '../IFile';
import { IFileData } from '../IFileData';
import { ILoader } from '../ILoader';
import { ImageFile } from './ImageFile';
import { JSONFile } from './JSONFile';
import { KTXParser } from '../../textures/parsers/KTXParser';
import { PVRParser } from '../../textures/parsers/PVRParser';
import { ProcessBindingQueue } from '../../renderer/webgl1/renderpass/ProcessBindingQueue';
import { RequestFileType } from '../RequestFileType';
import { SupportsCompressedTexture } from '../../renderer/webgl1/textures/SupportsCompressedTexture';
import { Texture } from '../../textures/Texture';
import { TextureBaseFormat } from '../../renderer/webgl1/textures/ICompressedTextures';
import { TextureContainer } from '../../renderer/webgl1/textures/ICompressedTextures';
import { TextureManagerInstance } from '../../textures/TextureManagerInstance';

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

export function TextureFile (key: string, urls: ITextureFileFormat, fileData: IFileData = {}): RequestFileType
{
    if (!fileData.glConfig)
    {
        fileData.glConfig = {};
    }

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
            return AtlasFile(key, entry.textureURL, entry.atlasURL, fileData);
        }
        else
        {
            return ImageFile(key, entry.textureURL, fileData);
        }
    }

    return async (loader?: ILoader): Promise<IFile> =>
    {
        try
        {
            const loadImage = BinaryFile(key, entry.textureURL, Object.assign({}, fileData, { skipCache: true }));

            const image = await loadImage(loader);

            let json;

            if (entry.atlasURL)
            {
                const loadJSON = JSONFile(key, entry.atlasURL, Object.assign({}, fileData, { skipCache: true }));

                json = await loadJSON(loader);
            }

            if (!entry.type)
            {
                entry.type = (image.url.endsWith('.ktx')) ? 'KTX' : 'PVR';
            }

            let textureData;

            if (entry.type === 'PVR')
            {
                textureData = PVRParser(image.data as ArrayBuffer);
            }
            else if (entry.type === 'KTX')
            {
                textureData = KTXParser(image.data as ArrayBuffer);
            }

            if (textureData && SupportsCompressedTexture(entry.format, textureData.internalFormat))
            {
                textureData.format = GetCompressedTextureName(entry.format, textureData.internalFormat);

                const texture = new Texture(null, textureData.width, textureData.height, Object.assign(fileData.glConfig, textureData));

                const textureManager = TextureManagerInstance.get();

                textureManager.add(key, texture);

                ProcessBindingQueue();

                if (json && json.data)
                {
                    AtlasParser(texture, json.data);
                }

                return Promise.resolve(image);
            }
            else
            {
                return Promise.reject();
            }
        }
        catch (error)
        {
            return Promise.reject();
        }
    };
}
