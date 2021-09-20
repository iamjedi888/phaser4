import { TextureStack } from './TextureStack';

export function ClearTextures (): void
{
    TextureStack.textures.forEach(texture =>
    {
        if (texture)
        {
            texture.binding.unbind();
        }
    });

    TextureStack.textures.clear();
}
