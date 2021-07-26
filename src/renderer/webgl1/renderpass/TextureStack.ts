import { CreateTempTextures } from './CreateTempTextures';
import { Flush } from './Flush';
import { IRenderPass } from './IRenderPass';
import { ITexture } from '../../../textures/ITexture';
import { Texture } from '../../../textures/Texture';
import { WhiteTexture } from '../../../textures/WhiteTexture';
import { gl } from '../GL';

export class TextureStack
{
    renderPass: IRenderPass;

    textures: Map<number, ITexture>;
    tempTextures: Map<number, WebGLTexture>;
    textureIndex: number[];

    maxTextures: number;

    constructor (renderPass: IRenderPass)
    {
        this.renderPass = renderPass;
    }

    //  directly bind a texture to an index slot
    bind (texture: Texture, index: number = 0): void
    {
        const binding = texture.binding;

        binding.bind(index);

        gl.activeTexture(gl.TEXTURE0 + index);
        gl.bindTexture(gl.TEXTURE_2D, binding.texture);
    }

    unbind (index: number = 0): void
    {
        gl.activeTexture(gl.TEXTURE0 + index);
        gl.bindTexture(gl.TEXTURE_2D, this.tempTextures[ index ]);
    }

    setWhite (): number
    {
        return this.set(WhiteTexture.get());
    }

    //  request the next available texture and bind it
    //  returns the new ID
    set (texture: ITexture): number
    {
        if (!texture.binding)
        {
            return -1;
        }

        const binding = texture.binding;
        const textures = this.textures;

        //  Make sure texture isn't already bound
        if (!binding.isBound)
        {
            //  Is the current texture Map full? If so, flush it all
            if (textures.size === this.maxTextures)
            {
                Flush(this.renderPass);

                this.clear();
            }

            // Add texture to the map
            const textureUnit = textures.size;

            gl.activeTexture(gl.TEXTURE0 + textureUnit);
            gl.bindTexture(gl.TEXTURE_2D, binding.texture);

            textures.set(textureUnit, texture);

            binding.bind(textureUnit);
        }

        return binding.textureUnit;
    }

    setDefault (): void
    {
        if (this.textures)
        {
            this.reset();
        }

        const tempTextures = CreateTempTextures();

        this.maxTextures = tempTextures.length;

        this.tempTextures = new Map(tempTextures);
        this.textures = new Map();

        this.textureIndex = [];

        this.tempTextures.forEach((texture, index) =>
        {
            this.textureIndex.push(index);
        });
    }

    clear (): void
    {
        this.textures.forEach(texture => texture.binding.unbind());

        this.textures.clear();
    }

    reset (): void
    {
        this.tempTextures.forEach((texture, index) =>
        {
            gl.activeTexture(gl.TEXTURE0 + index);

            gl.bindTexture(gl.TEXTURE_2D, texture);
        });

        this.clear();
    }
}
