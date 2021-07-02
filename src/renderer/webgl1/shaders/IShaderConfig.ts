import { ShaderAttributeEntry } from './CreateAttributes';

export interface IShaderConfig
{
    attributes?: Record<string, ShaderAttributeEntry>;
    fragmentShader?: string;
    height?: number;
    maxTextures?: number;
    renderToFramebuffer?: boolean;
    renderToDepthbuffer?: boolean;
    resolution?: number;
    uniforms?: Record<string, Number | Float32List>;
    vertexShader?: string;
    width?: number;
}
