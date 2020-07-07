import { ITexture } from '../../../textures/ITexture';
export interface IGLTextureBinding {
    parent: ITexture;
    texture: WebGLTexture;
    framebuffer: WebGLFramebuffer;
    depthbuffer?: WebGLRenderbuffer;
    index: number;
    indexCounter: number;
    unpackPremultiplyAlpha: boolean;
    minFilter: GLenum;
    magFilter: GLenum;
    wrapS: GLenum;
    wrapT: GLenum;
    flipY: boolean;
    isPOT: boolean;
    generateMipmap: boolean;
    dirtyIndex: boolean;
    setFilter(linear: boolean): void;
    setIndex(index: number): void;
    create(): WebGLTexture;
    update(): WebGLTexture;
    destroy(): void;
}
//# sourceMappingURL=IGLTextureBinding.d.ts.map