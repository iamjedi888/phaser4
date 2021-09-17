import { CreateDepthBuffer } from '../fbo/CreateDepthBuffer';
import { CreateFramebuffer } from '../index';
import { CreateShader } from './CreateShader';
import { DefaultQuadAttributes } from './DefaultQuadAttributes';
import { DefaultQuadUniforms } from './DefaultQuadUniforms';
import { GLTextureBinding } from '../textures/GLTextureBinding';
import { GetHeight } from '../../../config/size/GetHeight';
import { GetResolution } from '../../../config/size/GetResolution';
import { GetWidth } from '../../../config/size/GetWidth';
import { IShader } from './IShader';
import { IShaderConfig } from './IShaderConfig';
import { SINGLE_QUAD_FRAG } from '../glsl/SINGLE_QUAD_FRAG';
import { SINGLE_QUAD_VERT } from '../glsl/SINGLE_QUAD_VERT';
import { Texture } from '../../../textures/Texture';

export function SetShaderFromConfig <T extends IShader> (shader: T, config: IShaderConfig): T
{
    const {
        attributes = DefaultQuadAttributes,
        fragmentShader = SINGLE_QUAD_FRAG,
        height = GetHeight(),
        renderToFramebuffer = false,
        renderToDepthbuffer = false,
        resolution = GetResolution(),
        vertexShader = SINGLE_QUAD_VERT,
        width = GetWidth(),
        uniforms = DefaultQuadUniforms
    } = config;

    CreateShader(shader, fragmentShader, vertexShader, uniforms, attributes);

    if (renderToFramebuffer)
    {
        shader.renderToFramebuffer = true;

        const texture = new Texture(null, width * resolution, height * resolution);
        const binding = new GLTextureBinding(texture);

        binding.framebuffer = CreateFramebuffer(binding.texture);

        if (renderToDepthbuffer)
        {
            shader.renderToDepthbuffer = true;

            binding.depthbuffer = CreateDepthBuffer(binding.framebuffer, texture.width, texture.height);
        }

        shader.texture = texture;
        shader.framebuffer = binding.framebuffer;
    }

    return shader;
}
