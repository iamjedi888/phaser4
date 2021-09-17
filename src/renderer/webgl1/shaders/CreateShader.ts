import { CompileShader } from './CompileShader';
import { CreateAttributes } from './CreateAttributes';
import { CreateProgram } from './CreateProgram';
import { CreateUniforms } from './CreateUniforms';
import { GetMaxTextures } from '../../../config/maxtextures/GetMaxTextures';
import { IShader } from './IShader';
import { gl } from '../GL';

export function CreateShader <T extends IShader> (shader: T, fragmentShaderSource: string, vertexShaderSource: string, uniforms: {}, attribs: {}): T
{
    const maxTextures = GetMaxTextures();

    //  Replace %count% by default, as lots of shaders will need it (and it won't hurt if it doesn't exist)
    fragmentShaderSource = fragmentShaderSource.replace(/%count%/gi, `${maxTextures}`);

    const fragmentShader = CompileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    const vertexShader = CompileShader(vertexShaderSource, gl.VERTEX_SHADER);

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

    shader.program = program;

    shader.uniformSetters = CreateUniforms(program);

    shader.uniforms = new Map();

    //  Copy starting values from the config object to the uniforms map but only if a setter exists
    for (const [ key, value ] of Object.entries(uniforms))
    {
        if (shader.uniformSetters.has(key))
        {
            shader.uniforms.set(key, value);
        }
    }

    shader.attributes = CreateAttributes(program, attribs);

    gl.useProgram(currentProgram);

    shader.isActive = false;

    return shader;
}
