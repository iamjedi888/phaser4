import { IGLMipmapType } from './IGLTextureBindingConfig';
import { ITexture } from '../../../textures/ITexture';
export interface IGLTextureBinding {
    parent: ITexture;
    texture: WebGLTexture;
    framebuffer: WebGLFramebuffer;
    depthbuffer?: WebGLRenderbuffer;
    format: string;
    internalFormat: GLenum;
    compressed: boolean;
    mipmaps: IGLMipmapType[];
    isBound: boolean;
    textureUnit: number;
    unpackPremultiplyAlpha: boolean;
    minFilter: GLenum;
    magFilter: GLenum;
    wrapS: GLenum;
    wrapT: GLenum;
    flipY: boolean;
    isPOT: boolean;
    generateMipmap: boolean;
    setFilter(linear: boolean): void;
    create(): WebGLTexture;
    update(): WebGLTexture;
    bind(index: number): void;
    unbind(): void;
    destroy(): void;
}
//# sourceMappingURL=IGLTextureBinding.d.ts.map