import { CreateTempTextures } from './CreateTempTextures';
import { ResetTextures } from './ResetTextures';
import { TextureStack } from './TextureStack';

export function SetDefaultTextures (): void
{
    if (TextureStack.textures)
    {
        ResetTextures();
    }

    const tempTextures = CreateTempTextures();

    TextureStack.maxTextures = tempTextures.length;

    TextureStack.tempTextures = new Map(tempTextures);
    TextureStack.textures = new Map();

    TextureStack.textureIndex = [];

    TextureStack.tempTextures.forEach((texture, index) =>
    {
        TextureStack.textureIndex.push(index);
    });
}
