import { IRenderPass } from '../renderpass/IRenderPass';
import { IShaderConfig } from './IShaderConfig';
import { Mat4Ortho } from '../../../math/mat4/Mat4Ortho';
import { SetUniforms } from './SetUniforms';
import { Shader } from './Shader';

export class TextureShader extends Shader
{
    cameraMatrix: Float32Array;
    projectionMatrix: Float32Array;

    constructor (config: IShaderConfig = {})
    {
        config.renderToFramebuffer = true;

        super(config);

        this.cameraMatrix = new Float32Array([ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ]);
        this.projectionMatrix = new Float32Array(16);

        Mat4Ortho(this.projectionMatrix, 0, this.viewport.width, this.viewport.height, 0, -1, 1);
    }

    bind (renderPass: IRenderPass): boolean
    {
        const uniforms = this.uniforms;

        uniforms.set('uProjectionMatrix', this.projectionMatrix);
        uniforms.set('uCameraMatrix', this.cameraMatrix);

        this.updateUniforms(renderPass);

        return SetUniforms(this, renderPass);
    }
}
