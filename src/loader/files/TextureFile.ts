import { File } from '../File';
import { GetURL } from '../GetURL';
import { IGLTextureBindingConfig } from '../../renderer/webgl1/textures/IGLTextureBindingConfig';
import { ImageTagLoader } from '../ImageLoader';
import { Texture } from '../../textures';
import { TextureManagerInstance } from '../../textures/TextureManagerInstance';
import { WebGLRendererInstance } from '../../renderer/webgl1/WebGLRendererInstance';
import { XHRLoader } from '../XHRLoader';

// * load.texture('factory', {
// *     etc1: 'assets/factory_etc1.pkm',
// *     s3tc: 'assets/factory_dxt1.pvr',
// *     pvrtc: 'assets/factory_pvrtc.pvr',
// *     truecolor: 'assets/factory.png'
// * });

// DXT: supported by all desktop devices and some Android devices
// PVR: supported by all iOS devices and some Android devices
// ETC1: supported by most Android devices

// https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_pvrtc/
function pvrtc2bppSize (width: number, height: number): number
{
    width = Math.max(width, 16);
    height = Math.max(height, 8);

    return width * height / 4;
}

// https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_pvrtc/
function pvrtc4bppSize (width: number, height: number): number
{
    width = Math.max(width, 8);
    height = Math.max(height, 8);

    return width * height / 2;
}

function GetSize (width: number, height: number, x: number, y: number, dx: number, dy: number, mult: number = 16): number
{
    return Math.floor((width + x) / dx) * Math.floor((height + y) / dy) * mult;
}

// https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_s3tc/
// https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_etc/
// Size for:
// COMPRESSED_RGB_S3TC_DXT1_EXT
// COMPRESSED_R11_EAC
// COMPRESSED_SIGNED_R11_EAC
// COMPRESSED_RGB8_ETC2
// COMPRESSED_SRGB8_ETC2
// COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2
// COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2
function dxtEtcSmallSize (width: number, height: number): number
{
    return GetSize(width, height, 3, 3, 4, 4, 8);
    // return Math.floor((width + 3) / 4) * Math.floor((height + 3) / 4) * 8;
}

// https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_s3tc/
// https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_etc/
// https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_astc/
// Size for:
// COMPRESSED_RGBA_S3TC_DXT3_EXT
// COMPRESSED_RGBA_S3TC_DXT5_EXT
// COMPRESSED_RG11_EAC
// COMPRESSED_SIGNED_RG11_EAC
// COMPRESSED_RGBA8_ETC2_EAC
// COMPRESSED_SRGB8_ALPHA8_ETC2_EAC
// COMPRESSED_RGBA_ASTC_4x4_KHR
function dxtEtcAstcBigSize (width: number, height: number): number
{
    return GetSize(width, height, 3, 3, 4, 4);
    // return Math.floor((width + 3) / 4) * Math.floor((height + 3) / 4) * 16;
}

// https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_astc/
function atc5x4Size (width: number, height: number): number
{
    return GetSize(width, height, 4, 3, 5, 4);
    // return Math.floor((width + 4) / 5) * Math.floor((height + 3) / 4) * 16;
}

// https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_astc/
function atc5x5Size (width: number, height: number): number
{
    return GetSize(width, height, 4, 4, 5, 5);
    // return Math.floor((width + 4) / 5) * Math.floor((height + 4) / 5) * 16;
}

// https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_astc/
function atc6x5Size (width: number, height: number): number
{
    return GetSize(width, height, 5, 4, 6, 5);
    // return Math.floor((width + 5) / 6) * Math.floor((height + 4) / 5) * 16;
}

// https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_astc/
function atc6x6Size (width: number, height: number): number
{
    return GetSize(width, height, 5, 5, 6, 6);
    // return Math.floor((width + 5) / 6) * Math.floor((height + 5) / 6) * 16;
}

// https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_astc/
function atc8x5Size (width: number, height: number): number
{
    return GetSize(width, height, 7, 4, 8, 5);
    // return Math.floor((width + 7) / 8) * Math.floor((height + 4) / 5) * 16;
}

// https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_astc/
function atc8x6Size (width: number, height: number): number
{
    return GetSize(width, height, 7, 5, 8, 6);
    // return Math.floor((width + 7) / 8) * Math.floor((height + 5) / 6) * 16;
}

