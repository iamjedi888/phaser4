import { TextureManager } from './TextureManager';

let instance: TextureManager;

export const TextureManagerInstance =
{
    get: (): TextureManager =>
    {
        return instance;
    },

    set: (manager: TextureManager | null): void =>
    {
        if (instance)
        {
            throw new Error('Cannot instantiate TextureManager more than once');
        }

        instance = manager;
    }
};
