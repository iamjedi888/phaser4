export interface ICompressedTextures {
    ETC: Record<GLenum, string>;
    ETC1: Record<GLenum, string>;
    ATC: Record<GLenum, string>;
    ASTC: Record<GLenum, string>;
    BPTC: Record<GLenum, string>;
    RGTC: Record<GLenum, string>;
    PVRTC: Record<GLenum, string>;
    S3TC: Record<GLenum, string>;
    S3TCSRGB: Record<GLenum, string>;
    IMG: boolean;
}
export declare type TextureBaseFormat = 'ETC' | 'ETC1' | 'ATC' | 'ASTC' | 'BPTC' | 'RGTC' | 'PVRTC' | 'S3TC' | 'S3TCSRGB' | 'IMG';
export declare type TextureContainer = 'PVR' | 'KTX';
//# sourceMappingURL=ICompressedTextures.d.ts.map