// https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_astc/
function atc8x8Size (width: number, height: number): number
{
    return GetSize(width, height, 7, 7, 8, 8);
    // return Math.floor((width + 7) / 8) * Math.floor((height + 7) / 8) * 16;
}

// https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_astc/
function atc10x5Size (width: number, height: number): number
{
    return GetSize(width, height, 9, 4, 10, 5);
    // return Math.floor((width + 9) / 10) * Math.floor((height + 4) / 5) * 16;
}

// https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_astc/
function atc10x6Size (width: number, height: number): number
{
    return GetSize(width, height, 9, 5, 10, 6);
    // return Math.floor((width + 9) / 10) * Math.floor((height + 5) / 6) * 16;
}

// https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_astc/
function atc10x8Size (width: number, height: number): number
{
    return GetSize(width, height, 9, 7, 10, 8);
    // return Math.floor((width + 9) / 10) * Math.floor((height + 7) / 8) * 16;
}

// https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_astc/
function atc10x10Size (width: number, height: number): number
{
    return GetSize(width, height, 9, 9, 10, 10);
    // return Math.floor((width + 9) / 10) * Math.floor((height + 9) / 10) * 16;
}

// https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_astc/
function atc12x10Size (width: number, height: number): number
{
    return GetSize(width, height, 11, 9, 12, 10);
    // return Math.floor((width + 11) / 12) * Math.floor((height + 9) / 10) * 16;
}

// https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_astc/
function atc12x12Size (width: number, height: number): number
{
    return GetSize(width, height, 11, 11, 12, 12);
    // return Math.floor((width + 11) / 12) * Math.floor((height + 11) / 12) * 16;
}

const PVR_CONSTANTS = {
    MAGIC_NUMBER: 0x03525650,
    HEADER_LENGTH: 13,
    HEADER_SIZE: 52,
    MAGIC_NUMBER_INDEX: 0,
    PIXEL_FORMAT_INDEX: 2,
    HEIGHT_INDEX: 6,
    WIDTH_INDEX: 7,
    MIPMAPCOUNT_INDEX: 11,
    METADATA_SIZE_INDEX: 12,
    FORMATS: {
        0: { format: 'COMPRESSED_RGB_PVRTC_2BPPV1_IMG', sizeFunc: pvrtc2bppSize, glFormat: 35841 },
        1: { format: 'COMPRESSED_RGBA_PVRTC_2BPPV1_IMG', sizeFunc: pvrtc2bppSize, glFormat: 35843 },
        2: { format: 'COMPRESSED_RGB_PVRTC_4BPPV1_IMG', sizeFunc: pvrtc4bppSize, glFormat: 35840 },
        3: { format: 'COMPRESSED_RGBA_PVRTC_4BPPV1_IMG', sizeFunc: pvrtc4bppSize, glFormat: 35842 },

        6: { format: 'COMPRESSED_RGB8_ETC2', sizeFunc: dxtEtcSmallSize , glFormat: 0 },

        7: { format: 'COMPRESSED_RGB_S3TC_DXT1_EXT', sizeFunc: dxtEtcSmallSize, glFormat: 33776 },
        9: { format: 'COMPRESSED_RGBA_S3TC_DXT3_EXT', sizeFunc: dxtEtcAstcBigSize, glFormat: 35778 },
        11: { format: 'COMPRESSED_RGBA_S3TC_DXT5_EXT', sizeFunc: dxtEtcAstcBigSize, glFormat: 33779 },

        22: { format: 'COMPRESSED_RGB8_ETC2', sizeFunc: dxtEtcSmallSize , glFormat: 0 },
        23: { format: 'COMPRESSED_RGBA8_ETC2_EAC', sizeFunc: dxtEtcAstcBigSize, glFormat: 0 },

        24: { format: 'COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2', sizeFunc: dxtEtcSmallSize, glFormat: 0 },
        25: { format: 'COMPRESSED_R11_EAC', sizeFunc: dxtEtcSmallSize, glFormat: 0 },
        26: { format: 'COMPRESSED_RG11_EAC', sizeFunc: dxtEtcAstcBigSize, glFormat: 0 },

        27: { format: 'COMPRESSED_RGBA_ASTC_4x4_KHR', sizeFunc: dxtEtcAstcBigSize, glFormat: 0 },
        28: { format: 'COMPRESSED_RGBA_ASTC_5x4_KHR', sizeFunc: atc5x4Size, glFormat: 0 },
        29: { format: 'COMPRESSED_RGBA_ASTC_5x5_KHR', sizeFunc: atc5x5Size, glFormat: 0 },
        30: { format: 'COMPRESSED_RGBA_ASTC_6x5_KHR', sizeFunc: atc6x5Size, glFormat: 0 },
        31: { format: 'COMPRESSED_RGBA_ASTC_6x6_KHR', sizeFunc: atc6x6Size, glFormat: 0 },
        32: { format: 'COMPRESSED_RGBA_ASTC_8x5_KHR', sizeFunc: atc8x5Size, glFormat: 0 },
        33: { format: 'COMPRESSED_RGBA_ASTC_8x6_KHR', sizeFunc: atc8x6Size, glFormat: 0 },
        34: { format: 'COMPRESSED_RGBA_ASTC_8x8_KHR', sizeFunc: atc8x8Size, glFormat: 0 },
        35: { format: 'COMPRESSED_RGBA_ASTC_10x5_KHR', sizeFunc: atc10x5Size, glFormat: 0 },
        36: { format: 'COMPRESSED_RGBA_ASTC_10x6_KHR', sizeFunc: atc10x6Size, glFormat: 0 },
        37: { format: 'COMPRESSED_RGBA_ASTC_10x8_KHR', sizeFunc: atc10x8Size, glFormat: 0 },
        38: { format: 'COMPRESSED_RGBA_ASTC_10x10_KHR', sizeFunc: atc10x10Size, glFormat: 0 },
        39: { format: 'COMPRESSED_RGBA_ASTC_12x10_KHR', sizeFunc: atc12x10Size, glFormat: 0 },
        40: { format: 'COMPRESSED_RGBA_ASTC_12x12_KHR', sizeFunc: atc12x12Size, glFormat: 0 }
    }
};

