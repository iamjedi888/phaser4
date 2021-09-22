import { IGLMipmapType, IGLTextureBindingConfig } from './IGLTextureBindingConfig';
import { IGLTextureBinding } from './IGLTextureBinding';
import { ITexture } from '../../../textures/ITexture';
export declare class GLTextureBinding implements IGLTextureBinding {
    parent: ITexture;
    texture: WebGLTexture;
    framebuffer: WebGLFramebuffer;
    depthbuffer: WebGLRenderbuffer;
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
    constructor(parent: ITexture, config?: IGLTextureBindingConfig);
    setFilter(linear: boolean): void;
    create(): WebGLTexture;
    update(): WebGLTexture;
    bind(index: number): void;
    unbind(): void;
    destroy(): void;
}
//# sourceMappingURL=GLTextureBinding.d.ts.map