import { gl } from '../GL';

export function CompileShader (source: string, type: GLenum): WebGLShader | null
{
    const shader = gl.createShader(type);

    gl.shaderSource(shader, source);

    gl.compileShader(shader);

    const status = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

    if (!status)
    {
        const info = gl.getShaderInfoLog(shader);

        //  Adding line numbers idea borrowed from Gregg Tavares!
        const sourceLines = source.split('\n').map((line, index) =>
        {
            return `${index}: ${line}`;
        });

        console.error(`Error compiling shader: ${info}`, sourceLines.join('\n'));

        gl.deleteShader(shader);

        return null;
    }

    return shader;
}