//  Add the S3TC ALPHA formats to the above list and get gl enums for them

function parsePVR (data)
{
    const header = new Uint32Array(data, 0, PVR_CONSTANTS.HEADER_LENGTH);

    const pvrFormat = header[PVR_CONSTANTS.PIXEL_FORMAT_INDEX];

    const formatEnum = PVR_CONSTANTS.FORMATS[pvrFormat];
    const sizeFunction = PVR_CONSTANTS.SIZE_FUNCTIONS[pvrFormat];

    const mipMapLevels = header[PVR_CONSTANTS.MIPMAPCOUNT_INDEX];

    const width = header[PVR_CONSTANTS.WIDTH_INDEX];
    const height = header[PVR_CONSTANTS.HEIGHT_INDEX];

    const dataOffset = PVR_CONSTANTS.HEADER_SIZE + header[PVR_CONSTANTS.METADATA_SIZE_INDEX];

    const image = new Uint8Array(data, dataOffset);

    const levels = new Array(mipMapLevels);
    let levelWidth = width;
    let levelHeight = height;
    let offset = 0;

    for (let i = 0; i < mipMapLevels; ++i)
    {
        const levelSize = sizeFunction(levelWidth, levelHeight);
        levels[i] = new Uint8Array(image.buffer, image.byteOffset + offset, levelSize);

        levelWidth = Math.max(1, levelWidth >> 1);
        levelHeight = Math.max(1, levelHeight >> 1);

        offset += levelSize;
    }

    return {
        data: levels,
        width,
        height,
        pvrFormat,
        format: formatEnum
    };
}

export function TextureFile (key: string, url?: string, glConfig?: IGLTextureBindingConfig): File
{
    //  Find out what compression formats the renderer supports
    const renderer = WebGLRendererInstance.get();

    if (!renderer)
    {
        //  Fallback to ImageFile for truecolor entry?
    }

    // for (const type in urls)
    // {
    //     if (type.toUpperCase() in renderer.compression)
    //     {
    //         //  Found supported format
    //     }
    // }

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
                    const textureData = parsePVR(file.data);

                    const texture = new Texture(null, textureData.width, textureData.height, {
                        data: textureData.data[0],
                        format: textureData.format,
                        compressed: true,
                        generateMipmap: false
                    });

                    console.log(textureData);

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
