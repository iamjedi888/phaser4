import { CreateTempTextures } from './CreateTempTextures';
import { Flush } from './Flush';
import { IRenderPass } from './IRenderPass';
import { ITexture } from '../../../textures/ITexture';
import { Texture } from '../../../textures';
import { gl } from '../GL';

export class TextureStack
{
    renderPass: IRenderPass;

    //  The maximum number of combined image units the GPU supports
    //  According to the WebGL spec the minimum is 8
    maxTextures: number = 0;
    currentActiveTexture: number = 0;
    startActiveTexture: number = 0;
    tempTextures: WebGLTexture[] = [];
    textureIndex: number[] = [];

    constructor (renderPass: IRenderPass)
    {
        this.renderPass = renderPass;
    }

    //  directly bind a texture to an index slot
    bind (texture: Texture, index: number = 0): void
    {
        const binding = texture.binding;

        binding.setIndex(index);

        gl.activeTexture(gl.TEXTURE0 + index);
        gl.bindTexture(gl.TEXTURE_2D, binding.texture);
    }

    unbind (index: number = 0): void
    {
        gl.activeTexture(gl.TEXTURE0 + index);
        gl.bindTexture(gl.TEXTURE_2D, this.tempTextures[ index ]);

        if (index > 0)
        {
            this.startActiveTexture++;
        }
    }

    //  request the next available texture and bind it
    //  returns the new ID
    set (texture: ITexture): number
    {
        const binding = texture.binding;
        const currentActiveTexture = this.currentActiveTexture;

        if (binding.indexCounter < this.startActiveTexture)
        {
            binding.indexCounter = this.startActiveTexture;

            if (currentActiveTexture < this.maxTextures)
            {
                binding.setIndex(currentActiveTexture);

                gl.activeTexture(gl.TEXTURE0 + currentActiveTexture);
                gl.bindTexture(gl.TEXTURE_2D, binding.texture);

                this.currentActiveTexture++;
            }
            else
            {
                //  We're out of textures, so flush the batch and reset back to 1
                Flush(this.renderPass);

                this.startActiveTexture++;

                binding.indexCounter = this.startActiveTexture;

                binding.setIndex(1);

                gl.activeTexture(gl.TEXTURE1);
                gl.bindTexture(gl.TEXTURE_2D, binding.texture);

                this.currentActiveTexture = 2;
            }
        }

        return binding.index;
    }

    setDefault (): void
    {
        CreateTempTextures(this);
    }

    reset (): void
    {
        const temp = this.tempTextures;

        for (let i: number = 0; i < temp.length; i++)
        {
            gl.activeTexture(gl.TEXTURE0 + i);

            gl.bindTexture(gl.TEXTURE_2D, temp[i]);
        }

        this.currentActiveTexture = 1;

        this.startActiveTexture++;
    }
}
