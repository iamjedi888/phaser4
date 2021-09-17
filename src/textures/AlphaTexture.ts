import { Texture } from './Texture';

let instance: Texture;

export const AlphaTexture =
{
    get: (): Texture =>
    {
        return instance;
    },

    set: (texture: Texture): void =>
    {
        instance = texture;
    }
};
