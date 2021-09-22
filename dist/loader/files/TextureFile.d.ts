import { IFileData } from '../IFileData';
import { RequestFileType } from '../RequestFileType';
import { TextureBaseFormat } from '../../renderer/webgl1/textures/ICompressedTextures';
import { TextureContainer } from '../../renderer/webgl1/textures/ICompressedTextures';
export interface ITextureFileEntry {
    format?: TextureBaseFormat;
    type?: (TextureContainer | string);
    textureURL?: string;
    atlasURL?: string;
}
export interface ITextureFileFormat {
    ETC?: ITextureFileEntry | string;
    ETC1?: ITextureFileEntry | string;
    ATC?: ITextureFileEntry | string;
    ASTC?: ITextureFileEntry | string;
    BPTC?: ITextureFileEntry | string;
    RGTC?: ITextureFileEntry | string;
    PVRTC?: ITextureFileEntry | string;
    S3TC?: ITextureFileEntry | string;
    S3TCSRGB?: ITextureFileEntry | string;
    IMG?: ITextureFileEntry | string;
}
export declare function TextureFile(key: string, urls: ITextureFileFormat, fileData?: IFileData): RequestFileType;
//# sourceMappingURL=TextureFile.d.ts.map