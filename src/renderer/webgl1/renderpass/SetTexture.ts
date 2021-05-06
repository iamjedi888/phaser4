import { Flush } from './Flush';
import { IRenderPass } from './IRenderPass';
import { ITexture } from '../../../textures/ITexture';
import { gl } from '../GL';

//  request the next available texture and bind it
//  returns the new ID
export function SetTexture (renderPass: IRenderPass, texture: ITexture): number
{
    const binding = texture.binding;
    const currentActiveTexture = renderPass.currentActiveTexture;

    if (binding.indexCounter < renderPass.startActiveTexture)
    {
        binding.indexCounter = renderPass.startActiveTexture;

        if (currentActiveTexture < renderPass.maxTextures)
        {
            binding.setIndex(currentActiveTexture);

            gl.activeTexture(gl.TEXTURE0 + currentActiveTexture);
            gl.bindTexture(gl.TEXTURE_2D, binding.texture);

            renderPass.currentActiveTexture++;
        }
        else
        {
            //  We're out of textures, so flush the batch and reset back to 1
            Flush(renderPass);

            renderPass.startActiveTexture++;

            binding.indexCounter = renderPass.startActiveTexture;

            binding.setIndex(1);

            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, binding.texture);

            renderPass.currentActiveTexture = 2;
        }
    }

    return binding.index;
}
