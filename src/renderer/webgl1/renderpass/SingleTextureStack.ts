import { Flush } from './Flush';
import { IRenderPass } from './IRenderPass';
import { ITexture } from '../../../textures/ITexture';
import { Texture } from '../../../textures';
import { gl } from '../GL';

export class SingleTextureStack
{
    renderPass: IRenderPass;

    tempTexture: WebGLTexture;

    currentTexture: WebGLTexture;

    constructor (renderPass: IRenderPass)
    {
        this.renderPass = renderPass;
    }

    bind (texture: Texture, slot: number = 0): void
    {
        const binding = texture.binding;

        gl.activeTexture(gl.TEXTURE0 + slot);
        gl.bindTexture(gl.TEXTURE_2D, binding.texture);
    }

    unbind (slot: number = 0): void
    {
        gl.activeTexture(gl.TEXTURE0 + slot);
        gl.bindTexture(gl.TEXTURE_2D, this.tempTexture);
    }

    set (texture: ITexture): number
    {
        const binding = texture.binding;

        if (binding.texture !== this.currentTexture)
        {
            Flush(this.renderPass);

            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, binding.texture);

            this.currentTexture = binding.texture;
        }

        return 0;
    }

    setDefault (): void
    {
        const tempTexture = gl.createTexture();

        gl.activeTexture(gl.TEXTURE0);

        gl.bindTexture(gl.TEXTURE_2D, tempTexture);

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([ 0, 0, 255, 255 ]));

        this.tempTexture = tempTexture;
    }

    reset (): void
    {
        gl.activeTexture(gl.TEXTURE0);

        gl.bindTexture(gl.TEXTURE_2D, this.tempTexture);
    }
}
