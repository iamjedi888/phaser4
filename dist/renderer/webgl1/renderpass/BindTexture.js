import { gl } from '../GL.js';

function BindTexture(texture, index = 0) {
    const binding = texture.binding;
    binding.setIndex(index);
    gl.activeTexture(gl.TEXTURE0 + index);
    gl.bindTexture(gl.TEXTURE_2D, binding.texture);
}

export { BindTexture };
