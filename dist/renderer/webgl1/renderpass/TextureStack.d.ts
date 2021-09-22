import { IRenderPass } from './IRenderPass';
import { ITexture } from '../../../textures/ITexture';
export declare type ITextureStack = {
    renderPass: IRenderPass;
    textures: Map<number, ITexture>;
    tempTextures: Map<number, WebGLTexture>;
    textureIndex: number[];
    maxTextures: number;
    init: <T extends IRenderPass>(renderPass: T) => void;
};
export declare const TextureStack: ITextureStack;
//# sourceMappingURL=TextureStack.d.ts.map