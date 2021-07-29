import { CreateAttributes } from './CreateAttributes';
import { CreateDepthBuffer } from '../fbo/CreateDepthBuffer';
import { CreateFramebuffer } from '../fbo/CreateFramebuffer';
import { CreateProgram } from './CreateProgram';
import { CreateShader } from './CreateShader';
import { CreateUniforms } from './CreateUniforms';
import { DefaultQuadAttributes } from './DefaultQuadAttributes';
import { DefaultQuadUniforms } from './DefaultQuadUniforms';
import { DeleteFramebuffer } from '../fbo/DeleteFramebuffer';
import { DeleteGLTexture } from '../textures/DeleteGLTexture';
import { DeleteShaders } from './DeleteShaders';
import { GLTextureBinding } from '../textures/GLTextureBinding';
import { GetHeight } from '../../../config/size/GetHeight';
import { GetResolution } from '../../../config/size/GetResolution';
import { GetWidth } from '../../../config/size/GetWidth';
import { IRenderPass } from '../renderpass/IRenderPass';
import { IShader } from './IShader';
import { IShaderConfig } from './IShaderConfig';
import { IVertexAttribPointer } from './IVertexAttribPointer';
import { SINGLE_QUAD_FRAG } from '../glsl/SINGLE_QUAD_FRAG';
import { SINGLE_QUAD_VERT } from '../glsl/SINGLE_QUAD_VERT';
import { Texture } from '../../../textures/Texture';
import { gl } from '../GL';

export class Shader implements IShader
{
    program: WebGLProgram;

    attributes: Map<string, IVertexAttribPointer>;

    uniforms: Map<string, unknown>;

    uniformSetters: Map<string, Function>;

    texture: Texture;

    framebuffer: WebGLFramebuffer;

    renderToFramebuffer: boolean = false;

    renderToDepthbuffer: boolean = false;

    isActive: boolean = false;

    constructor (config?: IShaderConfig)
    {
        if (config)
        {
            this.fromConfig(config);
        }
    }

    fromConfig (config: IShaderConfig): void
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

        this.create(fragmentShader, vertexShader, uniforms, attributes);

        if (renderToFramebuffer)
        {
            this.renderToFramebuffer = true;

            const texture = new Texture(null, width * resolution, height * resolution);
            const binding = new GLTextureBinding(texture);

            binding.framebuffer = CreateFramebuffer(binding.texture);

            if (renderToDepthbuffer)
            {
                this.renderToDepthbuffer = true;

                binding.depthbuffer = CreateDepthBuffer(binding.framebuffer, texture.width, texture.height);
            }

            this.texture = texture;
            this.framebuffer = binding.framebuffer;
        }
    }

    create (fragmentShaderSource: string, vertexShaderSource: string, uniforms: {}, attribs: {}): void
    {
        const fragmentShader = CreateShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
        const vertexShader = CreateShader(vertexShaderSource, gl.VERTEX_SHADER);

        if (!fragmentShader || !vertexShader)
        {
            return;
        }

        const program = CreateProgram(fragmentShader, vertexShader);

        if (!program)
        {
            return;
        }

        const currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

        gl.useProgram(program);

        this.program = program;

        this.uniformSetters = CreateUniforms(program);

        this.uniforms = new Map();

        //  Copy starting values from the config object to the uniforms map but only if a setter exists
        for (const [ key, value ] of Object.entries(uniforms))
        {
            if (this.uniformSetters.has(key))
            {
                this.uniforms.set(key, value);
            }
        }

        this.attributes = CreateAttributes(program, attribs);

        gl.useProgram(currentProgram);

        this.isActive = false;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateUniforms (renderPass: IRenderPass): void
    {
        //  Use this to set any extra uniform values prior to the bind
    }

    bind (renderPass: IRenderPass): boolean
    {
        const uniforms = this.uniforms;

        uniforms.set('uProjectionMatrix', renderPass.projectionMatrix);
        uniforms.set('uCameraMatrix', renderPass.cameraMatrix);

        this.updateUniforms(renderPass);

        return this.setUniforms(renderPass);
    }

    setUniform (key: string, value: unknown): void
    {
        const uniforms = this.uniforms;

        if (uniforms.has(key))
        {
            uniforms.set(key, value);

            const setter = this.uniformSetters.get(key);

            setter(value);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setUniforms (renderPass: IRenderPass): boolean
    {
        if (!this.program)
        {
            return false;
        }

        gl.useProgram(this.program);

        this.isActive = true;

        const uniforms = this.uniforms;

        for (const [ name, setter ] of this.uniformSetters.entries())
        {
            setter(uniforms.get(name));
        }

        return true;
    }

    //  stride = vertexByteSize
    setAttributes (renderPass: IRenderPass): void
    {
        if (this.program)
        {
            const stride = renderPass.vertexbuffer.current.vertexByteSize;

            this.attributes.forEach(attrib =>
            {
                gl.vertexAttribPointer(attrib.index, attrib.size, attrib.type, attrib.normalized, stride, attrib.offset);
            });
        }
    }

    destroy (): void
    {
        DeleteShaders(this.program);
        DeleteGLTexture(this.texture);
        DeleteFramebuffer(this.framebuffer);

        this.uniforms.clear();
        this.uniformSetters.clear();
        this.attributes.clear();

        this.program = null;
        this.texture = null;
        this.framebuffer = null;
    }
}
