import { IRenderPass } from './IRenderPass';
import { ITexture } from '../../../textures/ITexture';

export type ITextureStack =
{
    renderPass: IRenderPass;
    textures: Map<number, ITexture>;
    tempTextures: Map<number, WebGLTexture>;
    textureIndex: number[];
    maxTextures: number;
    init: <T extends IRenderPass> (renderPass: T) => void;
};

export const TextureStack: ITextureStack =
{
    renderPass: null,
    textures: null,
    tempTextures: null,
    textureIndex: [],
    maxTextures: 0,

    init: <T extends IRenderPass> (renderPass: T): void =>
    {
        TextureStack.renderPass = renderPass;
    }
};

/*
    //  Renamed: UnbindtextureFromSlot
    unbind (index: number = 1): void
    {
        gl.activeTexture(gl.TEXTURE0 + index);
        gl.bindTexture(gl.TEXTURE_2D, this.tempTextures.get(index));
    }
}
*/
