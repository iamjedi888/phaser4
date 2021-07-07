import { TextureBaseFormat } from './ICompressedTextures';
import { WebGLRendererInstance } from '../WebGLRendererInstance';

export function SupportsCompressedTexture (baseFormat: TextureBaseFormat | string, format?: GLenum): boolean
{
    const renderer = WebGLRendererInstance.get();

    if (renderer)
    {
        const supportedFormats = renderer.compression[ baseFormat.toUpperCase() ];

        if (supportedFormats)
        {
            if (format)
            {
                return format in supportedFormats;
            }
            else
            {
                return true;
            }
        }
    }

    return false;
}
