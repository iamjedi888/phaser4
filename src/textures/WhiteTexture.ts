import { Texture } from './Texture';

let instance: Texture;

export const WhiteTexture =
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
