import { ShaderAttributeEntry } from './CreateAttributes';

export type IShaderConfig = {
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
};
